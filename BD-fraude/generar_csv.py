import pandas as pd
import numpy as np

# Definir el número de registros
num_clientes = 1000
num_cuentas = 1200
num_transacciones = 5000
num_comercios = 500
num_ubicaciones = 300
num_tarjetas = 800

# Generar datos para Clientes
clientes = pd.DataFrame({
    "Cliente_ID": range(1, num_clientes + 1),
    "Nombre": [f"Cliente_{i}" for i in range(1, num_clientes + 1)],
    "Edad": np.random.randint(18, 70, num_clientes),
    "País": np.random.choice(["Guatemala", "México", "Colombia"], num_clientes),
    "Estado": np.random.choice(["Activo", "Inactivo"], num_clientes)
})

# Generar datos para Cuentas Bancarias
cuentas = pd.DataFrame({
    "Cuenta_ID": range(1, num_cuentas + 1),
    "Tipo": np.random.choice(["Corriente", "Ahorro"], num_cuentas),
    "Saldo": np.random.uniform(0, 50000, num_cuentas),
    "Estado": np.random.choice(["Activa", "Inactiva"], num_cuentas),
    "Fecha_Apertura": pd.date_range(start="2015-01-01", periods=num_cuentas, freq="D")
})

# Generar datos para Transacciones
transacciones = pd.DataFrame({
    "Transaccion_ID": range(1, num_transacciones + 1),
    "Monto": np.random.uniform(1, 10000, num_transacciones),
    "Fecha": pd.date_range(start="2023-01-01", periods=num_transacciones, freq="H"),
    "Tipo": np.random.choice(["Compra", "Transferencia", "Retiro"], num_transacciones),
    "Canal": np.random.choice(["Cajero", "Banca en Línea", "Sucursal"], num_transacciones)
})

# Generar datos para Comercios
comercios = pd.DataFrame({
    "Comercio_ID": range(1, num_comercios + 1),
    "Nombre": [f"Comercio_{i}" for i in range(1, num_comercios + 1)],
    "Categoría": np.random.choice(["Supermercado", "Ropa", "Electrónica"], num_comercios),
    "País": np.random.choice(["Guatemala", "México", "Colombia"], num_comercios),
    "Fecha_Apertura": pd.date_range(start="2010-01-01", periods=num_comercios, freq="M")
})

# Generar datos para Ubicaciones
ubicaciones = pd.DataFrame({
    "Ubicacion_ID": range(1, num_ubicaciones + 1),
    "Ciudad": np.random.choice(["Ciudad de Guatemala", "Ciudad de México", "Bogotá"], num_ubicaciones),
    "País": np.random.choice(["Guatemala", "México", "Colombia"], num_ubicaciones),
    "Código_Postal": np.random.randint(10000, 99999, num_ubicaciones),
    "Nivel_Seguridad": np.random.choice(["Alto", "Medio", "Bajo"], num_ubicaciones)
})

# Generar datos para Tarjetas
tarjetas = pd.DataFrame({
    "Tarjeta_ID": range(1, num_tarjetas + 1),
    "Tipo": np.random.choice(["Débito", "Crédito"], num_tarjetas),
    "Banco_Emisor": np.random.choice(["Banco A", "Banco B", "Banco C"], num_tarjetas),
    "Límite_Crédito": np.random.uniform(500, 20000, num_tarjetas),
    "Estado": np.random.choice(["Activa", "Bloqueada"], num_tarjetas)
})

# Guardar los archivos CSV
clientes.to_csv("clientes.csv", index=False)
cuentas.to_csv("cuentas.csv", index=False)
transacciones.to_csv("transacciones.csv", index=False)
comercios.to_csv("comercios.csv", index=False)
ubicaciones.to_csv("ubicaciones.csv", index=False)
tarjetas.to_csv("tarjetas.csv", index=False)

print("✅ Archivos CSV generados correctamente.")
