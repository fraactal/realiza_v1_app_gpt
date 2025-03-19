from http.client import HTTPException
from sqlalchemy import create_engine, sql
import pandas as pd

from bds.executeQuery import execute_queries
from models.usuario import LoginData, ChangePasswordData

import logging
import json


def login_user(user:str, pwd:str):
#def login(data: LoginData):
     try:
          querie_data= f'''
            SELECT * 
            FROM usuario 
            WHERE id_usuario = '{user}' AND contrasena = crypt('{pwd}', contrasena);
            '''
          #print(querie_data)
          data_profiles = json.loads(execute_queries([querie_data],"SELECT"))
          #logging.debug(data_profiles)
          return json.dumps(data_profiles)
     except Exception:
		    return {"message":"Error en consulta login"}
     
     
#def cambiar_contrasena(user:str, pwd:str):
def cambiar_password(data: ChangePasswordData):
     try:
          queri_user = "SELECT contrasena FROM usuario WHERE id_usuario = %s", (data.username,)
          user = execute_queries([queri_user],"SELECT")

          if not user:
               raise HTTPException(status_code=404, detail="Usuario no encontrado")
     
          queri_pwd = f''' SELECT * FROM usuario WHERE id_usuario = '{data.user}' AND contrasena = crypt('{data.pwd}', contrasena);'''
          user_pass = execute_queries([queri_pwd],"SELECT")

          if not user_pass:
               raise HTTPException(status_code=404, detail="Contraseña incorrecta")

          querie_data= f'''
            update usuario 
            set contrasena = crypt('{data.new_password}', gen_salt('bf'))
            where id_usuario = '{data.username}'
            '''
          #print(querie_data)
          data_profiles = json.loads(execute_queries([querie_data],"SELECT"))
          #logging.debug(data_profiles)
          return json.dumps(data_profiles)
     except Exception:
		    raise HTTPException(status_code=401, detail="Contraseña incorrecta")


def cambiar_password(data: ChangePasswordData):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Obtener el hash de la contraseña actual
    cursor.execute("SELECT password_hash FROM usuarios WHERE username = %s", (data.username,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    hashed_password = user[0]

    # Verificar la contraseña actual
    if not bcrypt.checkpw(data.old_password.encode('utf-8'), hashed_password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Contraseña actual incorrecta")

    # Hashear la nueva contraseña
    new_hashed_password = bcrypt.hashpw(data.new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Actualizar la contraseña en la base de datos
    cursor.execute("UPDATE usuarios SET password_hash = %s WHERE username = %s", (new_hashed_password, data.username))
    conn.commit()

    cursor.close()
    conn.close()

    return {"mensaje": "Contraseña actualizada exitosamente"}

#def create_user(user:str, pwd:str):
#     try:
#          querie_data= f'''
#            INSERT INTO usuario (id_usuario, id_proyecto, id_campus, contrasena, nombre, correo, activo, tipo_usuario) VALUES('ikki', 2, 3, crypt('ikki', gen_salt('bf')), 'Usuario 5', 'user_1@campus3.cl', true,'U');
#            '''
#          print(querie_data)
#          data_profiles = json.loads(execute_queries([querie_data],"SELECT"))
#          logging.debug(data_profiles)
#          return json.dumps(data_profiles)
#     except Exception:
#		    return {"message":"Error en la consulta createUsuario"} 