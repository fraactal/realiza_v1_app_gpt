from fastapi import FastAPI,APIRouter, File, UploadFile, HTTPException, Depends
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
import io

from models.usuario import Usuario
from routers.token_router import get_current_active_user


router = APIRouter()

# Configuración de conexión a PostgreSQL
DB_CONFIG = {
    'dbname': 'realizaApp',
    'user': 'realizaApp',
    'password': 'realizaApp*',
    'host': 'database-service',
    'port': 5432
}

# Función para validar existencia de valores en la base de datos
def validar_existencia(cursor, tabla, columna, valor,row):
    query = f"SELECT EXISTS (SELECT 1 FROM {tabla} WHERE {columna} = '{valor}')"
    #print("Select: ", query, "  ****** Row: ", row)
    #cursor.execute(query, (valor,))
    cursor.execute(query, (valor,))
    return cursor.fetchone()[0]

# Función para validar existencia de valores en la base de datos
def retorna_id(cursor, tabla, campo, wherestm, valor):
    query = f"SELECT {campo} FROM {tabla} WHERE {wherestm} = '{valor}'"
    #print("Select_ID: ", query)
    #cursor.execute(query, (valor,))
    cursor.execute(query, (valor,))
    return cursor.fetchone()[0]

# Función para validar existencia de valores en la base de datos
def retorna_id_consumo(cursor, id_campus):
    query = f"SELECT (count(*)+1) as id_campus FROM consumos WHERE id_campus = {id_campus};"
    #print("Select_ID_Consumo: ", query)
    #cursor.execute(query, (valor,))
    cursor.execute(query, (id_campus,))
    
    #print("HDC" , str(id_campus) , "00" , str(cursor.fetchone()[0]) )
    #id_consumo = "HDC" + str(id_campus) + "00" + str(cursor.fetchone()[0])
    id_consumo = "HDC" + str(id_campus) + "000" + str(cursor.fetchone()[0])

    return id_consumo

#registros duplicados en archivo excel
def consumoDuplicado(df):

    # Validar duplicados en la columna "ID_CONSUMO"
    #duplicated_ids = df[df.duplicated(subset=["ID"], keep=False)]
    
    # occurrence based on all columns.
    #duplicate = df[df.duplicated(keep='last')]

    # on list of column names
    duplicated_ids = df[df.duplicated(subset=['ALCANCE', 'CATEGORÍA','SUBCATEGORÍA','FUENTE','CANTIDAD_FUENTE','FECHA_CONSUMO'], keep=False)]
    
    #Validar duplicados con varias columnas como parametro

    if not duplicated_ids.empty:
        print("Se encontraron registros duplicados:")
        print(duplicated_ids)
    else:
        print("No hay registros duplicados en el archivo excel.")

