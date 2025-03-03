from app.database import db

def detectar_comunidades_service():
    """
    Ejecuta el algoritmo de detección de comunidades en Neo4j usando GDSL.
    """
    query = """
    CALL gds.labelPropagation.stream({
        nodeProjection: 'Cliente',
        relationshipProjection: {
            REALIZA: {
                type: 'REALIZA',
                properties: 'Monto'
            }
        },
        maxIterations: 10
    })
    YIELD nodeId, communityId
    RETURN gds.util.asNode(nodeId).Cliente_ID AS Cliente, communityId;
    """
    return db.query(query)
