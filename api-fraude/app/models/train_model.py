import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Datos simulados (normalmente se obtendrían de una base de datos)
data = {
    "Monto": [50, 5000, 200, 10000, 1500, 30000, 100, 500, 20000, 80],
    "Canal": ["Cajero", "Móvil", "Web", "Web", "Cajero", "Móvil", "Móvil", "Cajero", "Web", "Móvil"],
    "Tipo": ["Compra", "Retiro", "Transferencia", "Compra", "Compra", "Retiro", "Transferencia", "Compra", "Compra", "Retiro"],
    "Fraudulenta": [0, 1, 0, 1, 0, 1, 0, 0, 1, 0]  # 1 = Fraude, 0 = No Fraude
}

# Convertir a DataFrame
df = pd.DataFrame(data)

# Convertir variables categóricas en números
encoder = LabelEncoder()
df["Canal"] = encoder.fit_transform(df["Canal"])
df["Tipo"] = encoder.fit_transform(df["Tipo"])

# Separar datos en entrenamiento y prueba
X = df[["Monto", "Canal", "Tipo"]]
y = df["Fraudulenta"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar modelo
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Guardar el modelo entrenado
with open("models/fraude_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Modelo entrenado y guardado en 'models/fraude_model.pkl'")
