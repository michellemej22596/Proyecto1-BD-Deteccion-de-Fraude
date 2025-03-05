from fastapi import APIRouter, Body
import pickle
import numpy as np

router = APIRouter()

# Cargar el modelo entrenado
with open("models/fraude_model.pkl", "rb") as f:
    fraude_model = pickle.load(f)

@router.post("/fraude/predecir")
def predecir_fraude(monto: float = Body(...), canal: str = Body(...), tipo: str = Body(...)):
    """
    Recibe datos de una transacción y predice si es fraudulenta.
    """
    # Convertir datos a formato numérico (simulación de Label Encoding)
    canal_dict = {"Cajero": 0, "Móvil": 1, "Web": 2}
    tipo_dict = {"Compra": 0, "Retiro": 1, "Transferencia": 2}

    if canal not in canal_dict or tipo not in tipo_dict:
        return {"error": "Valores inválidos para 'Canal' o 'Tipo'."}

    input_data = np.array([[monto, canal_dict[canal], tipo_dict[tipo]]])

    # Hacer la predicción
    resultado = fraude_model.predict(input_data)
    probabilidad = fraude_model.predict_proba(input_data)[0][1]  # Probabilidad de fraude

    return {
        "es_fraude": bool(resultado[0]),
        "probabilidad_fraude": round(probabilidad, 2)
    }
