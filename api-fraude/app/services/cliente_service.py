from app.database import db
from typing import Optional

# Obtener información de un cliente
def obtener_cliente_service(cliente_id: int):
    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})-[:POSEE]->(cu:CuentaBancaria)
    RETURN c AS cliente, collect(cu) AS cuentas;
    """
    result = db.query(query, {"cliente_id": cliente_id})
    return result[0] if result else {"error": "Cliente no encontrado"}

#Buscar clientes barra de busqueda
def buscar_clientes_service(nombre: Optional[str] = None, id: Optional[int] = None):
    query = "MATCH (c:Cliente) WHERE "
    params = {}
    conditions = []

    if nombre:
        conditions.append("c.Nombre CONTAINS $nombre")
        params["nombre"] = nombre

    if id:
        conditions.append("c.Cliente_ID = $cliente_id")
        params["cliente_id"] = id

    if not conditions:
        return {"error": "Debe proporcionar al menos un criterio de búsqueda"}

    query += " AND ".join(conditions) + " RETURN c LIMIT 10"

    result = db.query(query, params)
    return result


# Crear un nuevo cliente
def crear_cliente_service(cliente_id: int, nombre: str, edad: int, pais: str, estado: str):
    query = """
    CREATE (c:Cliente {Cliente_ID: $cliente_id, Nombre: $nombre, Edad: $edad, País: $pais, Estado: $estado})
    RETURN c;
    """
    result = db.query(query, {"cliente_id": cliente_id, "nombre": nombre, "edad": edad, "pais": pais, "estado": estado})
    return result[0]

# Editar un cliente existente
def editar_cliente_service(cliente_id: int, nombre: str = None, edad: int = None, pais: str = None):
    query = "MATCH (c:Cliente {Cliente_ID: $cliente_id}) SET "
    params = {"cliente_id": cliente_id}

    updates = []
    if nombre:
        updates.append("c.Nombre = $nombre")
        params["nombre"] = nombre
    if edad:
        updates.append("c.Edad = $edad")
        params["edad"] = edad
    if pais:
        updates.append("c.País = $pais")
        params["pais"] = pais

    if not updates:
        return {"error": "No hay campos para actualizar"}

    query += ", ".join(updates) + " RETURN c;"
    result = db.query(query, params)
    return result[0]

# Cambiar estado de un cliente (Activar/Desactivar)
def cambiar_estado_cliente_service(cliente_id: int, estado: str):
    query = """
    MATCH (c:Cliente {Cliente_ID: $cliente_id})
    SET c.Estado = $estado
    RETURN c;
    """
    result = db.query(query, {"cliente_id": cliente_id, "estado": estado})
    return result[0] if result else {"error": "Cliente no encontrado"}
