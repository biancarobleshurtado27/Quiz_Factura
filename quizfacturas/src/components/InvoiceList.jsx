const InvoiceList = ({ invoices, setSelectedInvoice, onDelete }) => {
  if (invoices.length === 0) {
    return <div className="empty-list"><p>No hay facturas registradas</p></div>;
  }

  return (
    <div className="list-container">
      <h2>Facturas Registradas</h2>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id} className="invoice-item">
            <div onClick={() => setSelectedInvoice(inv)} style={{ flex: 1, cursor: 'pointer' }}>
              <strong>{inv.factura.numero}</strong> - {inv.cliente.nombre} <br/>
              <span>{inv.factura.fecha}</span> | <span className="total-badge">Total: ${inv.total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => onDelete(inv)} // Pasamos toda la factura, no solo el ID
              style={{ background: '#ef4444', color: 'white', padding: '5px 10px', fontSize: '0.85rem' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;