from fastapi import APIRouter, Body, Query
from typing import Optional
from app.services.transaccion_service import (
    obtener_transacciones_service, agregar_transaccion_service, buscar_transacciones_por_tipo_service
)

router = APIRouter()

@router.get("/{cliente_id}")
def obtener_transacciones(cliente_id: str):
    return obtener_transacciones_service(cliente_id)

@router.get("/search")
def buscar_transacciones(tipo: Optional[str] = Query(None, description="Buscar transacciones por tipo")):
    return buscar_transacciones_por_tipo_service(tipo)

@router.post("/")
def agregar_transaccion(
    transaccion_id: str = Body(...), monto: float = Body(...),
    cuenta_origen_id: str = Body(...), cuenta_destino_id: str = Body(...),
    tipo: str = Body(...), canal: str = Body(...)):
    return agregar_transaccion_service(transaccion_id, monto, cuenta_origen_id, cuenta_destino_id, tipo, canal)