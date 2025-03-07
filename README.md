# Proyecto1-BD-Deteccion-de-Fraude
Michelle Mejía, Silvia Illescas y Ruth de Leon

# **Detección de Fraude en Transacciones Bancarias - Prototipo del Sistema**

## **1. Descripción del Proyecto**

Este sistema permitirá detectar transacciones bancarias sospechosas utilizando una base de datos orientada a grafos (**Neo4j**). Se analizarán las relaciones entre **clientes, cuentas bancarias, transacciones y comercios** para identificar patrones inusuales que puedan indicar fraude.

## **2. Arquitectura del Sistema**

- **Frontend (React.js + TailwindCSS)** → Interfaz web donde los usuarios podrán visualizar las transacciones, clientes y alertas de fraude.
- **Backend (FastAPI o Express.js)** → Servicio API REST encargado de manejar la lógica de detección de fraude y consultas a la base de datos.
- **Base de Datos (Neo4j AuraDB)** → Almacena las transacciones y relaciones entre los actores del sistema.
- **Algoritmos de Detección de Fraude (Neo4j GDS)** → Identificación de transacciones fraudulentas con técnicas de análisis de grafos.

## **3. Módulos del Sistema**

### **📌 1. Gestión de Usuarios y Cuentas**
✅ Registro y consulta de clientes con sus respectivas cuentas bancarias.
✅ Asociación de múltiples cuentas a un mismo usuario.
✅ Identificación de relaciones sospechosas entre usuarios y cuentas.

### **📌 2. Gestión de Transacciones**
✅ Registro de transacciones bancarias con información detallada (monto, ubicación, IP, dispositivo, comercio).
✅ Visualización de historial de transacciones por cliente.
✅ Carga masiva de transacciones desde archivos CSV.

### **📌 3. Detección de Fraude**
✅ Implementación de consultas avanzadas en **Cypher** para detectar patrones fraudulentos.
✅ Algoritmos de detección:
   - **PageRank**: Detecta cuentas con muchas transacciones sospechosas.
   - **Community Detection**: Identifica redes organizadas de fraude.
   - **Anomaly Detection**: Encuentra transacciones atípicas.
✅ Generación de alertas en tiempo real para transacciones sospechosas.

### **📌 4. Visualización de Datos (Dashboard)**
✅ Panel con estadísticas clave:
   - Total de transacciones procesadas.
   - Número de fraudes detectados.
   - Clientes con mayor riesgo.
✅ Mapa de relaciones y grafos interactivos con **D3.js o Neo4j Bloom**.

## **4. Flujo de Trabajo del Sistema**
1️⃣ Un usuario inicia sesión y accede al dashboard.
2️⃣ Se listan los clientes y sus transacciones en tiempo real.
3️⃣ El sistema analiza los datos y detecta patrones de fraude.
4️⃣ Se generan alertas y se muestran visualmente las conexiones sospechosas.
5️⃣ Los administradores pueden tomar decisiones basadas en las alertas.

## **5. Asignación de Tareas por Persona**

### **🧑‍💻 Persona 1 - Frontend (React.js + TailwindCSS)**
- Diseñar e implementar las pantallas principales:
  - Dashboard con estadísticas de fraude.
  - Listado de transacciones y clientes.
  - Visualización de alertas y conexiones sospechosas.
- Conectar el frontend con la API del backend.
- Implementar gráficos interactivos con Recharts o D3.js.

### **🧑‍💻 Persona 2 - Backend (FastAPI o Express.js)**
- Crear la API REST con endpoints para CRUD de clientes y transacciones.
- Implementar seguridad y validación de datos.
- Optimizar rendimiento con paginación y cacheo.

### **🧑‍💻 Persona 3 - Base de Datos y Algoritmos de Detección de Fraude**
- Modelar los datos en Neo4j y definir las relaciones.
- Implementar consultas Cypher para detectar patrones sospechosos.
- Aplicar algoritmos de detección de fraude con Neo4j GDS.

## **6. Tecnologías Recomendadas**
| Componente | Tecnología |
|------------|-------------|
| **Base de Datos** | **Neo4j AuraDB** |
| **Backend** | **FastAPI (Python) o Express.js (Node.js)** |
| **Frontend** | **React.js + TailwindCSS** |
| **Visualización de Grafos** | **Neo4j Bloom o D3.js** |
| **Carga de Datos** | **Pandas (Python) o fs (Node.js)** |
| **Pruebas** | **Jest (Node.js) o Pytest (Python)** |

---

### **📌 Próximos Pasos**
✅ Crear el esquema inicial de Neo4j.
✅ Definir los endpoints de la API.
✅ Diseñar la interfaz en Figma antes de implementarla.
