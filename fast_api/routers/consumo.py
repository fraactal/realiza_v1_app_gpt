from fastapi import Depends, APIRouter, Response, status, Request
from fastapi.responses import FileResponse, JSONResponse

from models.consumo import Consumo

import logging
import json
import requests

from models.usuario import Usuario
from routers.token_router import get_current_active_user


router = APIRouter()

@router.get('/Consumos', tags=["Consumos"])
def get_consumo(my_user: Usuario = Depends(get_current_active_user)):
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        url = f"http://realiza-service:{3000}/Consumos"
        res = requests.get(url).json()
        #logging.debug("RES/n")
        #logging.debug(res)
        #json_str = json.dumps(res, indent=4, default=str)

        #return Response(content=json_str, media_type='application/json', status_code=status.HTTP_200_OK)
        return JSONResponse(content=res, status_code=200)
    except Exception as e:
        logging.debug(e)
        # Fortalecer respuestas con errores
        content = {f"Error en consultar datos en el servicio de API : {e}"}
        return JSONResponse(content=content, status_code=500)

@router.get('/Consumos/sede/', tags=["Consumos"])
def get_consumo_sede(request: Request, my_user: Usuario = Depends(get_current_active_user)):
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        params = request.query_params
        url = f"http://realiza-service:{3000}/Consumos/sede/?{params}"
        logging.debug("URL BACK: ", url)
        res = requests.get(url).json()
        #logging.debug(res)
        json_str = json.dumps(res, indent=4, default=str)
        return Response(content=json_str, media_type='application/json', status_code=status.HTTP_200_OK)
    except Exception as e:
        logging.debug(e)
        # Fortalecer respuestas con errores
        #return {"message":"Error en consultar datos en el servicio de API/n {e}"}

        content = {f"Error en consultar datos en el servicio de API getconsumo_sede: {e}"}
        return JSONResponse(content=content, status_code=500)


@router.get('/Consumos/alcance/', tags=["Consumos"])
def get_consumo_alcance(request: Request, my_user: Usuario = Depends(get_current_active_user)):
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        params = request.query_params
        url = f"http://realiza-service:{3000}/Consumos/alcance/?{params}"
        logging.debug("URL BACK: ", url)
        res = requests.get(url).json()
        #logging.debug(res)
        json_str = json.dumps(res, indent=4, default=str)
        return Response(content=json_str, media_type='application/json', status_code=status.HTTP_200_OK)
    except Exception as e:
        logging.debug(e)
        # Fortalecer respuestas con errores
        #return {"message":"Error en consultar datos en el servicio de API/n {e}"}

        content = {f"Error en consultar datos en el servicio de API getconsumo_sede: {e}"}
        return JSONResponse(content=content, status_code=500)

######################
'''
@router.get('/consumos/sede/{sede}')
def get_consumo(sede:str):
    try:
        # al ser un docker compose, la url lleva el nombre del servicio realiza-service
        url = f"http://realiza-service:{3000}/Consumos/sede/"
        logging.debug("URL BACK: ", url)
        res = requests.get(url).json()
        logging.debug("RES/n")
        #logging.debug(res)
        json_str = json.dumps(res, indent=4, default=str)
        #for field_dict in Consumo.model_validate()['fields']:
        #    #Consumo.model_validate(field_dict)
        #    logging.debug("Dentro del Json")
        #    logging.debug(Consumo.model_validate_json(field_dict)) 

        return Response(content=json_str, media_type='application/json', status_code=status.HTTP_200_OK)
    except Exception as e:
        logging.debug(e)
        # Fortalecer respuestas con errores
        return {"message":"Error en consultar datos en el servicio de API"}
'''

#datos_dumy = [{'id_consumo': 'HDC0109', 'fuente': 'Traslado diario de personal - Vehículo particular - gasolina', 'cantidad_fuente': 15754373.0, 'fecha': 1724889600000, 'link_respaldo': 'Resultados Encuesta de movilidad 2022.xlsx', 'comentarios': '', 'huellachile': True, 'campus': 'TALCA'}, 
#           {'id_consumo': 'HDC0020', 'fuente': 'Sistema Eléctrico Nacional - Sistema Eléctrico Nacional', 'cantidad_fuente': 5784.31, 'fecha': 1724889600000, 'link_respaldo': 'consumos energ¡a, agua y residuos reciclaje.docx', 'comentarios': '', 'huellachile': True, 'campus': 'TALCA'}, 
#           {'id_consumo': 'HDC0039', 'fuente': 'Viajes de negocios - Aéreo - Avión trayecto internacional (promedio)', 'cantidad_fuente': 4009698.27, 'fecha': 1724889600000, 'link_respaldo': 'cometidos internacionales.xlsx', 'comentarios': '', 'huellachile': True, 'campus': 'TALCA'}, 
#           {'id_consumo': 'HDC0095', 'fuente': 'Traslado diario de personal - Vehículo particular - diesel', 'cantidad_fuente': 3271664.0, 'fecha': 1724889600000, 'link_respaldo': 'Resultados Encuesta de movilidad 2022.xlsx', 'comentarios': '', 'huellachile': True, 'campus': 'TALCA'}, 
#           {'id_consumo': 'HDC0096', 'fuente': 'Traslado diario de personal - Bus interurbano (aprox. 45 pers.)', 'cantidad_fuente': 23258608.0, 'fecha': 1724889600000, 'link_respaldo': 'Resultados Encuesta de movilidad 2022.xlsx', 'comentarios': '', 'huellachile': True, 'campus': 'TALCA'},]

#DateTimePattern['%a, %d %b %Y %H:%M:%S %Z']

