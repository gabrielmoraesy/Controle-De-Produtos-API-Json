import { useState } from 'react';
import './App.css';
import { FaStackExchange, FaRegCheckCircle, FaBan, FaPenSquare } from "react-icons/fa";


// Components
import Header from './components/Header';
import Form from './components/Form';
import List from './components/List';
import Notification from './components/Notification';

// Hook useFetch
import { useFetch } from './hooks/useFetch';

function App() {
  const url = 'http://localhost:3000/products';
  const { data: products, httpConfig, error } = useFetch(url);

  const [notification, setNotification] = useState({ display: 'none', title: null, text: null });

  const handleSubmit = (name, price) => {
    const product = {
      name,
      price: price.replace('.', ',')
    };

    httpConfig(product, 'POST');
    showNotification('flex', 'Notificação', 'Produto adicionado com sucesso');
    cleanNotification();
  }

  const handleRemove = (id) => {
    httpConfig(id, 'DELETE');
    showNotification('flex', 'Notificação', 'Produto removido com sucesso');
    cleanNotification();
  }

  const handleEdit = (nameEdit, priceEdit, idEdit) => {
    const product = {
      name: nameEdit,
      price: priceEdit.replace('.', ',')
    };

    httpConfig(product, 'PATCH', idEdit);
    showNotification('flex', 'Notificação', 'Produto editado com sucesso');
    cleanNotification();
  }

  const showNotification = (display, title, text) => {
    setNotification({
      display,
      title,
      text
    })
  }

  const cleanNotification = () => {
    setTimeout(() => {
      setNotification({
        display: 'none',
        title: '',
        text: ''
      })
    }, 2000)
  }

  const onlyNumbers = (evt) => {
    const { key, target } = evt;
    const inputValue = target.value;

    const regexNumbers = /^[0-9]$/;
    const regexComma = /^,$/;
    const regexDot = /^\.$/;

    if (
      !regexNumbers.test(key) &&
      !regexComma.test(key) &&
      !regexDot.test(key) &&
      key !== 'Backspace'
    ) {
      evt.preventDefault();
    }

    const hasComma = inputValue.includes(',');
    const hasDot = inputValue.includes('.');

    if ((key === ',' && hasComma) || (key === '.' && hasDot)) {
      evt.preventDefault();
    }

    if ((key === ',' || key === '.') && (hasComma || hasDot)) {
      if (inputValue.slice(-1) === ',' || inputValue.slice(-1) === '.') {
        evt.preventDefault();
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <Form handleSubmit={handleSubmit} 
            showNotification={showNotification} 
            cleanNotification={cleanNotification} 
            onlyNumbers={onlyNumbers} 
      />
      <List products={products} 
            error={error} 
            handleRemove={handleRemove} 
            handleEdit={handleEdit} 
            showNotification={showNotification} 
            cleanNotification={cleanNotification} 
            onlyNumbers={onlyNumbers} 
      />
      <Notification 
            notification={notification} 
      />
    </div>
  );
}

export default App;
