CORS_ORIGINS = [
    "http://localhost:3000",  # React local
    "http://127.0.0.1:3000",  # Alternativa local
    "https://mi-dominio.com"  # Producción (ACTUALIZAR SI SE PUBLICA FRONT)
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ["*"]  # Permitir todos los métodos (GET, POST, etc.)
CORS_ALLOW_HEADERS = ["*"]  # Permitir todos los headers
