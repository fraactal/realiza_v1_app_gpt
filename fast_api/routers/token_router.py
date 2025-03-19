
from fastapi import Depends, APIRouter, status
from fastapi.responses import JSONResponse

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.exceptions import HTTPException
from jose import JWTError, jwt
from typing import Annotated

from bds.usuario_bd import login_user
from models.token_model import Token, TokenData
from models.usuario import Usuario

import logging
import json
import requests
from datetime import datetime, timedelta


router = APIRouter()


# secret key
# openssl rand -hex 32
# 0507e45be43b075b46cdd2c7d2e7f67c65a43a06ff2a221d4687e76b8545e5c9
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

#esta dependencia creará un token, pero debemos indicarle dónde debe crearlo
oauth2_schema = OAuth2PasswordBearer(tokenUrl="user_login")
secret_key = "0507e45be43b075b46cdd2c7d2e7f67c65a43a06ff2a221d4687e76b8545e5c9"

credential_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect Username or password", 
    headers={"WWW-Authenticate": "Bearer"})

###########################################################


def create_access_token(data: dict, expires_delta: timedelta or None = None):
    
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)

    return encoded_jwt


#Validar si es necesario
async def get_current_user(token: str = Depends(oauth2_schema)):
    
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        id_usuario: str = payload.get("id_usuario")
        id_proyecto: str = payload.get("id_proyecto")
        id_campus: str = payload.get("id_campus")

        tipo_usuario: str = payload.get("tipo_usuario")
        nombre: str = payload.get("nombre")
        correo: str = payload.get("correo")
        activo: str = payload.get("activo")
        
        ''' variables
        #id_proyecto: str = payload.get("id_proyecto")
        #id_campus: str = payload.get("id_campus")
        #tipo_usuario: str = payload.get("tipo_usuario")
        #nombre: str = payload.get("nombre")
        #correo: str = payload.get("correo")
        #exp: str = payload.get("exp")
        #print("id_usuario: ", id_usuario) 
        #print("id_proyecto: ", id_proyecto) 
        #print("id_campus: ", id_campus) 
        #print("tipo_usuario: ", tipo_usuario)
        #print("nombre: ", nombre) 
        #print("correo: ", correo)
        #print("activo: ", activo)
        #print("exp: ", exp)
        '''

        if not id_usuario :
            raise credential_exception

        token_data = TokenData(
            id_usuario = id_usuario, activo = activo, id_proyecto = id_proyecto,
            id_campus = id_campus, tipo_usuario = tipo_usuario, nombre = nombre,
            correo = correo
            )

    except JWTError:
        raise credential_exception

    ##########
        # Validar el tiempo de expiración del token 
    ##########

    return token_data


# Obtiene el usuario actual, falta agregar que el tiempo de token se encuentre expirado
async def get_current_active_user(current_user: Usuario = Depends(get_current_user)):
    try:
        #print("current_user_activo: ", current_user.activo)
        if not current_user.activo:
            #raise HTTPException(status_code=400, detail="Inactive user")
            raise credential_exception
        
    except JWTError:
        raise credential_exception

    return current_user


#Rescatar los datos del usuario desde el token
@router.get("/user_data", tags=["Security"], response_model = TokenData)
def getUser_data(token: str = Depends(oauth2_schema)):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[ALGORITHM])
        id_usuario: str = payload.get("id_usuario")
        print(id_usuario)
        id_proyecto: str = payload.get("id_proyecto")
        id_campus: str = payload.get("id_campus")

        tipo_usuario: str = payload.get("tipo_usuario")
        nombre: str = payload.get("nombre")
        correo: str = payload.get("correo")
        activo: str = payload.get("activo")

        ''' variables
        #id_proyecto: str = payload.get("id_proyecto")
        #id_campus: str = payload.get("id_campus")
        #tipo_usuario: str = payload.get("tipo_usuario")
        #nombre: str = payload.get("nombre")
        #correo: str = payload.get("correo")
        #exp: str = payload.get("exp")
        #print("id_usuario: ", id_usuario) 
        #print("id_proyecto: ", id_proyecto) 
        #print("id_campus: ", id_campus) 
        #print("tipo_usuario: ", tipo_usuario)
        #print("nombre: ", nombre) 
        #print("correo: ", correo)
        #print("activo: ", activo)
        #print("exp: ", exp)
        '''

        if not id_usuario :
            raise credential_exception

        token_data = TokenData(
            id_usuario = id_usuario, activo = activo, id_proyecto = id_proyecto,
            id_campus = id_campus, tipo_usuario = tipo_usuario, nombre = nombre,
            correo = correo
            )

    except JWTError:
        raise credential_exception

    ##########
        # Validar el tiempo de expiración del token 
    ##########

    return token_data


@router.post("/user_login", tags=["Security"], response_model = Token)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
   # try:

        #Get user from DB
        user_db = login_user(form_data.username, form_data.password)

        #Validando que el usuario no sea vacío
        if user_db == "[]" :
            raise credential_exception

        #cargar json a user_to_encode
        user_to_encode = json.loads(user_db)

        # pasar los datos al Model Usuario
        usuario_encode = Usuario(**user_to_encode[0]) 

        print ("usuario_encode: " , usuario_encode)

        #creamos el tiempo de expiración de Token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        #Creamos access_token 
        access_token = create_access_token(
            data={"id_usuario": usuario_encode.id_usuario, 
                  "id_proyecto" : usuario_encode.id_proyecto, 
                  "id_campus" : usuario_encode.id_campus, 
                  "tipo_usuario" : usuario_encode.tipo_usuario, 
                  #"contrasena" : usuario_encode.contrasena, 
                  "nombre" : usuario_encode.nombre, 
                  "correo" : usuario_encode.correo, 
                  "activo" : usuario_encode.activo}, 
                  expires_delta = access_token_expires)
        
        print ("access_token: ", access_token)
        #print ("len token: ", len(access_token))

        return {"access_token": access_token, "token_type": "bearer"}
    
'''except Exception as e:
        logging.debug(e)
        content = {f"Error en consultar login en el servicio de API : {e}"}
        return JSONResponse(content=content, status_code=500)'''


#GetConsumo Test
@router.get('/Consumos_Token', tags=["Security"])
def getConsumo_token(my_user: Usuario = Depends(get_current_active_user)):
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        url = f"http://realiza-service:{3000}/Consumos"
        res = requests.get(url).json()
        #logging.debug(res)
        json_str = json.dumps(res, indent=4, default=str)

        return JSONResponse(content=json_str, status_code=200)
    except Exception as e:
        logging.debug(e)
        content = {f"Error en consultar datos en el servicio Consumos_Token : {e}"}
        return JSONResponse(content=content, status_code=500)
