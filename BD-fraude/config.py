from neo4j import GraphDatabase

# URL de conexión a Neo4j AuraDB
URI = "neo4j+s://1207dcba.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "wZQKdJwx9INb2k-6-fhqT9VE6Zt0o1cGyZgeBGByGRw"

conexion = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

# 🔹 Función para ejecutar consultas en Neo4j
def query(cypher_query, parameters=None):
    with conexion.session() as session:
        result = session.run(cypher_query, parameters or {})
        return [record for record in result]  # Retorna los resultados como una lista de diccionarios

def close_connection():
    conexion.close()