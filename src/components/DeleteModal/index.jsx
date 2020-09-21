import React, {useState} from 'react';
import axios from "axios";

const DeleteModal = ({itemForDelete, deleteCategory, deleteNote, deleteModalIsOpen, closeDeleteModal, deleteText}) => {

    const [loading, setLoading] = useState(false);

    const confirmAction = () => {
            setLoading(true);
            if (itemForDelete.categoryId) {
                const url='http://localhost:3001/notes/' + itemForDelete.id;
                axios
                    .delete(url, itemForDelete)
                    .then(({data}) => {
                        console.log("Заметка удалена");
                        deleteNote(itemForDelete)
                    })
                    .catch(() => {
                        alert('Ошибка при удалении заметки!');
                    })
                    .finally(() => {
                        setLoading(false);
                        closeDeleteModal();
                    });
            } else {
                const url='http://localhost:3001/categories/' + itemForDelete.id;
                axios
                    .delete(url, itemForDelete)
                    .then(({data}) => {
                        console.log("Раздел удален");
                        deleteCategory(itemForDelete)
                    })
                    .catch(() => {
                        alert('Ошибка при удалении раздела!');
                    })
                    .finally(() => {
                        setLoading(false);
                        closeDeleteModal();
                    });
            }
    };

    return (
        <div className={deleteModalIsOpen ? "modal active" : "active"}>
            <div className={deleteModalIsOpen ? "modal-content active" : "modal-content"}>
                <p>{loading ? "Удаление..." : `Удалить ${deleteText} ?`}</p>
                <div className="modal-buttons">
                    <button className="button" onClick={confirmAction}>Удалить</button>
                    <button className="button" onClick={closeDeleteModal}>Отмена</button>
                </div>
            </div>

        </div>
    )
}

export default DeleteModal;