# Procesar y validar archivo Excel
def procesar_excel(file_stream):
    # Leer archivo Excel desde el flujo de bytes
    df = pd.read_excel(file_stream, engine='openpyxl')
    consumoDuplicado(df)

    # Eliminar duplicados y conservar la primera ocurrencia
    #df = df.drop_duplicates(subset=["ID"], keep="first")

    # Conectar a PostgreSQL
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        filas_validas = []
        filasinsertadas = 0

        # Validar y preparar filas
        for index, row in df.iterrows():

            #id_consumo = row['ID']
            alcance = row['ALCANCE']
            categoria = row['CATEGORÍA']
            subcategoria = row['SUBCATEGORÍA']
            fuente = row['FUENTE']
            cantidad_fuente = row['CANTIDAD_FUENTE'] # **** Importante para obtener el calculo

            #Campos que son calculados desde los consumos y cruzados con los valores por factores de emision
            emision_tco2e = row['EMISIÓN_GEI (tCO2e)'] 
            emision_porc = row['EMISIÓN_GEI (% total)']
            unidad_fuente = row['UNIDAD_FUENTE']

            # Agregar Fecha de Consumo!!!
            fecha_consumo = row['FECHA_CONSUMO']
            #print(fecha_consumo)

            campus = row['CAMPUS']
            link_respaldo = row['LINK_RESPALDO_INFORMACIÓN']
            huellachile = row['HUELLACHILE']

            #Validar que el campus de carga es el campus del usuario
            
            #Validar el id_consumo
            #if not validar_existencia(cursor, 'consumos', 'id_consumo', id_consumo, index):
               
            #LA VALIDACION DE DATOS ES MEDIANTE EL ID DE PROYECTO
            if all([
                validar_existencia(cursor, 'alcances', 'nombre', alcance, index),
                validar_existencia(cursor, 'categorias', 'nombre', categoria, index),
                validar_existencia(cursor, 'subcategorias', 'nombre', subcategoria, index),
                validar_existencia(cursor, 'fuente', 'nombre', fuente, index),
                validar_existencia(cursor, 'campus', 'nombre', campus, index)
            ]):
                #id_alcance= retorna_id(cursor, 'alcances', 'id_alcance','nombre',alcance)
                #id_categoria= retorna_id(cursor, 'categorias', 'id_categoria','nombre', categorias)
                #id_subcategoria= retorna_id(cursor, 'subcategorias', 'id_subcategoria','nombre', subcategorias)

                id_fuente= retorna_id(cursor, 'fuente', 'id_fuente','nombre', fuente)
                id_campus= retorna_id(cursor, 'campus', 'id_campus','nombre', campus)

                #Calcular el id de consumo si el archivo no tiene id
                id_consumo_insert = retorna_id_consumo(cursor, id_campus)

                ################
                ### QUE PASARÁ CON EL CALCULO DE % DE GAS

                insert_query = f"""
                        INSERT INTO consumos (
                            id_consumo, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha
                        ) VALUES ('{id_consumo_insert}', '{id_fuente}', {cantidad_fuente}, '{link_respaldo}', {huellachile}, {id_campus}, TO_DATE('{fecha_consumo}', 'dd-mm-yyyy'))
                    """
                #print("Query: " , insert_query)
                tabla = "consumos"
                cursor.execute(insert_query)
                conn.commit()
                filasinsertadas = filasinsertadas + 1

                #cursor.commit()
                #query_2 = 'INSERT INTO %s (id_consumo, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha) VALUES (%s, %s, %s, %s, %s, %s, %s)', (tabla, id_consumo_insert, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha_consumo)
                #print (query_2)
                #cursor.execute('INSERT INTO %s (id_consumo, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha) VALUES (%s, %s, %s, %s, %s, %s, %s)', (tabla, id_consumo_insert, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha_consumo))

                #filas_validas.append((
                #    id_consumo_insert, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha_consumo
                #))
                    
            else:
                print(f"no existe campo: alcance, fuente, categoria, subcategoría o Campus del index: {index} . Revisar Archivo.")
                #print(f"Fila {row}, con ID {id_consumo} inválida. Valores no encontrados en tablas de referencia.")
            #else:
            #    print(f"Fila con ID {id_consumo} tiene id_consumo ya registrado.")

        message = f"{filasinsertadas} filas insertadas correctamente."
        print(message)
        return message

        # Insertar filas válidas en la tabla principal
        #if filas_validas:
        #    insert_query = """
        #        INSERT INTO consumos (
        #            id_consumo, id_fuente, cantidad_fuente, link_respaldo, huellachile, id_campus, fecha
        #        ) VALUES %s
        #    """
        #    execute_values(cursor, insert_query, filas_validas)
        #    conn.commit()
        #    message = f"{len(filas_validas)} filas insertadas correctamente."
        #    print(message)
        #    return message
        #else:
        #    return "No hay filas válidas para insertar."

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar el archivo: {e}")
    finally:
        cursor.close()
        conn.close()

# Endpoint para subir archivo Excel
@router.post("/subir-excel/")
async def subir_excel(file: UploadFile = File(...) , my_user: Usuario = Depends(get_current_active_user)):
    if not file.filename.endswith(('.xls', '.xlsx')):
        raise HTTPException(status_code=400, detail="El archivo debe ser de tipo Excel (.xls, .xlsx)")
    try:
        # Leer el archivo subido como flujo de bytes
        file_stream = io.BytesIO(await file.read())
        resultado = procesar_excel(file_stream)
        return {"mensaje": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
