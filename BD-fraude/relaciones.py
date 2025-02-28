import pandas as pd
from neo4j import GraphDatabase

# Configurar la conexión con Neo4j
URI = "neo4j+s://1207dcba.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "wZQKdJwx9INb2k-6-fhqT9VE6Zt0o1cGyZgeBGByGRw"

driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

# Función para cargar relaciones desde un CSV
def cargar_relaciones(archivo_csv, query):
    df = pd.read_csv(archivo_csv)

    with driver.session() as session:
        for _, row in df.iterrows():
            session.run(query, **row.to_dict())
    print(f"✅ Relaciones desde {archivo_csv} insertadas correctamente.")

# 1**POSEE** (Cliente → CuentaBancaria)
query_posee = """
MATCH (c:Cliente {Cliente_ID: $Cliente_ID}), (cb:CuentaBancaria {Cuenta_ID: $Cuenta_ID})
MERGE (c)-[:POSEE {Fecha_Apertura: date($Fecha_Apertura), Estado: $Estado, Tipo_Cuenta: $Tipo_Cuenta}]->(cb)
"""
cargar_relaciones("posee.csv", query_posee)

# 2️ **REALIZA** (CuentaBancaria → Transacción)
query_realiza = """
MATCH (cb:CuentaBancaria {Cuenta_ID: $Cuenta_ID}), (t:Transaccion {Transaccion_ID: $Transaccion_ID})
MERGE (cb)-[:REALIZA {Hora: $Hora, Medio_Pago: $Medio_Pago, Canal: $Canal}]->(t)
"""
cargar_relaciones("realiza.csv", query_realiza)

# 3️**EFECTUADA_EN** (Transacción → Comercio)
query_efectuada_en = """
MATCH (t:Transaccion {Transaccion_ID: $Transaccion_ID}), (com:Comercio {Comercio_ID: $Comercio_ID})
MERGE (t)-[:EFECTUADA_EN {Tipo_Comercio: $Tipo_Comercio, País: $País, Validación: $Validación}]->(com)
"""
cargar_relaciones("efectuada_en.csv", query_efectuada_en)

# 4️**UBICADO_EN** (Comercio → Ubicación)
query_ubicado_en = """
MATCH (com:Comercio {Comercio_ID: $Comercio_ID}), (u:Ubicacion {Ubicacion_ID: $Ubicacion_ID})
MERGE (com)-[:UBICADO_EN {Fecha_Registro: date($Fecha_Registro), Código_Postal: $Código_Postal, Región: $Región}]->(u)
"""
cargar_relaciones("ubicado_en.csv", query_ubicado_en)

# 5️ **RECOMIENDA** (Cliente → Cliente)
query_recomienda = """
MATCH (c1:Cliente {Cliente_ID: $Cliente_Origen_ID}), (c2:Cliente {Cliente_ID: $Cliente_Destino_ID})
MERGE (c1)-[:RECOMIENDA {Fecha_Registro: date($Fecha_Registro), Tipo_Recomendación: $Tipo_Recomendacion, Nivel_Confianza: $Nivel_Confianza}]->(c2)
"""
cargar_relaciones("recomienda.csv", query_recomienda)

# 6️ **TIENE_TARJETA** (Cliente → Tarjeta)
query_tiene_tarjeta = """
MATCH (c:Cliente {Cliente_ID: $Cliente_ID}), (t:Tarjeta {Tarjeta_ID: $Tarjeta_ID})
MERGE (c)-[:TIENE_TARJETA {Tipo_Tarjeta: $Tipo_Tarjeta, Banco_Emisor: $Banco_Emisor, Límite_Crédito: $Límite_Crédito}]->(t)
"""
cargar_relaciones("tiene_tarjeta.csv", query_tiene_tarjeta)

# 7️ **ASOCIADA_A** (Tarjeta → CuentaBancaria)
query_asociada_a = """
MATCH (t:Tarjeta {Tarjeta_ID: $Tarjeta_ID}), (cb:CuentaBancaria {Cuenta_ID: $Cuenta_ID})
MERGE (t)-[:ASOCIADA_A {Fecha_Asociación: date($Fecha_Asociacion), Estado: $Estado, Uso_Frecuente: $Uso_Frecuente}]->(cb)
"""
cargar_relaciones("asociada_a.csv", query_asociada_a)

# 8️ **ALERTA_FRAUDE** (CuentaBancaria → Transacción)
query_alerta_fraude = """
MATCH (cb:CuentaBancaria {Cuenta_ID: $Cuenta_ID}), (t:Transaccion {Transaccion_ID: $Transaccion_ID})
MERGE (cb)-[:ALERTA_FRAUDE {Código_Alerta: $Código_Alerta, Descripción: $Descripción, Fecha_Alerta: date($Fecha_Alerta)}]->(t)
"""
cargar_relaciones("alerta_fraude.csv", query_alerta_fraude)

# 9️ **ENVÍA** (Transacción → Transacción)
query_envia = """
MATCH (t1:Transaccion {Transaccion_ID: $Transaccion_Origen_ID}), (t2:Transaccion {Transaccion_ID: $Transaccion_Destino_ID})
MERGE (t1)-[:ENVÍA {Monto: $Monto, Motivo: $Motivo, Método_Transferencia: $Método_Transferencia}]->(t2)
"""
cargar_relaciones("envia.csv", query_envia)

# 10 **OPERA_EN** (Cliente → Comercio)
query_opera_en = """
MATCH (c:Cliente {Cliente_ID: $Cliente_ID}), (com:Comercio {Comercio_ID: $Comercio_ID})
MERGE (c)-[:OPERA_EN {Frecuencia: $Frecuencia, Monto_Promedio: $Monto_Promedio, Última_Compra: date($Última_Compra)}]->(com)
"""
cargar_relaciones("opera_en.csv", query_opera_en)

# Cerrar la conexión con Neo4j
driver.close()
