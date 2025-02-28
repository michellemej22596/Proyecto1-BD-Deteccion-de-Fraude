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
            fecha_limpia = row["Fecha"].split(" ")[0]  # Toma solo la parte de la fecha (YYYY-MM-DD)
            session.run(query, Transaccion_ID=int(row["Transaccion_ID"]), Monto=float(row["Monto"]),
                        Fecha=fecha_limpia, Tipo=row["Tipo"], Canal=row["Canal"])
    print("✅ Transacciones insertadas.")

def insertar_comercios():
    query = """
    CREATE (:Comercio {Comercio_ID: $Comercio_ID, Nombre: $Nombre, Categoría: $Categoría, País: $País, Fecha_Apertura: date($Fecha_Apertura)})
    """
    with conexion.driver.session() as session:
        for _, row in comercios.iterrows():
            fecha_limpia = row["Fecha_Apertura"].split(" ")[0]  # Eliminar hora si está presente
            session.run(query, Comercio_ID=int(row["Comercio_ID"]), Nombre=row["Nombre"],
                        Categoría=row["Categoría"], País=row["País"], Fecha_Apertura=fecha_limpia)
    print("✅ Comercios insertados.")

def insertar_ubicaciones():
    query = """
    CREATE (:Ubicacion {Ubicacion_ID: $Ubicacion_ID, Ciudad: $Ciudad, País: $País, Código_Postal: $Código_Postal, Nivel_Seguridad: $Nivel_Seguridad})
    """
    with conexion.driver.session() as session:
        for _, row in ubicaciones.iterrows():
            session.run(query, Ubicacion_ID=int(row["Ubicacion_ID"]), Ciudad=row["Ciudad"],
                        País=row["País"], Código_Postal=int(row["Código_Postal"]), Nivel_Seguridad=row["Nivel_Seguridad"])
    print("✅ Ubicaciones insertadas.")

def insertar_tarjetas():
    query = """
    CREATE (:Tarjeta {Tarjeta_ID: $Tarjeta_ID, Tipo: $Tipo, Banco_Emisor: $Banco_Emisor, Límite_Crédito: $Límite_Crédito, EstaActivo: $EstaActivo})
    """
    with conexion.driver.session() as session:
        for _, row in tarjetas.iterrows():
            session.run(query, Tarjeta_ID=int(row["Tarjeta_ID"]), Tipo=row["Tipo"],
                        Banco_Emisor=row["Banco_Emisor"], Límite_Crédito=float(row["Límite_Crédito"]),
                        EstaActivo=bool(row["EstaActivo"]))
    print("✅ Tarjetas insertadas.")

# Ejecutar las inserciones
if __name__ == "__main__":
    insertar_clientes()
    insertar_cuentas()
    insertar_transacciones()
    insertar_comercios()
    insertar_cuentas()
    insertar_ubicaciones()
    conexion.close_connection()
