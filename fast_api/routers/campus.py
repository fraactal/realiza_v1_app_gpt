from fastapi import APIRouter, Response, status, Request, Depends

from models.campus import Campus

import logging
import json
import requests

from models.usuario import Usuario
from routers.token_router import get_current_active_user

router = APIRouter()

@router.get('/Campus', tags=["Campus"])
def get_campus(my_user: Usuario = Depends(get_current_active_user)):
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        url = f"http://realiza-service:{3000}/Campus"
        res = requests.get(url).json()
        json_str = json.dumps(res, indent=4, default=str)

        return Response(content=json_str, media_type='application/json', status_code=status.HTTP_200_OK)
    except Exception as e:
        logging.debug(e)
        # Fortalecer respuestas con errores
        return {"message":"Error en consultar datos en el servicio de API"}

'''
@app.route("/Campus")
def Campus():
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        url = f"http://realiza-service:{3000}/Campus"
        res = requests.get(url).json()
        return json.dumps(res, indent=4)
    except Exception as e:
        logging.debug(e)
        return {"message":"Error en consultar datos en el servicio de API"}

'''