import { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import Invoice from './components/Invoice';
import './App.css';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const API_URL = 'http://localhost:3001/facturas';

  // Cargar facturas de db.json al iniciar
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error('Error al cargar facturas:', err));
  }, []);

  // Guardar factura en db.json
  const addInvoice = (newInvoice) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInvoice),
    })
      .then((res) => res.json())
      .then((data) => setInvoices([...invoices, data]))
      .catch((err) => console.error('Error al guardar:', err));
  };

  return (
    <div className="app-container">
      <h1>Sistema de Emisión de Facturas</h1>
      
      <div className="main-layout">
        <div className="left-panel">
          <InvoiceForm addInvoice={addInvoice} />
          <InvoiceList 
            invoices={invoices} 
            setSelectedInvoice={setSelectedInvoice} 
          />
        </div>

        <div className="right-panel">
          {selectedInvoice ? (
            <Invoice invoice={selectedInvoice} />
          ) : (
            <div className="empty-view">
              <p>Seleccione una factura para visualizar su diseño.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;