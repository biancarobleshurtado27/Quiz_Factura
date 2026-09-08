import { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import Invoice from './components/Invoice';
import ConfirmModal from './components/ConfirmModal';
import * as facturaService from './services/facturaService.jsx';
import './App.css';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchError, setSearchError] = useState('');
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  // GET 1: Cargar todas las facturas al iniciar
  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      const data = await facturaService.getFacturas();
      setInvoices(data);
      setSearchError('');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // POST: Guardar factura usando el servicio
  const addInvoice = async (newInvoice) => {
    try {
      await facturaService.createFactura(newInvoice);
      fetchAllInvoices(); // Actualizamos la lista
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  // Abrir modal de confirmación
  const handleDelete = (invoice) => {
    setInvoiceToDelete(invoice); // Esto abre el modal
  };

  // Confirmar borrado real
  const confirmDelete = async () => {
    if (!invoiceToDelete) return;
    try {
      await facturaService.deleteFactura(invoiceToDelete.id);
      if (selectedInvoice?.id === invoiceToDelete.id) {
        setSelectedInvoice(null);
      }
      fetchAllInvoices();
      setInvoiceToDelete(null); // Cerrar modal
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  // GET 2: Consultar por ID (número de factura)
  const handleSearchById = async (e) => {
    e.preventDefault();
    if (!searchId) return;
    try {
      const data = await facturaService.getFacturaById(searchId);
      setSelectedInvoice(data);
      setSearchError('');
    } catch (err) {
      setSearchError(`No se encontró la factura: ${searchId}`);
      setSelectedInvoice(null);
    }
  };

  // GET 3: Consultar por Fecha
  const handleSearchByDate = async (e) => {
    e.preventDefault();
    if (!searchDate) return;
    try {
      const data = await facturaService.getFacturasByDate(searchDate);
      if (data.length === 0) {
        setSearchError(`No hay facturas para la fecha: ${searchDate}`);
      } else {
        setSearchError('');
      }
      setInvoices(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Limpiar búsquedas y volver a cargar todo
  const clearSearches = () => {
    setSearchId('');
    setSearchDate('');
    setSearchError('');
    setSelectedInvoice(null);
    fetchAllInvoices();
  };

  return (
    <div className="app-container">
      <h1>Sistema de Emisión de Facturas</h1>
      
      <div className="search-panel">
        <form onSubmit={handleSearchById} className="search-box">
          <input 
            type="text" 
            placeholder="Buscar por N° Factura (ej. FAC-001)" 
            value={searchId} 
            onChange={(e) => setSearchId(e.target.value)} 
          />
          <button type="submit">Buscar</button>
        </form>

        <form onSubmit={handleSearchByDate} className="search-box">
          <input 
            type="date" 
            value={searchDate} 
            onChange={(e) => setSearchDate(e.target.value)} 
          />
          <button type="submit">Buscar Fecha</button>
        </form>

        <button onClick={clearSearches} className="btn-clear">Mostrar Todas</button>
      </div>

      {searchError && <p className="error-msg">{searchError}</p>}

      <div className="main-layout">
        <div className="left-panel">
          <InvoiceForm addInvoice={addInvoice} />
          <InvoiceList 
            invoices={invoices} 
            setSelectedInvoice={setSelectedInvoice} 
            onDelete={handleDelete}
          />
        </div>

        <div className="right-panel">
          {selectedInvoice ? (
            <Invoice invoice={selectedInvoice} />
          ) : (
            <div className="empty-view">
              <p>Seleccione o busque una factura para visualizar su diseño.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmModal 
        invoice={invoiceToDelete}
        onConfirm={confirmDelete}
        onCancel={() => setInvoiceToDelete(null)}
      />
    </div>
  );
}

export default App;