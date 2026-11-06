import { useAuth } from '../../auth/hooks/useAuth';
import { useSolicitudes } from '../hooks/useSolicitudes';
import SolicitudItem from './SolicitudItem';
import MensajeError from '../../core/components/MensajeError';

function SolicitudesPage() {
  const { usuario } = useAuth();
  const { solicitudes, cargando, error, ejecutarAccion } = useSolicitudes();

  if (cargando) {
    return <p>Cargando solicitudes...</p>;
  }

  return (
    <section>
      <h2>Mis solicitudes</h2>
      <MensajeError error={error} />
      {solicitudes.length === 0 && !error && <p>No tienes solicitudes.</p>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {solicitudes.map((s) => (
          <SolicitudItem
            key={s.id}
            solicitud={s}
            rol={usuario?.rol}
            onAccion={ejecutarAccion}
          />
        ))}
      </ul>
    </section>
  );
}

export default SolicitudesPage;
