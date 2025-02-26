from fastapi import APIRouter
from app.services.fraude_service import detectar_fraude_service, conexiones_sospechosas_service, fraude_recurrente_service, clientes_con_historial_fraude_service

router = APIRouter()

@router.get("/detectar")
def detectar_fraude():
    return detectar_fraude_service()

@router.get("/conexiones-sospechosas")
def conexiones_sospechosas():
    return conexiones_sospechosas_service()

@router.get("/fraude-recurrente")
def fraude_recurrente():
    return fraude_recurrente_service()

@router.get("/clientes-sospechosos")
def clientes_sospechosos():
    return clientes_con_historial_fraude_service()

