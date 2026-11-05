// Solo pinta una solicitud: no sabe de HTTP ni de sesión.
function SolicitudItem({ solicitud }) {
  return (
    <li style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <p>
        <strong>Solicitud #{solicitud.id}</strong> · {solicitud.estado}
      </p>
      <p>{solicitud.descripcion}</p>
    </li>
  );
}

export default SolicitudItem;