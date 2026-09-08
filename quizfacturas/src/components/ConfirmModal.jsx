
const ConfirmModal = ({ invoice, onConfirm, onCancel }) => {
  if (!invoice) return null; // Si no hay factura para borrar, no se renderiza

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmar Eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar la factura?</p>
        <div className="modal-invoice-info">
          <strong>{invoice.factura.numero}</strong> - {invoice.cliente.nombre}
        </div>
        <p className="modal-warning">Esta acción no se puede deshacer.</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-cancel">Cancelar</button>
          <button onClick={onConfirm} className="btn-confirm-delete">Sí, Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;