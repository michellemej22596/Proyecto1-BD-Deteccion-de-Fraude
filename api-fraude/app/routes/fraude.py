from fastapi import APIRouter
from app.database import db

router = APIRouter()

@router.get("/detectar")
def detectar_fraude():
    query = """
    MATCH (c:Cliente)-[:REALIZA]->(t:Transaccion)
    WHERE t.monto > 5000 OR t.ubicacion <> c.ubicacion
    RETURN c, t
    """
    result = db.query(query)
    return {"fraudes_detectados": result}
