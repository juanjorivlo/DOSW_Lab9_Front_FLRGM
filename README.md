# OficioYa Front

Aplicación web (React + Vite) para el laboratorio de front-end de OficioYa. Se conecta a la API del laboratorio de seguridad (Spring Boot) en `http://localhost:8080`.

## Requisitos

- Node.js 20.19 o superior (o 22.12+).
- Backend de OficioYa corriendo en el puerto 8080.

Repositorio del back: https://github.com/DOSW-2026-2/security

## Ejecución

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`. El proxy de Vite reenvía `/api` al backend.

Compilación de producción:

```bash
npm run build
```

## Estructura de `src/modules/`

- `core/`: componentes y utilidades compartidas.
- `auth/`: login, sesión con contexto y hook `useAuth`.
- `trabajadores/`: listado y perfil de trabajadores.
- `solicitudes/`: listado, creación y acciones sobre solicitudes.
