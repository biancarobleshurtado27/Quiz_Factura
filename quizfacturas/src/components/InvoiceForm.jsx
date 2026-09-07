import { useState } from 'react';

const InvoiceForm = ({ addInvoice }) => {
  // Estados del formulario
  const [emisor, setEmisor] = useState({ nombre: '', ruc: '' });
  const [cliente, setCliente] = useState({ nombre: '', direccion: '' });
  const [factura, setFactura] = useState({ numero: '', fecha: '' });
  const [items, setItems] = useState([{ descripcion: '', cantidad: 1, precio: 0 }]);
  const [error, setError] = useState('');

  // Actualizar ítems dinámicos
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    // Convertir a número si es cantidad o precio
    newItems[index][field] = field === 'cantidad' || field === 'precio' ? Number(value) : value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { descripcion: '', cantidad: 1, precio: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validación de campos obligatorios
    if (!emisor.nombre || !emisor.ruc || !cliente.nombre || !factura.numero || !factura.fecha) {
      setError('Por favor complete todos los campos obligatorios (*).');
      return;
    }
    
    // 2. Validación de ítems (que tengan descripción y números válidos)
    if (items.some(item => !item.descripcion || item.cantidad <= 0 || item.precio < 0)) {
      setError('Revise los ítems: descripción requerida, cantidad mayor a 0 y precio válido.');
      return;
    }

    setError(''); // Limpiar error si todo está bien
    
    // 3. Cálculos derivados del estado (no hardcodeados)
    const subtotalCalculado = items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const impuestoCalculado = subtotalCalculado * 0.15; // 15% de IVA
    const totalCalculado = subtotalCalculado + impuestoCalculado;

    // 4. Crear objeto de la factura
    const newInvoice = {
      id: Date.now(), // Key única para React
      emisor,
      cliente,
      factura,
      items,
      subtotal: subtotalCalculado,
      impuesto: impuestoCalculado,
      total: totalCalculado
    };
    
    // 5. Enviar al componente padre
    addInvoice(newInvoice);
    
    // 6. Limpiar formulario tras guardar
    setEmisor({ nombre: '', ruc: '' });
    setCliente({ nombre: '', direccion: '' });
    setFactura({ numero: '', fecha: '' });
    setItems([{ descripcion: '', cantidad: 1, precio: 0 }]);
  };

  return (
    <div className="form-container">
      <h2>Nueva Factura</h2>
      {error && <p className="error-msg">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Datos del Emisor *</legend>
          <input type="text" placeholder="Nombre Empresa" value={emisor.nombre} onChange={(e) => setEmisor({...emisor, nombre: e.target.value})} />
          <input type="text" placeholder="RUC/NIT" value={emisor.ruc} onChange={(e) => setEmisor({...emisor, ruc: e.target.value})} />
        </fieldset>

        <fieldset>
          <legend>Datos del Cliente *</legend>
          <input type="text" placeholder="Nombre Cliente" value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} />
          <input type="text" placeholder="Dirección/Correo" value={cliente.direccion} onChange={(e) => setCliente({...cliente, direccion: e.target.value})} />
        </fieldset>

        <fieldset>
          <legend>Datos de Factura *</legend>
          <input type="text" placeholder="N° Factura" value={factura.numero} onChange={(e) => setFactura({...factura, numero: e.target.value})} />
          <input type="date" value={factura.fecha} onChange={(e) => setFactura({...factura, fecha: e.target.value} )} />
        </fieldset>

        <fieldset>
          <legend>Ítems</legend>
          {items.map((item, index) => (
            <div key={index} className="item-row">
              <input 
                type="text" 
                placeholder="Descripción" 
                value={item.descripcion} 
                onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)} 
              />
              <input 
                type="number" 
                min="1" 
                placeholder="Cant." 
                value={item.cantidad} 
                onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} 
              />
              <input 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="Precio" 
                value={item.precio} 
                onChange={(e) => handleItemChange(index, 'precio', e.target.value)} 
              />
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(index)}>X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addItem} className="btn-add-item">+ Añadir Ítem</button>
        </fieldset>

        <button type="submit" className="btn-save">Guardar Factura</button>
      </form>
    </div>
  );
};

export default InvoiceForm;