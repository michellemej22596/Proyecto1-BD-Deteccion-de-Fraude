from fastapi import APIRouter
from app.services.fraude_service import detectar_fraude_service, conexiones_sospechosas_service

router = APIRouter()

@router.get("/detectar")
def detectar_fraude():
    return detectar_fraude_service()

@router.get("/conexiones-sospechosas")
def conexiones_sospechosas():
    return conexiones_sospechosas_service()