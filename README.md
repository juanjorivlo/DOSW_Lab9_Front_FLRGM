# oficioya-front

Front-end de OficioYa (React + Vite) para el laboratorio de Front-End (DOSW).

## Cómo ejecutar

1. Levantar el back en `http://localhost:8080` (repositorio del back: https://github.com/JElaverdem/oficioya-service).
2. Instalar dependencias y ejecutar:
```bash
npm install
npm run dev
```
3. Abrir `http://localhost:5173`.

## Estructura de `src/modules/`

```text
src/modules/
├── core/          # Componentes compartidos, design system y httpClient
├── auth/          # Login, sesión con contexto y rutas protegidas
├── trabajadores/  # Lista y perfil de trabajadores
└── solicitudes/   # Mis solicitudes, creación y acciones
```

## Respuestas breves

- **Prop vs estado:** una prop es dato que recibe un componente desde su padre; el estado (`useState`) es dato interno que el componente controla.
- **`useEffect` para carga:** evita ejecutar llamadas HTTP en cada render y permite controlar dependencias.
- **`useContext`:** comparte la sesión (token/usuario) sin pasar props por todos los niveles; sin él habría que prop-drilling.
- **Ocultar botón no es seguridad:** la protección real la hace el backend (403/404), el front solo mejora UX.
- **Repos separados:** permiten ciclos de entrega independientes y evitan acoplar front/back.

## Evidencias
Las capturas del recorrido completo se guardan en `docs/evidencias/`.