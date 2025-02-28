import pandas as pd
import random
from datetime import datetime, timedelta

# Configurar cantidad de datos a generar
num_relaciones = 5000

# Generar fechas aleatorias
def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))

# Rango de fechas
start_date = datetime(2020, 1, 1)
end_date = datetime(2024, 1, 1)

# Generar archivos CSV para cada relación

# POSEE (Cliente → CuentaBancaria)
posee = pd.DataFrame({
    "Cliente_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Cuenta_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Fecha_Apertura": [random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(num_relaciones)],
    "Estado": random.choices(["Activa", "Inactiva"], k=num_relaciones),
    "Tipo_Cuenta": random.choices(["Ahorro", "Corriente"], k=num_relaciones)
})
posee.to_csv("posee.csv", index=False)

# REALIZA (CuentaBancaria → Transaccion)
realiza = pd.DataFrame({
    "Cuenta_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Transaccion_ID": random.choices(range(1, 5000), k=num_relaciones),
    "Hora": [f"{random.randint(0, 23)}:{random.randint(0, 59)}:{random.randint(0, 59)}" for _ in range(num_relaciones)],
    "Medio_Pago": random.choices(["Tarjeta", "Transferencia", "Efectivo"], k=num_relaciones),
    "Canal": random.choices(["Online", "Sucursal", "App"], k=num_relaciones)
})
realiza.to_csv("realiza.csv", index=False)

# EFECTUADA_EN (Transaccion → Comercio)
efectuada_en = pd.DataFrame({
    "Transaccion_ID": random.choices(range(1, 5000), k=num_relaciones),
    "Comercio_ID": random.choices(range(1, 2000), k=num_relaciones),
    "Tipo_Comercio": random.choices(["Retail", "Alimentos", "Electrónica"], k=num_relaciones),
    "País": random.choices(["Guatemala", "México", "Colombia"], k=num_relaciones),
    "Validación": random.choices(["Exitosa", "Fallida"], k=num_relaciones)
})
efectuada_en.to_csv("efectuada_en.csv", index=False)

# RECOMIENDA (Cliente → Cliente)
recomienda = pd.DataFrame({
    "Cliente_ID_1": random.choices(range(1, 3000), k=num_relaciones),
    "Cliente_ID_2": random.choices(range(1, 3000), k=num_relaciones),
    "Fecha_Registro": [random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(num_relaciones)],
    "Tipo_Recomendación": random.choices(["Amigo", "Familiar"], k=num_relaciones),
    "Nivel_Confianza": random.choices(["Alto", "Medio", "Bajo"], k=num_relaciones)
})
recomienda.to_csv("recomienda.csv", index=False)

# TIENE_TARJETA (Cliente → Tarjeta)
tiene_tarjeta = pd.DataFrame({
    "Cliente_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Tarjeta_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Tipo_Tarjeta": random.choices(["Débito", "Crédito"], k=num_relaciones),
    "Banco_Emisor": random.choices(["Banco A", "Banco B", "Banco C"], k=num_relaciones),
    "Límite_Crédito": [round(random.uniform(500, 50000), 2) for _ in range(num_relaciones)]
})
tiene_tarjeta.to_csv("tiene_tarjeta.csv", index=False)

# ALERTA_FRAUDE (CuentaBancaria → Transaccion)
alerta_fraude = pd.DataFrame({
    "Cuenta_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Transaccion_ID": random.choices(range(1, 5000), k=num_relaciones),
    "Código_Alerta": random.choices(["A101", "B202", "C303"], k=num_relaciones),
    "Descripción": random.choices(["Sospecha de fraude", "Intento de phishing"], k=num_relaciones),
    "Fecha_Alerta": [random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(num_relaciones)]
})
alerta_fraude.to_csv("alerta_fraude.csv", index=False)

# ASOCIADA_A (Tarjeta → CuentaBancaria)
asociada_a = pd.DataFrame({
    "Tarjeta_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Cuenta_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Fecha_Asociación": [random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(num_relaciones)],
    "Estado": random.choices(["Activa", "Bloqueada"], k=num_relaciones),
    "Uso_Frecuente": random.choices([True, False], k=num_relaciones)
})
asociada_a.to_csv("asociada_a.csv", index=False)

# ENVÍA (Transaccion → Transaccion)
envia = pd.DataFrame({
    "Transaccion_ID_1": random.choices(range(1, 5000), k=num_relaciones),
    "Transaccion_ID_2": random.choices(range(1, 5000), k=num_relaciones),
    "Monto": [round(random.uniform(10, 10000), 2) for _ in range(num_relaciones)],
    "Motivo": random.choices(["Pago", "Transferencia", "Reembolso"], k=num_relaciones),
    "Método_Transferencia": random.choices(["ACH", "SWIFT", "Interna"], k=num_relaciones)
})
envia.to_csv("envia.csv", index=False)

# OPERA_EN (Cliente → Comercio)
opera_en = pd.DataFrame({
    "Cliente_ID": random.choices(range(1, 3000), k=num_relaciones),
    "Comercio_ID": random.choices(range(1, 2000), k=num_relaciones),
    "Frecuencia": random.choices(["Diario", "Semanal", "Mensual"], k=num_relaciones),
    "Monto_Promedio": [round(random.uniform(10, 1000), 2) for _ in range(num_relaciones)],
    "Última_Compra": [random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(num_relaciones)]
})
opera_en.to_csv("opera_en.csv", index=False)

# UBICADO_EN (Comercio → Ubicacion)
ubicado_en = pd.DataFrame({
    "Comercio_ID": random.choices(range(1, 2000), k=num_relaciones),
    "Ubicación_ID": random.choices(range(1, 2000), k=num_relaciones),
    "Fecha_Registro": [random_date(start_date, end_date).strftime("%Y-%m-%d") for _ in range(num_relaciones)],
    "Código_Postal": random.choices(range(1000, 9999), k=num_relaciones),
    "Región": random.choices(["Centro", "Norte", "Sur"], k=num_relaciones)
})
ubicado_en.to_csv("ubicado_en.csv", index=False)

print("✅ Archivos CSV generados correctamente.")
