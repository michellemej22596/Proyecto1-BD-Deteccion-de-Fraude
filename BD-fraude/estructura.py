from config import query  # Importamos la función query

# 🔹 Obtener el ID más alto de cada nodo
queries_max_id = {
    "Cliente": "MATCH (c:Cliente) RETURN coalesce(MAX(c.Cliente_ID), 0) AS max_id",
    "CuentaBancaria": "MATCH (cb:CuentaBancaria) RETURN coalesce(MAX(cb.Cuenta_ID), 0) AS max_id",
    "Transaccion": "MATCH (t:Transaccion) RETURN coalesce(MAX(t.Transaccion_ID), 0) AS max_id",
    "Comercio": "MATCH (com:Comercio) RETURN coalesce(MAX(com.Comercio_ID), 0) AS max_id",
    "Ubicacion": "MATCH (u:Ubicacion) RETURN coalesce(MAX(u.Ubicacion_ID), 0) AS max_id",
    "Tarjeta": "MATCH (t:Tarjeta) RETURN coalesce(MAX(t.Tarjeta_ID), 0) AS max_id"
}

# Ejecutar las consultas para obtener los IDs actuales
max_ids = {key: query(value)[0]["max_id"] for key, value in queries_max_id.items()}

# 🔹 Crear restricciones (Neo4j 5+ usa `REQUIRE` en lugar de `ASSERT`)
estructura_nodos = [
    "CREATE CONSTRAINT IF NOT EXISTS FOR (c:Cliente) REQUIRE c.Cliente_ID IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (cb:CuentaBancaria) REQUIRE cb.Cuenta_ID IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (t:Transaccion) REQUIRE t.Transaccion_ID IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (com:Comercio) REQUIRE com.Comercio_ID IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (u:Ubicacion) REQUIRE u.Ubicacion_ID IS UNIQUE",
    "CREATE CONSTRAINT IF NOT EXISTS FOR (t:Tarjeta) REQUIRE t.Tarjeta_ID IS UNIQUE"
]

# 🔹 Insertar nodos con IDs incrementales
estructura_insertar_nodos = [
    f"CREATE (:Cliente {{Cliente_ID: {max_ids['Cliente'] + 1}, Nombre: 'Nuevo Cliente'}})",
    f"CREATE (:CuentaBancaria {{Cuenta_ID: {max_ids['CuentaBancaria'] + 1}, Tipo: 'Corriente', Saldo: 5000}})",
    f"CREATE (:Transaccion {{Transaccion_ID: {max_ids['Transaccion'] + 1}, Monto: 1000.0, Tipo: 'Pago'}})",
    f"CREATE (:Comercio {{Comercio_ID: {max_ids['Comercio'] + 1}, Nombre: 'Nuevo Comercio', Categoria: 'Retail'}})",
    f"CREATE (:Ubicacion {{Ubicacion_ID: {max_ids['Ubicacion'] + 1}, Ciudad: 'Guatemala', Código_Postal: 1001}})",
    f"CREATE (:Tarjeta {{Tarjeta_ID: {max_ids['Tarjeta'] + 1}, Tipo: 'Crédito', Banco_Emisor: 'Banco A'}})"
]

# 🔹 Crear relaciones entre nodos si los datos existen
estructura_relaciones = [
    "MATCH (c:Cliente), (cb:CuentaBancaria) WHERE c.Cliente_ID = cb.Cliente_ID MERGE (c)-[:POSEE]->(cb)",
    "MATCH (cb:CuentaBancaria), (t:Transaccion) WHERE cb.Cuenta_ID = t.Cuenta_ID MERGE (cb)-[:REALIZA]->(t)",
    "MATCH (t:Transaccion), (com:Comercio) WHERE t.Transaccion_ID = com.Comercio_ID MERGE (t)-[:EFECTUADA_EN]->(com)",
    "MATCH (c:Cliente), (t:Tarjeta) WHERE c.Cliente_ID = t.Cliente_ID MERGE (c)-[:TIENE_TARJETA]->(t)",
    "MATCH (c:Cliente), (com:Comercio) WHERE c.Cliente_ID = com.Comercio_ID MERGE (c)-[:OPERA_EN]->(com)",
    "MATCH (com:Comercio), (u:Ubicacion) WHERE com.Comercio_ID = u.Ubicacion_ID MERGE (com)-[:UBICADO_EN]->(u)",
    "MATCH (cb:CuentaBancaria), (t:Transaccion) WHERE cb.Cuenta_ID = t.Cuenta_ID MERGE (cb)-[:ALERTA_FRAUDE]->(t)",
    "MATCH (t:Tarjeta), (cb:CuentaBancaria) WHERE t.Tarjeta_ID = cb.Cuenta_ID MERGE (t)-[:ASOCIADA_A]->(cb)",
    "MATCH (t1:Transaccion), (t2:Transaccion) WHERE t1.Transaccion_ID <> t2.Transaccion_ID MERGE (t1)-[:ENVÍA]->(t2)",
    "MATCH (c1:Cliente), (c2:Cliente) WHERE c1.Cliente_ID <> c2.Cliente_ID MERGE (c1)-[:RECOMIENDA]->(c2)"
]

# 🔹 Ejecutar restricciones
for query_string in estructura_nodos:
    query(query_string)

# 🔹 Insertar nodos con IDs incrementales
for query_string in estructura_insertar_nodos:
    query(query_string)

# 🔹 Crear relaciones
for query_string in estructura_relaciones:
    query(query_string)

print("✅ Estructura de la base de datos creada correctamente con IDs incrementales.")
