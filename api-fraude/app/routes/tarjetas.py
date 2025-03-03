from fastapi import APIRouter
from pydantic import BaseModel
from app.services.tarjeta_service import (
    obtener_tarjeta_service,
    buscar_tarjetas_service,
    crear_tarjeta_service,
    eliminar_tarjeta_service
)

router = APIRouter()

class TarjetaCreate(BaseModel):
    tarjeta_id: int
    tipo: str
    banco_emisor: str
    limite_credito: float
    estado: str
    cliente_id: int  # Relación con el cliente

class EstadoUpdate(BaseModel):
    estado: str

@router.get("/{tarjeta_id}")
def obtener_tarjeta(tarjeta_id: int):
    return obtener_tarjeta_service(tarjeta_id)

@router.get("/search")
def buscar_tarjetas(cliente_id: int):
    return buscar_tarjetas_service(cliente_id)

@router.post("/")
def crear_tarjeta(data: TarjetaCreate):
    return crear_tarjeta_service(
        data.tarjeta_id, data.tipo, data.banco_emisor,
        data.limite_credito, data.estado, data.cliente_id
    )


@router.delete("/{tarjeta_id}")
def eliminar_tarjeta(tarjeta_id: int):
    return eliminar_tarjeta_service(tarjeta_id)
