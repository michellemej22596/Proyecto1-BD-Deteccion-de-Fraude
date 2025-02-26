from app.database import db
from typing import Optional

# Obtener información de una tarjeta
def obtener_tarjeta_service(tarjeta_id: int):
    query = """
    MATCH (t:Tarjeta {Tarjeta_ID: $tarjeta_id})
    RETURN t;
    """
    result = db.query(query, {"tarjeta_id": tarjeta_id})
    return result[0] if result else {"error": "Tarjeta no encontrada"}

# Buscar tarjetas por Cliente ID
def buscar_tarjetas_service(cliente_id: Optional[int] = None):
    if not cliente_id:
        return {"error": "Debe proporcionar un Cliente ID"}

    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})-[:TIENE_TARJETA]->(t:Tarjeta)
    RETURN t;
    """
    result = db.query(query, {"cliente_id": cliente_id})
    return result

def crear_tarjeta_service(tarjeta_id: int, tipo: str, banco_emisor: str, limite_credito: float, estado: str, cliente_id: int):
    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})
    CREATE (t:Tarjeta {Tarjeta_ID: $tarjeta_id, Tipo: $tipo, Banco_Emisor: $banco_emisor,
                       Límite_Crédito: $limite_credito, Estado: $estado})
    MERGE (c)-[:TIENE_TARJETA]->(t)
    RETURN t;
    """
    result = db.query(query, {
        "tarjeta_id": tarjeta_id, "tipo": tipo, "banco_emisor": banco_emisor,
        "limite_credito": limite_credito, "estado": estado, "cliente_id": cliente_id
    })
    return result[0]


# Activar/Desactivar una tarjeta
def cambiar_estado_tarjeta_service(tarjeta_id: int, estado: str):
    query = """
    MATCH (t:Tarjeta {Tarjeta_ID: $tarjeta_id})
    SET t.Estado = $estado
    RETURN t;
    """
    result = db.query(query, {"tarjeta_id": tarjeta_id, "estado": estado})
    return result[0] if result else {"error": "Tarjeta no encontrada"}
