from fastapi import APIRouter
from app.database import db

router = APIRouter()

@router.get("/{cliente_id}")
def obtener_transacciones(cliente_id: str):
    query = """
    MATCH (c:Cliente {id: $cliente_id})-[:REALIZA]->(t:Transaccion)
    RETURN t ORDER BY t.fecha DESC LIMIT 20
    """
    result = db.query(query, {"cliente_id": cliente_id})
    return {"transacciones": result}
