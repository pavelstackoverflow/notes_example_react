import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";

import './AddItem.scss'
import okPng from '../../assets/icons/ok.png'
import cancelPng from '../../assets/icons/cancel.png'


const AddItem = ({setStateItem, setActive, isNote, categoryId}) => {

    const [popupIsActive, setPopupIsActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const inputElement = useRef(null);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [popupIsActive]);

    const popupStyle = () => {
        return popupIsActive ? "add-item__popup active" : "add-item__popup"
    };

    const closePopup = () => {
        setPopupIsActive(false)
        setInputValue('')

    };

    useEffect(() => {
        closePopup();
    }, [categoryId]);

    const getUrl = () => {
        if (isNote) {
            return 'http://localhost:3001/notes'
        }
        return 'http://localhost:3001/categories'
    };

    const getItem = () => {
        const item = {
            "name": inputValue
        };

        if (isNote) {
            item.completed = false;
            item.categoryId = categoryId;
        }
        return item
    };

    const addItem = () => {
        if (inputValue.replace(/\s/g, "")) {
            const url = getUrl();
            const item = getItem();
            setLoading(true);
            axios
                .post(url, item)
                .then(({data}) => {
                    const newItem = {...data, id: data.id};
                    if (!isNote) {
                        newItem.notes=[];
                    }
                    setStateItem(newItem);
                    if (!isNote) {
                        setActive(data.id)
                    }
                })
                .catch(() => {
                    alert('Ошибка при добавлении раздела!');
                })
                .finally(() => {
                    setLoading(false);
                    closePopup();
                });
        } else {
            alert("Укажите название")
        }
    }


    return (
        <div className="add-item">
            <button
                className="button"
                disabled={loading}
                onClick={() => setPopupIsActive(true)}
            >{loading ? "Loading..." : isNote ? "Добавить задачу" : "Добавить раздел"}</button>
                <div className={popupStyle()}>
                    <input className="input-text" placeholder="item"
                           onChange={e => (setInputValue(e.target.value))}
                           value={inputValue}
                           ref={inputElement}
                    />
                    <div className="add-item-confirm">
                        <img
                            src={okPng}
                            alt="Ok button"
                            onClick={addItem}
                        />
                        <img
                            src={cancelPng}
                            alt="Cnacel button"
                            onClick={closePopup}
                        />
                    </div>
                </div>
        </div>
    )
}

export default AddItem