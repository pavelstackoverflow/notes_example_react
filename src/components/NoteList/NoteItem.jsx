import React from 'react';

import './NoteList.scss';
import okPng from "../../assets/icons/ok.png";
import cancelPng from "../../assets/icons/cancel.png";
import editPng from "../../assets/icons/edit.png";

const NoteItem = ( {item, checkItem, setItemForEdit, setItemForDelete, openDeleteModal, openEditModal} ) => {

    const newItem = {...item}

    const confirmDelete = (item) => {
        openDeleteModal(item.name);
        setItemForDelete(item);
    };

    const confirmEdit = (item) => {
        openEditModal(item.name);
        setItemForEdit(item);
    };

    return (<ul>
        <li className="note-list-item">
            <img
                className={
                    newItem.completed ? "active" : ""
                }
                onClick={()=>checkItem(newItem)}
                src={okPng}
                alt="Ok button"
            />
            <p>{item.name}</p>
            <img
                src={editPng}
                alt="Edit button"
                onClick={()=>confirmEdit(item)}
            />
            <img
                src={cancelPng}
                alt="Cnacel button"
                onClick={()=>confirmDelete(item)}
            />
        </li>
    </ul>)
}

export default NoteItem;