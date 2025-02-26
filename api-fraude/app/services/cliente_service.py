from app.database import db

def obtener_cliente_service(cliente_id: str):
    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})-[:POSEE]->(cu:CuentaBancaria)
    RETURN c AS cliente, collect(cu) AS cuentas;
    """
    result = db.query(query, {"cliente_id": cliente_id})
    return result[0] if result else {"error": "Cliente no encontrado"}
