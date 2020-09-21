import React from 'react';

import './NoteList.scss';
import NoteItem from "./NoteItem"
import editPng from "../../assets/icons/edit.png";

const NoteList = ({items, selectItem, checkItem, openDeleteModal, setItemForDelete, openEditModal, setItemForEdit}) => {

    const confirmEdit = (item) => {
        openEditModal(item.name);
        setItemForEdit(item);
    };

    return (
        <div className="content__container">
            {items && (
                items.map((item, index) => (
                    <div key={index} className="note-list">
                        <div className="note-list-title">
                            <p
                                onClick={() => selectItem(item.id)}>
                                {item.name}
                            </p>
                            <img
                                src={editPng}
                                alt="Edit button"
                                onClick={()=>confirmEdit(item)}
                            />
                        </div>
                        {item.notes.length ? item.notes.map((note, index) => (
                                <NoteItem key={index}
                                          item={note}
                                          checkItem={checkItem}
                                          setItemForEdit={setItemForEdit}
                                          setItemForDelete={setItemForDelete}
                                          openDeleteModal={openDeleteModal}
                                          openEditModal={openEditModal}
                                />
                            )) :
                            <h2 className="note-list-empty">Нет задач</h2>
                        }
                    </div>
                ))
            )}
        </div>
    )
}

export default NoteList