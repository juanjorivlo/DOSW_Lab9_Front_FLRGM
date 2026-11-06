import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { obtenerTrabajador } from '../services/trabajadoresService';
import MensajeError from '../../core/components/MensajeError';
import NuevaSolicitudForm from '../../solicitudes/components/NuevaSolicitudForm';

function TrabajadorDetallePage() {
  const { id } = useParams();
  const { token, usuario } = useAuth();
  const [trabajador, setTrabajador] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerTrabajador(id, token)
      .then((datos) => setTrabajador(datos))
      .catch((e) => {
        if (e.status === 404) {
          setError('El trabajador no existe');
        } else {
          setError(e.message);
        }
      });
  }, [id, token]);

  if (error) {
    return <MensajeError error={error} />;
  }

  if (!trabajador) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <section>
      <h2>{trabajador.nombre}</h2>
      <p>{trabajador.oficioPrincipal ?? 'Oficio sin definir'} · {trabajador.zona ?? 'Zona sin definir'}</p>
      {usuario?.rol === 'CONTRATANTE' && <NuevaSolicitudForm trabajadorId={trabajador.id} />}
    </section>
  );
}

export default TrabajadorDetallePage;
