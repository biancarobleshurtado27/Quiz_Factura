const InvoiceList = ({ invoices, setSelectedInvoice }) => {
  if (invoices.length === 0) {
    return <div className="empty-list"><p>No hay facturas registradas</p></div>;
  }

  return (
    <div className="list-container">
      <h2>Facturas Registradas</h2>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id} onClick={() => setSelectedInvoice(inv)} className="invoice-item">
            <strong>{inv.factura.numero}</strong> - {inv.cliente.nombre} <br/>
            <span>{inv.factura.fecha}</span> | <span>Total: ${inv.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;