from fastapi import APIRouter, Body, Query
from typing import Optional
from pydantic import BaseModel
from app.services.cuenta_service import (
    obtener_cuenta_service,
    buscar_cuentas_service,
    crear_cuenta_service,
    editar_cuenta_service,
    actualizar_saldo_service,
    cambiar_estado_cuenta_service
)

router = APIRouter()

@router.get("/search")
def buscar_cuentas(cliente_id: Optional[int] = Query(None, description="Buscar por Cliente ID")):
    return buscar_cuentas_service(cliente_id)

@router.get("/{cuenta_id}")
def obtener_cuenta(cuenta_id: int):
    return obtener_cuenta_service(cuenta_id)

@router.post("/")
def crear_cuenta(
    cuenta_id: int = Body(...),
    tipo: str = Body(...),
    saldo: float = Body(...),
    estado: str = Body(...),
    fecha_apertura: str = Body(...),
    cliente_id: int = Body(...)
):
    return crear_cuenta_service(cuenta_id, tipo, saldo, estado, fecha_apertura, cliente_id)

@router.put("/{cuenta_id}")
def editar_cuenta(
    cuenta_id: int,
    tipo: Optional[str] = Body(None),
    estado: Optional[str] = Body(None)
):
    return editar_cuenta_service(cuenta_id, tipo, estado)

class SaldoUpdate(BaseModel):
    saldo: float

@router.patch("/{cuenta_id}/saldo")
def actualizar_saldo(cuenta_id: int, data: SaldoUpdate):
    return actualizar_saldo_service(cuenta_id, data.saldo)


class EstadoUpdate(BaseModel):
    estado: str

@router.patch("/{cuenta_id}/estado")
def cambiar_estado_cuenta(cuenta_id: int, data: EstadoUpdate):
    return cambiar_estado_cuenta_service(cuenta_id, data.estado)