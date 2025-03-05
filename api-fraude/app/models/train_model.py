import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from app.database import db

# Obtener datos desde Neo4j
def obtener_datos_transacciones():
    query = """
    MATCH (c: CuentaBancaria)-[:REALIZA]-> (t:Transaccion)
    RETURN
        t.Transaccion_ID AS transaccion_id,
        t.Monto AS monto,
        t.Tipo AS tipo,
        t.Canal AS canal
    """
    return db.query(query)

# Cargar los datos desde Neo4j
datos = obtener_datos_transacciones()
df = pd.DataFrame(datos)

# Verificar si hay datos suficientes
if df.empty:
    print(" No hay suficientes datos en la base de datos para entrenar el modelo.")
    exit()

# Convertir valores categóricos a numéricos
encoder_tipo = LabelEncoder()
encoder_canal = LabelEncoder()
encoder_categoria = LabelEncoder()

df["tipo"] = encoder_tipo.fit_transform(df["tipo"])
df["canal"] = encoder_canal.fit_transform(df["canal"])

# Etiqueta: Asumimos que transacciones con monto > 5000 podrían ser fraudulentas
df["fraudulenta"] = (df["monto"] > 5000).astype(int)

# Separar datos en entrenamiento y prueba
X = df[["monto", "tipo", "canal"]]
y = df["fraudulenta"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar modelo
modelo = RandomForestClassifier(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

# Guardar modelo entrenado
with open("./fraude_model.pkl", "wb") as f:
    pickle.dump(modelo, f)

print(" Modelo de fraude entrenado y guardado en 'models/fraude_model.pkl'")
