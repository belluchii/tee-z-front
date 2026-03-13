# Tee-Z — Frontend

Frontend de un ecommerce de remeras con carrito de compras, autenticación de usuarios.

🔗 [Demo en vivo](https://tee-z.netlify.app/) · [Backend](https://github.com/belluchii/tee-z-back)

## ¿Qué es?

Aplicación web de ecommerce que permite a los usuarios explorar, buscar y comprar remeras. Incluye gestión de cuentas, carrito de compras, búsqueda con filtros y seguimiento de pedidos.

## Funcionalidades

- **Usuarios** — Registro, inicio de sesión y gestión de cuenta con JWT
- **Productos** — Visualización, búsqueda y filtrado por categoría, color y precio
- **Carrito** — Agregar, actualizar y eliminar productos
- **Pedidos** — Realización y seguimiento

## Tech Stack

- **Framework:** React.js
- **HTTP Client:** Axios
- **Autenticación:** JWT

## Requisitos

- Node.js >= 18.x
- Backend corriendo localmente o en producción

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/belluchii/tee-z-front.git
cd tee-z-front
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env`:

```env
REACT_APP_API_KEY=http://localhost:3001
```

4. Iniciar la aplicación:

```bash
npm start
```

La app estará disponible en `http://localhost:3000`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |

## Repositorios relacionados

- [tee-z-back](https://github.com/belluchii/tee-z-back) — API REST con Node.js, Express y MongoDB
