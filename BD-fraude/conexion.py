from neo4j import GraphDatabase
import config  # Importamos las credenciales desde config.py

# Configurar la conexión a Neo4j AuraDB
driver = GraphDatabase.driver(config.URI, auth=(config.USER, config.PASSWORD))

# Función para ejecutar consultas Cypher
def run_query(query, parameters=None):
    with driver.session() as session:
        session.run(query, parameters)

# Cerrar la conexión
def close_connection():
    driver.close()
