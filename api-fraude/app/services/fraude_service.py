from app.database import db

def detectar_fraude_service():
    query = """
    MATCH (c:Cliente)-[:POSEE]->(cu:CuentaBancaria)-[:REALIZA]->(t:Transacción)
    WHERE t.Monto > 5000 OR NOT EXISTS {
      MATCH (c)-[:UBICADO_EN]->(:Ubicación)<-[:UBICADO_EN]-(t)
    }
    RETURN c AS Cliente, t AS Transacción;
    """
    return db.query(query)

def conexiones_sospechosas_service():
    query = """
    MATCH (c1:Cliente)-[:POSEE]->(cu1:CuentaBancaria)-[:REALIZA]->(t:Transacción)-[:RECIBE_TRANSFERENCIA]->(cu2:CuentaBancaria)<-[:POSEE]-(c2:Cliente)
    WHERE NOT EXISTS { MATCH (c1)-[:UBICADO_EN]->(:Ubicación)<-[:UBICADO_EN]-(c2) }
    RETURN c1 AS Cliente_Origen, c2 AS Cliente_Destino, t AS Transacción;
    """
    return db.query(query)