import Boton from '../../core/design-system/Boton';

function SolicitudItem({ solicitud, rol, onAccion }) {
  const pendiente = solicitud.estado === 'PENDIENTE';
  const aceptada = solicitud.estado === 'ACEPTADA';

  return (
    <li style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, display: 'grid', gap: 8 }}>
      <div>
        <strong>#{solicitud.id}</strong> · {solicitud.descripcion} · <em>{solicitud.estado}</em>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {rol === 'TRABAJADOR' && pendiente && (
          <>
            <Boton onClick={() => onAccion(solicitud.id, 'aceptar')}>Aceptar</Boton>
            <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'rechazar')}>Rechazar</Boton>
          </>
        )}
        {rol === 'CONTRATANTE' && (pendiente || aceptada) && (
          <Boton variante="secundario" onClick={() => onAccion(solicitud.id, 'cancelar')}>Cancelar</Boton>
        )}
      </div>
    </li>
  );
}

export default SolicitudItem;
