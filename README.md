# OficioYa · Front-End

Aplicación web (React + Vite) para el laboratorio de front-end de OficioYa. Un contratante inicia sesión, busca un trabajador y le envía una solicitud; el trabajador la acepta o la rechaza. Se conecta a la API del laboratorio de seguridad (Spring Boot) en `http://localhost:8080`.

## Requisitos

- Node.js 20.19 o superior (o 22.12+).
- Backend de OficioYa (laboratorio de seguridad) corriendo en el puerto 8080 con el perfil `dev`.
- Dos usuarios de prueba creados en el back: uno `CONTRATANTE` y uno `TRABAJADOR`.

Repositorio del back: https://github.com/DOSW-2026-2/security

## Ejecución

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`. El proxy de Vite reenvía `/api` al backend, por lo que no hace falta configurar CORS.

Compilación de producción:

```bash
npm run build
```

## Estructura de `src/modules/`

```
modules/
├── core/
│   ├── components/      # Navbar, RutaProtegida, MensajeError
│   ├── design-system/   # Boton
│   └── lib/             # httpClient
├── auth/
│   ├── components/      # LoginPage
│   ├── hooks/           # useAuth
│   ├── services/        # authService
│   └── states/          # AuthContext, AuthProvider
├── trabajadores/
│   ├── components/      # TrabajadoresPage, TrabajadorCard, TrabajadorDetallePage
│   ├── hooks/           # useTrabajadores
│   └── services/        # trabajadoresService
└── solicitudes/
    ├── components/      # SolicitudesPage, SolicitudItem, NuevaSolicitudForm
    ├── hooks/           # useSolicitudes
    └── services/        # solicitudesService
```

- `core/`: componentes y utilidades compartidas (Navbar, RutaProtegida, MensajeError, Boton, httpClient).
- `auth/`: login, sesión con contexto (`AuthContext`/`AuthProvider`) y hook `useAuth`.
- `trabajadores/`: listado y perfil de trabajadores (services, hooks, componentes).
- `solicitudes/`: listado, creación y acciones sobre solicitudes según el rol.

## Equipo

- Bloque 2 (lista de trabajadores): Brian Fierro
- Bloque 3 (perfil de un trabajador): JElaverdem
- Bloques 4, 5 y 6 (código inicial de solicitudes): Juan Jose Rivera López
- Cierre (README, respuestas y evidencias): Santiago Gómez

## Evidencias

Capturas del recorrido completo en `docs/evidencias/`.

## Preguntas

**1. ¿Qué diferencia hay entre una prop y un estado (`useState`)?**
Una prop es un valor que el componente recibe de su padre y no debe modificar (solo lectura). El estado es un valor interno que el componente controla con su setter y que, al cambiar, provoca un nuevo render. Ejemplo: `trabajadorId` es prop de `NuevaSolicitudForm`; `descripcion` es su estado.

**2. ¿Por qué la carga de datos va dentro de `useEffect` y no en el cuerpo del componente?**
El cuerpo del componente se ejecuta en cada render. Si la petición HTTP estuviera ahí, guardar la respuesta con `setState` volvería a renderizar y repetiría la petición en un ciclo infinito. `useEffect` ejecuta el efecto después del render y solo cuando cambian sus dependencias (por ejemplo `[token, logout]` o `[id, token]`).

**3. ¿Para qué usaron `useContext` y qué pasaría si no lo usaran?**
Para compartir la sesión (`token`, `usuario`, `login`, `logout`) con cualquier componente mediante `useAuth`, sin pasarla por props. Sin él habría que hacer *prop drilling*: pasar el token y el usuario por cada nivel del árbol (App → rutas → páginas → componentes), lo que vuelve el código largo y frágil.

**4. ¿Por qué ocultar el botón "Aceptar" a un contratante no es suficiente para proteger la API?**
Porque el front corre en el navegador del usuario y se puede manipular, y cualquiera puede llamar al endpoint directamente con Postman o curl. La seguridad real la aplica el backend, que valida el token y el rol en cada petición y responde 403 o 404. Ocultar el botón solo mejora la experiencia.

**5. ¿Qué ventajas tiene tener el front y el back en repositorios separados?**
Cada uno tiene su propio historial, ciclo de entrega y despliegue; equipos distintos pueden trabajar sin conflictos; los pipelines de CI/CD son independientes y más simples; y se comunican solo por el contrato de la API REST, lo que reduce el acoplamiento.