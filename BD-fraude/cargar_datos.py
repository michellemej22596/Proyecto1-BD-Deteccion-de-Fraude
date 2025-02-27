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

def insertar_cuentas():
    query = """
    CREATE (:CuentaBancaria {Cuenta_ID: $Cuenta_ID, Tipo: $Tipo, Saldo: $Saldo, Estado: $Estado, Fecha_Apertura: date($Fecha_Apertura)})
    """
    with conexion.driver.session() as session:
        for _, row in cuentas.iterrows():
            session.run(query, Cuenta_ID=int(row["Cuenta_ID"]), Tipo=row["Tipo"],
                        Saldo=float(row["Saldo"]), Estado=row["Estado"], Fecha_Apertura=row["Fecha_Apertura"])
    print("✅ Cuentas insertadas.")

def insertar_transacciones():
    query = """
    CREATE (:Transaccion {Transaccion_ID: $Transaccion_ID, Monto: $Monto, Fecha: date($Fecha), Tipo: $Tipo, Canal: $Canal})
    """
    with conexion.driver.session() as session:
        for _, row in transacciones.iterrows():
            session.run(query, Transaccion_ID=int(row["Transaccion_ID"]), Monto=float(row["Monto"]),
                        Fecha=row["Fecha"], Tipo=row["Tipo"], Canal=row["Canal"])
    print("✅ Transacciones insertadas.")

# Ejecutar las inserciones
if __name__ == "__main__":
    insertar_clientes()
    insertar_cuentas()
    insertar_transacciones()
    conexion.close_connection()
