import Boton from '../../core/design-system/Boton';
import { accionesDisponibles } from '../constants/accionesSolicitud';

// Solo pinta una solicitud y avisa qué acción se pidió (onAccion). No sabe de HTTP ni de sesión.
function SolicitudItem({ solicitud, rol, onAccion, ocupado = false }) {
  const acciones = accionesDisponibles(rol, solicitud.estado);

  return (
    <li style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <p>
        <strong>Solicitud #{solicitud.id}</strong> · {solicitud.estado}
      </p>
      <p>{solicitud.descripcion}</p>
      {acciones.length > 0 && (
        <div style={{ display: 'flex', gap: 8 }}>
          {acciones.map((a) => (
            <Boton
              key={a.accion}
              variante={a.variante}
              disabled={ocupado}
              onClick={() => onAccion(solicitud.id, a.accion)}
            >
              {a.etiqueta}
            </Boton>
          ))}
        </div>
      )}
    </li>
  );
}

export default SolicitudItem;