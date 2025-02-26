from fastapi import APIRouter
from app.services.cliente_service import obtener_cliente_service

router = APIRouter()

@router.get("/{cliente_id}")
def obtener_cliente(cliente_id: str):
    return obtener_cliente_service(cliente_id)
