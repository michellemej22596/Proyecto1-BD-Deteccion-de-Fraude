from fastapi import APIRouter
from app.services.modelo_service import detectar_comunidades_service

router = APIRouter()

@router.get("/fraude/redes-sospechosas")
def redes_sospechosas():
    """
    Endpoint para detectar comunidades sospechosas en la red de transacciones.
    """
    return detectar_comunidades_service()
