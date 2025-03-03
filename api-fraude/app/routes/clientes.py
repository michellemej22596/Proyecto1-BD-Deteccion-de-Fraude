from fastapi import APIRouter, Body, Query
from typing import Optional
from app.services.cliente_service import (
    obtener_cliente_service,
    buscar_clientes_service,
    obtener_todos_los_clientes_service,
    crear_cliente_service,
    editar_cliente_service,
    cambiar_estado_cliente_service
)

router = APIRouter()

@router.get("/")
def obtener_todos_los_clientes():
    return obtener_todos_los_clientes_service()

@router.get("/search")
def buscar_clientes(
    nombre: Optional[str] = Query(None, description="Buscar por nombre"),
    id: Optional[int] = Query(None, alias="cliente_id", description="Buscar por ID")
):
    return buscar_clientes_service(nombre, id)

@router.get("/{cliente_id}")
def obtener_cliente(cliente_id: int):
    return obtener_cliente_service(cliente_id)

@router.post("/")
def crear_cliente(
    cliente_id: int = Body(...),
    nombre: str = Body(...),
    edad: int = Body(...),
    pais: str = Body(...),
    estado: str = Body(...)
):
    return crear_cliente_service(cliente_id, nombre, edad, pais, estado)

@router.put("/{cliente_id}")
def editar_cliente(
    cliente_id: int,
    nombre: str = Body(None),
    edad: int = Body(None),
    pais: str = Body(None)
):
    return editar_cliente_service(cliente_id, nombre, edad, pais)

@router.patch("/{cliente_id}/estado")
def cambiar_estado_cliente(cliente_id: int, estado: str = Body(...)):
    return cambiar_estado_cliente_service(cliente_id, estado)
