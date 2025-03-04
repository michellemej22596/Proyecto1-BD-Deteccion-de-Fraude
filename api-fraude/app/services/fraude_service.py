from app.database import db

def detectar_fraude_service():
    query = """
    MATCH (c:Cliente)-[:POSEE]->(cu:CuentaBancaria)-[:REALIZA]->(t:Transaccion)
    WHERE t.Monto > 5000 OR NOT EXISTS {
      MATCH (c)-[:UBICADO_EN]->(:Ubicación)<-[:UBICADO_EN]-(t)
    }
    RETURN c AS Cliente, t AS Transaccion;
    """
    return db.query(query)

def conexiones_sospechosas_service():
    query = """
    MATCH (c1:Cliente)-[:POSEE]->(cu1:CuentaBancaria)-[:REALIZA]->(t:Transaccion)-[:ENVÍA]->(t2:Transaccion)
    MATCH (t2)-[:EFECTUADA_EN]->(com:Comercio)
    RETURN c1 AS Cliente_Origen, com AS Comercio, t AS Transaccion
    LIMIT 50;
    """
    return db.query(query)

def fraude_recurrente_service():
    query = """
    MATCH (c:Cliente)-[:POSEE]->(cu:CuentaBancaria)-[:REALIZA]->(t:Transaccion)
    WHERE t.Monto > 5000 OR NOT EXISTS {
      MATCH (c)-[:UBICADO_EN]->(:Ubicación)<-[:UBICADO_EN]-(t)
    }
    WITH c, COUNT(t) AS fraude_count
    WHERE fraude_count > 3
    RETURN c AS Cliente, fraude_count;
    """
    return db.query(query)

def clientes_con_historial_fraude_service():
    query = """
    MATCH (c1:Cliente)-[:POSEE]->(cu1:CuentaBancaria)-[:REALIZA]->(t:Transaccion)-[:RECIBE_TRANSFERENCIA]->(cu2:CuentaBancaria)<-[:POSEE]-(c2:Cliente)
    WHERE c2 IN (
        MATCH (c:Cliente)-[:POSEE]->(:CuentaBancaria)-[:REALIZA]->(t:Transaccion)
        WHERE t.Monto > 5000
        RETURN c
    )
    RETURN c1 AS Cliente_Sospechoso, c2 AS Cliente_Fraudulento;
    """
    return db.query(query)

