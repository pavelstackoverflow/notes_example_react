import React from 'react';
import './MenuList.scss';
import deletePng from '../../assets/icons/cancel.png'

const MenuList = ({items, selectedItem, selectItem, openDeleteModal, setItemForDelete}) => {

    const confirmDelete = (item) => {
        openDeleteModal(item.name);
        setItemForDelete(item);
    };

    return (
        <ul className="menu__list">

            <li key="-1" className={`menu__list-item ${!selectedItem && "selected"}`}
                onClick={() => selectItem(null)}>
                <p>Все задачи</p>
            </li>
            {items && items.map((item, index) => (
                <li key={index}
                    className={`menu__list-item ${selectedItem && selectedItem === item.id && "selected"}`}>
                    <p
                        onClick={() => selectItem(item.id)}>{item.name}</p>
                    <img className="menu__list-item-delete"
                         src={deletePng}
                         alt="Delete button"
                         onClick={() => confirmDelete(item)}
                    />
                </li>

            ))}
        </ul>
    )
}

export default MenuList