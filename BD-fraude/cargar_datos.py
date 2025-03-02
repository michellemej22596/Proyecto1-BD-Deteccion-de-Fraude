import pandas as pd
import conexion

# Leer CSVs
clientes = pd.read_csv("clientes.csv")
cuentas = pd.read_csv("cuentas.csv")
transacciones = pd.read_csv("transacciones.csv")
comercios = pd.read_csv("comercios.csv")
ubicaciones = pd.read_csv("ubicaciones.csv")
tarjetas = pd.read_csv("tarjetas.csv")

# Insertar datos en Neo4j
def insertar_clientes():
    query = """
    CREATE (:Cliente {Cliente_ID: $Cliente_ID, Nombre: $Nombre, Edad: $Edad, País: $País, Estado: $Estado})
    """
    with conexion.driver.session() as session:
        for _, row in clientes.iterrows():
            session.run(query, Cliente_ID=int(row["Cliente_ID"]), Nombre=row["Nombre"],
                        Edad=int(row["Edad"]), País=row["País"], Estado=row["Estado"])
    print("✅ Clientes insertados.")

# Ejecutar las inserciones
if __name__ == "__main__":
    insertar_clientes()
    conexion.close_connection()
