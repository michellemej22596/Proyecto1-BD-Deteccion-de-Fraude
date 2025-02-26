from app.database import db
from typing import Optional

# Obtener información de una cuenta
def obtener_cuenta_service(cuenta_id: int):
    query = """
    MATCH (cu:CuentaBancaria {Cuenta_ID: $cuenta_id})
    RETURN cu;
    """
    result = db.query(query, {"cuenta_id": cuenta_id})
    return result[0] if result else {"error": "Cuenta no encontrada"}

# Buscar cuentas por Cliente ID
def buscar_cuentas_service(cliente_id: Optional[int] = None):
    if not cliente_id:
        return {"error": "Debe proporcionar un Cliente ID"}

    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})-[:POSEE]->(cu:CuentaBancaria)
    RETURN cu;
    """
    result = db.query(query, {"cliente_id": cliente_id})
    return result

# Crear una nueva cuenta bancaria
def crear_cuenta_service(cuenta_id: int, tipo: str, saldo: float, estado: str, fecha_apertura: str, cliente_id: int):
    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})
    CREATE (cu:CuentaBancaria {Cuenta_ID: $cuenta_id, Tipo: $tipo, Saldo: $saldo, Estado: $estado, Fecha_Apertura: $fecha_apertura})
    MERGE (c)-[:POSEE]->(cu)
    RETURN cu;
    """
    result = db.query(query, {
        "cuenta_id": cuenta_id, "tipo": tipo, "saldo": saldo,
        "estado": estado, "fecha_apertura": fecha_apertura, "cliente_id": cliente_id
    })
    return result[0]

# Editar una cuenta bancaria
def editar_cuenta_service(cuenta_id: int, tipo: Optional[str] = None, estado: Optional[str] = None):
    query = "MATCH (cu:CuentaBancaria {Cuenta_ID: $cuenta_id}) SET "
    params = {"cuenta_id": cuenta_id}
    updates = []

    if tipo:
        updates.append("cu.Tipo = $tipo")
        params["tipo"] = tipo
    if estado:
        updates.append("cu.Estado = $estado")
        params["estado"] = estado

    if not updates:
        return {"error": "No hay campos para actualizar"}

    query += ", ".join(updates) + " RETURN cu;"
    result = db.query(query, params)
    return result[0]

def actualizar_saldo_service(cuenta_id: int, saldo: float):
    query = """
    MATCH (cu:CuentaBancaria {Cuenta_ID: $cuenta_id})
    SET cu.Saldo = $saldo
    RETURN cu;
    """
    result = db.query(query, {"cuenta_id": cuenta_id, "saldo": saldo})
    return result[0] if result else {"error": "Cuenta no encontrada"}


# Activar/Desactivar una cuenta bancaria
def cambiar_estado_cuenta_service(cuenta_id: int, estado: str):
    query = """
    MATCH (cu:CuentaBancaria {Cuenta_ID: $cuenta_id})
    SET cu.Estado = $estado
    RETURN cu;
    """
    result = db.query(query, {"cuenta_id": cuenta_id, "estado": estado})
    return result[0] if result else {"error": "Cuenta no encontrada"}
