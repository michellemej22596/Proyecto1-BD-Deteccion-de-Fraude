from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import clientes, cuentas, tarjetas, transacciones, fraude, modelo

app.include_router(modelo.router, prefix="/modelo", tags=["Modelos de Data Science"])

from app.config import CORS_ORIGINS, CORS_ALLOW_CREDENTIALS, CORS_ALLOW_METHODS, CORS_ALLOW_HEADERS

app = FastAPI(title="API de Detección de Fraude", version="1.0")

# Aplicar configuración de CORS desde config.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=CORS_ALLOW_CREDENTIALS,
    allow_methods=CORS_ALLOW_METHODS,
    allow_headers=CORS_ALLOW_HEADERS,
)

# Registrar rutas
app.include_router(clientes.router, prefix="/clientes", tags=["Clientes"])
app.include_router(cuentas.router, prefix="/cuentas", tags=["Cuentas Bancarias"])
app.include_router(tarjetas.router, prefix="/tarjetas", tags=["Tarjetas"])
app.include_router(transacciones.router, prefix="/transacciones", tags=["Transacciones"])
app.include_router(fraude.router, prefix="/fraude", tags=["Fraude"])
app.include_router(modelo.router, prefix="/modelo", tags=["Modelos de Data Science"])

@app.get("/")
def home():
    return {"message": "Bienvenido a la API de Detección de Fraude"}
