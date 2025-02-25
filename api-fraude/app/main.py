from fastapi import FastAPI
from app.routes import clientes, transacciones, fraude

app = FastAPI(title="API de Detección de Fraude", version="1.0")

# Registrar rutas
app.include_router(clientes.router, prefix="/clientes", tags=["Clientes"])
app.include_router(transacciones.router, prefix="/transacciones", tags=["Transacciones"])
app.include_router(fraude.router, prefix="/fraude", tags=["Fraude"])

@app.get("/")
def home():
    return {"message": "Bienvenido a la API de Detección de Fraude"}

# Para correr la API en local:
# uvicorn app.main:app --reload
