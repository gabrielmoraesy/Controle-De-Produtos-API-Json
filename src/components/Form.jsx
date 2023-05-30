import React, { useRef, useState } from 'react'
import './Form.css'

const Form = ({ handleSubmit, showNotification, cleanNotification, onlyNumbers }) => {   
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const inputName = useRef();

    const addProduct = (e) => {
        e.preventDefault();
        
        if (!name || !price) {
            showNotification('flex', 'Erro', 'Preencha os dois campos!');
            cleanNotification();
            return;
        };

        handleSubmit(name, price);
        
        setName('');
        setPrice('');
        inputName.current.focus();
    }

    const keyEnter = (e) => {
        if(e.keyCode === 13) {
            addProduct(e);
        }
    }

    return ( 
        <form onSubmit={addProduct} className='form'>
            <label>
            Nome: <input type="text" maxLength={35} value={name} onChange={(e) => setName(e.target.value)} ref={inputName} className='input-name' placeholder='Digite o nome do produto' />
            </label>
            <label>
            Preço: <input type="text" input-mode='decimal' value={price} onChange={(e) => setPrice(e.target.value)} onKeyDown={(e) => { keyEnter(e); onlyNumbers(e) }} className='input-price' placeholder='Digite o preço do produto' />
            </label>
            <input type="submit" value='Criar Produto' className='button-form' />
        </form>
    );
}
 
export default Form;