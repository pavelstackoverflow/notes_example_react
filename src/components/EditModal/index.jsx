import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const EditModal = ({itemForEdit, editCategory, editNote, editModalIsOpen, closeEditModal, editText, setEditText}) => {

    const [loading, setLoading] = useState(false);
    const inputElement = useRef(null);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [editModalIsOpen]);

    const confirmAction = () => {
        if (editText.replace(/\s/g, "")) {
            setLoading(true);
            if (itemForEdit.categoryId) {
                const url = 'http://localhost:3001/notes/' + itemForEdit.id;
                axios
                    .patch(url, {"name": editText})
                    .then(({data}) => {
                        console.log("Заметка изменена");
                        const newItem={...itemForEdit, "name":editText};
                        editNote(newItem)
                    })
                    .catch(() => {
                        alert('Ошибка при изменении заметки!');
                    })
                    .finally(() => {
                        setLoading(false);
                        closeEditModal();
                    });
            } else {
                const url = 'http://localhost:3001/categories/' + itemForEdit.id;
                axios
                    .patch(url, {"name": editText})
                    .then(({data}) => {
                        console.log("Раздел изменен");
                        const newItem={...itemForEdit, "name":editText};
                        editCategory(newItem)
                    })
                    .catch(() => {
                        alert('Ошибка при изменении раздела!');
                    })
                    .finally(() => {
                        setLoading(false);
                        closeEditModal();
                    });
            }
        } else {
            alert("Укажите название")
        }
    };

    return (
        <div className={editModalIsOpen ? "modal active" : "active"}>
            <div className={editModalIsOpen ? "modal-content active" : "modal-content"}>
                <input
                    className="input-text"
                    disabled={loading}
                    onChange={e => (setEditText(e.target.value))}
                    value={editText}
                    ref={inputElement}
                />
                <div className="modal-buttons">
                    <button className="button" onClick={confirmAction}>Изменить</button>
                    <button className="button" onClick={closeEditModal}>Отмена</button>
                </div>
            </div>

        </div>
    )
}

export default EditModal;

