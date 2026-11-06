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

- `core/`: componentes y utilidades compartidas (Navbar, RutaProtegida, MensajeError, Boton, httpClient).
- `auth/`: login, sesión con contexto (`AuthContext`/`AuthProvider`) y hook `useAuth`.
- `trabajadores/`: listado y perfil de trabajadores (services, hooks, componentes).
- `solicitudes/`: listado, creación y acciones sobre solicitudes.

## Preguntas

- **Prop vs estado (`useState`):** una prop es un valor que el componente recibe de su padre; el estado es un valor interno que el componente controla y que, al cambiar, provoca un nuevo render.
- **Por qué la carga de datos va en `useEffect`:** el cuerpo del componente se ejecuta en cada render; poner ahí una petición HTTP la repetiría sin control. `useEffect` permite ejecutarla cuando cambian las dependencias (token, id).
- **`useContext`:** evita pasar la sesión (token, usuario) por props a todos los componentes. Sin él habría que hacer "prop drilling".
- **Ocultar el botón "Aceptar" no es seguridad:** el front solo mejora la experiencia; la seguridad real la aplica el backend respondiendo 403/404 si alguien llama al endpoint directamente.
- **Repositorios separados:** front y back tienen ciclos de entrega, historiales y despliegues independientes; se comunican solo por la API REST.
