# 🚀 API de Detección de Fraude con Neo4j y FastAPI

Este proyecto es una **API REST** desarrollada con **FastAPI** y conectada a **Neo4j** para detectar **transacciones sospechosas de fraude**.

## 📌 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- **Python 3.8+**
- **Neo4j AuraDB (o instancia local de Neo4j)**
- **Git** (para clonar el repositorio)

## 🔹 Instalación y Configuración
### **1. Clonar el repositorio**
```bash
git clone https://github.com/tu_usuario/api-fraude.git
cd api-fraude
```

### **2. Crear un entorno virtual y activarlo**
#### 🔹 **Windows**
```bash
python -m venv venv
venv\Scripts\activate
```
#### 🔹 **Mac/Linux**
```bash
python3 -m venv venv
source venv/bin/activate
```

### **3. Instalar dependencias**
```bash
pip install -r requirements.txt
```

### **4. Configurar las credenciales de Neo4j**
Crea un archivo **`.env`** en la raíz del proyecto con la siguiente información:
```ini
NEO4J_URI=neo4j+s://<tu_auraDB_url>
NEO4J_USER=neo4j
NEO4J_PASSWORD=<tu_password>
```

⚠ **No compartas este archivo en GitHub.** Asegúrate de agregarlo a `.gitignore`.

## 🚀 Ejecutar la API
```bash
uvicorn app.main:app --reload
```

La API se ejecutará en `http://127.0.0.1:8000`.

## 📌 Documentación de la API
FastAPI genera documentación automática:
- **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## 📂 Estructura del Proyecto
```
api-fraude/
│── app/
│   │── main.py          # Punto de entrada de la API
│   │── config.py        # Configuración general
│   │── database.py      # Conexión con Neo4j
│   │── models/          # Modelos de datos (Pydantic)
│   │── routes/          # Endpoints de la API
│   │   │── clientes.py
│   │   │── transacciones.py
│   │   │── fraude.py
│── .env                 # Variables de entorno (NO subir a GitHub)
│── requirements.txt     # Dependencias del proyecto
│── README.md            # Documentación del proyecto
│── .gitignore           # Archivos a ignorar en GitHub
```

## 📌 Comandos Útiles
| Comando | Descripción |
|---------|------------|
| `deactivate` | Salir del entorno virtual |
| `pip freeze > requirements.txt` | Guardar paquetes instalados |
| `pip install -r requirements.txt` | Instalar dependencias |

## 📌 Contribuciones
Si deseas contribuir, **haz un fork** del proyecto y abre un Pull Request con tus mejoras.

## 📜 Licencia
Este proyecto es de código abierto bajo la licencia **MIT**.
