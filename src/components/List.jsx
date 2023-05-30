import React, { useState } from 'react'
import './List.css'
import { FaPenSquare, FaTrashAlt, FaRegWindowClose } from "react-icons/fa";

const List = ({ products, error, handleRemove, handleEdit, showNotification, cleanNotification, onlyNumbers }) => {
    const [displayStyle, setDisplayStyle] = useState({ display: 'none' });
    const [nameEdit, setNameEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [idEdit, setIdEdit] = useState(null)

    const removeProduct = (id) => {
        handleRemove(id);
    }

    const editProduct = (name, price, id) => {
        setDisplayStyle({ display: 'flex' });
        setNameEdit(name);
        setPriceEdit(price);
        setIdEdit(id)
    }

    const applyEdit = () => {
        if (!nameEdit || !priceEdit) {
            showNotification('flex', 'Erro', 'Preencha os dois campos!');
            cleanNotification();
            return;
        };

        handleEdit(nameEdit, priceEdit, idEdit);
        setDisplayStyle({ display: 'none' });
    }

    const keyEnter = (e) => {
        if(e.keyCode === 13) {
            applyEdit();
        }
    }

    return (
        <div className='list-content'>
            <div className="popup-edit" style={{ display: displayStyle.display }}>
                <div className='editClose'>
                    <h2 className='title'>Editar</h2>
                    <button className='icon-edit' onClick={() => setDisplayStyle({ display: 'none' })}><FaRegWindowClose /></button>
                </div>
                <div className='editInfos'>
                    <label>Nome:</label>
                    <input type="text" maxLength={35} value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} className='input-nameEdit' onKeyDown={(e) => keyEnter(e)} />
                    <label>Preço:</label>
                    <input type="text" maxLength={12} input-mode='decimal' value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} className='input-priceEdit' onKeyDown={(e) => { keyEnter(e);  onlyNumbers(e) }} />
                    <button className='button-edit' onClick={() => applyEdit()} >Confirmar alterações</button>
                </div>
            </div>
            {!error ?
                <div className="list">
                    <table className='table'>
                        <thead className='thead'>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Preço R$</th>
                                <th>Editar</th>
                                <th>Apagar</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {products && products.map(product => (
                                <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td><button onClick={() => editProduct(product.name, product.price, product.id)}><i className='edit-button'><FaPenSquare /></i></button></td>
                                    <td><button onClick={() => removeProduct(product.id)}><i className='remove-button'><FaTrashAlt /></i></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <h1 className='error'>{error}</h1>
            }
        </div>
    )
}

export default List;