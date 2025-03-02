import pandas as pd
import numpy as np
from faker import Faker

# Crear instancia de Faker
fake = Faker()

# Cantidad de clientes
num_clientes = 5000  # Ajusta según necesidad

# Generar datos aleatorios para Clientes
clientes = pd.DataFrame({
    "Cliente_ID": range(1, num_clientes + 1),
    "Nombre": [fake.name() for _ in range(num_clientes)],  # Nombres aleatorios reales
    "Edad": np.random.randint(18, 70, num_clientes),
    "País": np.random.choice(["Guatemala", "México", "Colombia"], num_clientes),
    "Estado": np.random.choice(["Activo", "Inactivo"], num_clientes)
})

# Guardar en CSV
clientes.to_csv("clientes.csv", index=False)

print("✅ Clientes generados con nombres aleatorios.")
