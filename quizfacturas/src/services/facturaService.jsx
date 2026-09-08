// src/services/facturaService.js
const API_URL = 'http://localhost:3001/facturas';

// GET: Obtener todas las facturas
export const getFacturas = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// GET: Obtener una factura por ID (que ahora será el número de factura)
export const getFacturaById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('No encontrada');
  return await res.json();
};

// GET: Obtener facturas por fecha
export const getFacturasByDate = async (fecha) => {
  const res = await fetch(`${API_URL}?factura.fecha=${fecha}`);
  return await res.json();
};

// POST: Crear una nueva factura
export const createFactura = async (factura) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(factura),
  });
  return await res.json();
};

// PUT: Actualizar una factura existente
export const updateFactura = async (id, factura) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(factura),
  });
  return await res.json();
};

// DELETE: Eliminar una factura
export const deleteFactura = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};