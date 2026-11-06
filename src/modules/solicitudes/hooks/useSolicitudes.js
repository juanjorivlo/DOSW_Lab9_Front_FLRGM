import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarSolicitudes, cambiarEstado } from '../services/solicitudesService';

export function useSolicitudes() {
  const { token, logout } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(() => {
    setCargando(true);
    setError(null);
    listarSolicitudes(token)
      .then((datos) => setSolicitudes(datos))
      .catch((e) => {
        if (e.status === 401) {
          logout();
        } else {
          setError(e.message);
        }
      })
      .finally(() => setCargando(false));
  }, [token, logout]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  async function ejecutarAccion(id, accion) {
    setError(null);
    try {
      await cambiarEstado(id, accion, token);
      cargar();
    } catch (e) {
      setError(e.message);
    }
  }

  return { solicitudes, cargando, error, ejecutarAccion };
}
