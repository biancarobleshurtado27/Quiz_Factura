const Invoice = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div className="invoice-paper">
      <div className="invoice-header">
        <div>
          <h2>{invoice.emisor.nombre}</h2>
          <p>RUC/NIT: {invoice.emisor.ruc}</p>
        </div>
        <div className="invoice-meta">
          <h3>FACTURA N°: {invoice.factura.numero}</h3>
          <p>Fecha: {invoice.factura.fecha}</p>
        </div>
      </div>

      <div className="invoice-client">
        <h4>Facturar a:</h4>
        <p><strong>{invoice.cliente.nombre}</strong></p>
        <p>{invoice.cliente.direccion}</p>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cant.</th>
            <th>Precio Unit.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio.toFixed(2)}</td>
              <td>${(item.cantidad * item.precio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-totals">
        <div>
          <p>Subtotal: <strong>${invoice.subtotal.toFixed(2)}</strong></p>
          <p>Impuesto (15%): <strong>${invoice.impuesto.toFixed(2)}</strong></p>
          <h3>Total a Pagar: ${invoice.total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Invoice;