from fastapi import APIRouter, Body
import pickle
import numpy as np

router = APIRouter()

# Cargar modelo entrenado
with open("./fraude_model.pkl", "rb") as f:
    fraude_model = pickle.load(f)

# Diccionarios de conversión (deben coincidir con LabelEncoder en entrenamiento)
canal_dict = {"Cajero": 0, "Móvil": 1, "Web": 2}
tipo_dict = {"Compra": 0, "Retiro": 1, "Transferencia": 2}

@router.post("/fraude/predecir")
def predecir_fraude(monto: float = Body(...), canal: str = Body(...), tipo: str = Body(...)):
    """
    Recibe datos de una transacción y predice si es fraudulenta.
    """
    # Convertir valores de entrada a formato numérico
    if canal not in canal_dict or tipo not in tipo_dict:
        return {"error": "Valores inválidos para 'canal', 'tipo'"}

    input_data = np.array([[monto, tipo_dict[tipo], canal_dict[canal]]])

    # Hacer predicción
    resultado = fraude_model.predict(input_data)
    probabilidad = fraude_model.predict_proba(input_data)[0][1]  # Probabilidad de fraude

    return {
        "es_fraude": bool(resultado[0]),
        "probabilidad_fraude": round(probabilidad, 2)
    }
