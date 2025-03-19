from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.consumo import router as consumos_router
from routers.alcances import router as alcance_router
from routers.campus import router as campus_router
from routers.factor_de_emision import router as factoresEmision_router
from routers.fuentes import router as fuentes_router
from routers.proyectos import router as proyectos_router
from routers.subcategorias import router as subCategoria_router
from routers.tipos_gas_gei import router as tiposGasGEI_router
from routers.unidad_factor_emision import router as unidadFactor_router
from routers.unidad_fuentes import router as unidadFuente_router
from routers.usuario import router as usuario_router
from routers.consumos_subirExcel import router as consumo_excel_router

#token
from routers.token_router import router as token_router

app = FastAPI()

app.title = "RealizaAPP API"
app.version = "0.0.1"

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes, puedes restringir esto a dominios específicos.
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todas las cabeceras
)


@app.get('/')
def index():
    return "Bienvenido a Api Realiza"

#app.include_router(product_router)
app.include_router(consumos_router)
app.include_router(alcance_router)
app.include_router(campus_router)
app.include_router(factoresEmision_router)
app.include_router(fuentes_router)
app.include_router(proyectos_router)
app.include_router(subCategoria_router)
app.include_router(tiposGasGEI_router)
app.include_router(unidadFactor_router)
app.include_router(unidadFuente_router)
app.include_router(usuario_router)

#token
app.include_router(token_router)

#test archivo Excel
app.include_router(consumo_excel_router)
