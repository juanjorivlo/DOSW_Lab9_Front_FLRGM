import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { cambiarEstado, listarSolicitudes } from '../services/solicitudesService';

export function useSolicitudes() {
  const { token, logout } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [procesandoId, setProcesandoId] = useState(null);

  // Un solo lugar para decidir qué hacer con un error de la API
  const manejarError = useCallback(
    (e) => {
      if (e.status === 401) {
        logout(); // token vencido: volver al login
      } else {
        setError(e.message);
      }
    },
    [logout],
  );

  const cargar = useCallback(async () => {
    try {
      setSolicitudes(await listarSolicitudes(token));
    } catch (e) {
      manejarError(e);
    } finally {
      setCargando(false);
    }
  }, [token, manejarError]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const ejecutarAccion = useCallback(
    async (id, accion) => {
      setError(null);
      setProcesandoId(id);
      try {
        await cambiarEstado(id, accion, token);
        await cargar(); // vuelve a pedir la lista para mostrar el estado nuevo
      } catch (e) {
        manejarError(e); // por ejemplo, un 409 si el estado ya cambió
        if (e.status !== 401) {
          await cargar(); // muestra el estado real de la solicitud
        }
      } finally {
        setProcesandoId(null);
      }
    },
    [token, cargar, manejarError],
  );

  return { solicitudes, cargando, error, procesandoId, ejecutarAccion };
}