
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime



class Token(BaseModel):
    access_token: str = Field(min_length=3, max_length=500)
    token_type: str = Field(min_length=3, max_length=50)

class TokenData(BaseModel):
    id_usuario: str or None = None
    activo: bool or None = None
    id_proyecto: int or None = None
    id_campus: int or None = None
    tipo_usuario: str or None = None
    nombre: str or None = None
    correo: str or None = None
