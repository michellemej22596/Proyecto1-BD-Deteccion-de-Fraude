from app.database import db
from typing import Optional


def buscar_transacciones_por_tipo_service(tipo: Optional[str] = None):
    query = "MATCH (t:Transaccion) WHERE t.Tipo = $tipo RETURN t ORDER BY t.Fecha DESC LIMIT 20;"
    return db.query(query, {"tipo": tipo})

def obtener_transacciones_service(cliente_id: int):
    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})-[:POSEE]->(cu:CuentaBancaria)-[:REALIZA]->(t:Transaccion)
    RETURN t ORDER BY t.Fecha DESC LIMIT 20;
    """
    return db.query(query,  {"cliente_id": cliente_id})

def agregar_transaccion_service(transaccion_id, monto, cuenta_origen_id, cuenta_destino_id, tipo, canal):
    query = """
    MATCH (cuenta_origen:CuentaBancaria {Cuenta_ID: $cuenta_origen_id}),
          (cuenta_destino:CuentaBancaria {Cuenta_ID: $cuenta_destino_id})
    CREATE (t:Transaccion {Transaccion_ID: $transaccion_id, Monto: $monto, Fecha: date(), Tipo: $tipo, Canal: $canal})
    MERGE (cuenta_origen)-[:REALIZA]->(t)
    MERGE (t)-[:RECIBE_TRANSFERENCIA]->(cuenta_destino)
    RETURN t;
    """
    result = db.query(query, {
        "transaccion_id": transaccion_id, "monto": monto,
        "cuenta_origen_id": cuenta_origen_id, "cuenta_destino_id": cuenta_destino_id,
        "tipo": tipo, "canal": canal
    })
    return result

