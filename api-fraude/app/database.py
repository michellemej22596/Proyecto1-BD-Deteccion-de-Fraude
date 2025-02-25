from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configuración de Neo4j
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

class Neo4jConnection:
    def __init__(self):
        self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

    def close(self):
        self.driver.close()

    def query(self, query, parameters={}):
        with self.driver.session() as session:
            result = session.run(query, parameters)
            return [record.data() for record in result]

# Instancia única de la conexión a la base de datos
db = Neo4jConnection()
