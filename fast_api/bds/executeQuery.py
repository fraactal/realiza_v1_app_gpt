from sqlalchemy import create_engine, sql
import pandas as pd

import logging


def execute_queries(list_queries_string=[],querie_type=''):
    #engine = create_engine('postgresql://unicorn_user:magical_password@localhost/rainbow_database')
    db_name = "realizaApp"
    db_user = "realizaApp"
    db_pass = "realizaApp*"
    db_host = "database-service" #al trabajar con docker composed se debe agregar el nombre del servicio
    db_port = "5432"

    try:
        #Error DEBUG:root:Not an executable object: 'SELECT VERSION()'
        db_string = f'postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}'
        db = create_engine(db_string) 
        conn = db.connect() 
        
        if (querie_type == 'SELECT'):
            for querie in list_queries_string:
                df = pd.read_sql_query(querie, db)
                # Convertir el DataFrame a JSON
                json_results = df.to_json(orient='records', indent=4)
            message = "Select Ejecutado Correctamente"
            return json_results
        
        if (querie_type == 'INSERT'):
            for querie in list_queries_string:
                df = pd.to_sql(querie, db)
                # Convertir el DataFrame a JSON
                json_results = df.to_json(orient='records', indent=4)
            message = "Insert Ejecutado Correctamente"
            return json_results
        

        #if (querie_type == 'UPDATE'):
            #engine = create_engine(DB_STRING)

            #with engine.connect() as conn:
            #    # Encriptar la nueva contraseña
            #    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')#

                # Verificar si el usuario existe
            #    result = conn.execute(text("SELECT COUNT(*) FROM usuarios WHERE username = :username"),
            #                        {"username": username})
            #    count = result.scalar()

            #    if count == 0:
            #        return "⚠️ Usuario no encontrado"

                # Ejecutar UPDATE
            #    conn.execute(text("UPDATE usuarios SET password_hash = :password WHERE username = :username"),
            #                {"password": hashed_password, "username": username})
        #return {"message":message}

    except Exception as e:
        logging.debug(e)

    finally:
    # Cerrar la conexión
        if conn is not None:
            conn.close()
            print("Conexión cerrada")

