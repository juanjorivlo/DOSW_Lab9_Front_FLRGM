// Regla de la UI: qué acciones ve cada rol según el estado de la solicitud.
// Está como DATOS (no como if/else en el componente) para poder agregar una acción
// nueva sin tocar SolicitudItem (principio abierto/cerrado).
// Recordatorio: esto solo mejora la experiencia; la seguridad real la aplica el backend.

export const ACCIONES_SOLICITUD = [
  {
    accion: 'aceptar',
    etiqueta: 'Aceptar',
    variante: 'primario',
    roles: ['TRABAJADOR'],
    estados: ['PENDIENTE'],
  },
  {
    accion: 'rechazar',
    etiqueta: 'Rechazar',
    variante: 'secundario',
    roles: ['TRABAJADOR'],
    estados: ['PENDIENTE'],
  },
  {
    accion: 'cancelar',
    etiqueta: 'Cancelar',
    variante: 'secundario',
    roles: ['CONTRATANTE'],
    estados: ['PENDIENTE', 'ACEPTADA'],
  },
];

export function accionesDisponibles(rol, estado) {
  return ACCIONES_SOLICITUD.filter(
    (a) => a.roles.includes(rol) && a.estados.includes(estado),
  );
}