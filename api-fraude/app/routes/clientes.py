from fastapi import APIRouter
from app.database import db

router = APIRouter()

@router.get("/{cliente_id}")
def obtener_cliente(cliente_id: str):
    query = """
    MATCH (c:Cliente {id: $cliente_id})-[:POSEE]->(cu:Cuenta)
    RETURN c, collect(cu) AS cuentas
    """
    result = db.query(query, {"cliente_id": cliente_id})
    return {"cliente": result}
