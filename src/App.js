import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {MenuList, AddItem, NoteList, Search, DeleteModal, EditModal} from './components/ComponentList';

function App() {

    const [notes, setNotes] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [itemForDelete, setItemForDelete] = useState(null);
    const [deleteText, setDeleteText] = useState("");
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [itemForEdit, setItemForEdit] = useState(null);
    const [editText, setEditText] = useState("");
    const [searchText, setSearchText] = useState("");

    const url = "http://localhost:3001/categories?_embed=notes";

    useEffect(() => {
        axios.get(url)
            .then(({data}) => {
                setNotes(data);
            });
    }, []);

    /* basic http

        function sendAjaxRequest(method, url, body = null) {
            return new Promise((resolve, reject) => {
                const ajax = new XMLHttpRequest();
                ajax.open(method, url);
                ajax.responseType = 'json';
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.onload = () => {
                    if (ajax.status >= 400) {
                        reject(ajax.response)
                    } else {
                        resolve(ajax.response)
                    }
                }
                ajax.onerror = () => {
                    reject(ajax.response)
                }
                ajax.send(JSON.stringify(body));
            });
        }

        function sendFetchRequest(method, url, body = null) {
            const headers = {
                'Content-Type': 'application/json'
            };
            let fetchOpject = {
                method: method,
                headers: headers
            };
            if (method!=='GET') {
                fetchOpject = {...fetchOpject, body: JSON.stringify(body),}
            }

            return fetch(url, fetchOpject).then(response => {
                if (response.ok) {
                    return response.json()
                }
                return response.json().then(error => {
                    const errorData = new Error('Error loading data');
                    errorData.data = error
                    throw errorData;
                })
            })
        }

        sendAjaxRequest('GET', url)
            .then(data => console.log(data))
            .catch(error => console.error(error))

        sendFetchRequest('GET', url)
            .then(data => console.log(data))
            .catch(error => console.error(error))
    */

    const addCategory = category => {
        const newNoteList = [...notes, category];
        setNotes(newNoteList);
    };

    const editCategory = category => {
        if (category) {
            const newNoteList = notes.map(item => {
                if (item.id === category.id) {
                    item.name = category.name;
                }
                return item;
            });
            setNotes(newNoteList);
        }
    };

    const deleteCategory = category => {
        if (category) {
            const newNoteList = notes.filter(item => (item.id !== category.id))
            setNotes(newNoteList);
        }
    };

    const selectCategory = categoryId => {
        setSelectedCategory(categoryId)
    };

    const addNote = note => {
        const newNoteList = notes.map(item => {
            if (item.id === note.categoryId) {
                item.notes = [...item.notes, note]
            }
            return item;
        });
        setNotes(newNoteList);
    };

    const editNote = note => {
        const newNoteList = notes.map(item => {
            if (item.id === note.categoryId) {
                item.notes.map(noteItem => {
                    if (noteItem.id === note.id) {
                        noteItem.name = note.name;
                    }
                    return noteItem
                });
            }
            return item;
        });
        setNotes(newNoteList);
    };

    const deleteNote = note => {
        const newNoteList = notes.map(item => {
            if (item.id === note.categoryId) {
                item.notes = item.notes.filter(noteItem => (
                    noteItem.id !== note.id
                ))
            }
            return item;
        });
        setNotes(newNoteList);
    };

    const checkNote = note => {
        const newNoteList = notes.map(item => {
            if (item.id === note.categoryId) {
                item.notes.map(noteItem => {
                    if (noteItem.id === note.id) {
                        noteItem.completed = !note.completed;
                    }
                    return noteItem
                });
            }
            return item;
        });
        setNotes(newNoteList);
        const url = 'http://localhost:3001/notes/' + note.id;
        axios
            .patch(url, {"completed": !note.completed})
            .then(({data}) => {
                console.log("success check")
            })
            .catch(() => {
                alert('Ошибка при добавлении заметки!');
            })
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false)
    };

    const openDeleteModal = (text) => {
        setDeleteModalIsOpen(true)
        setDeleteText(text)
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false)
    };

    const openEditModal = (text) => {
        setEditModalIsOpen(true)
        setEditText(text)
    };

    const checkFilter = () => {
        if (notes) {
            let newNoteList = [...notes]
            if (selectedCategory) {
                newNoteList = newNoteList.filter(note => (
                    note.id === selectedCategory
                ))
            }
            if (searchText !== "") {
                newNoteList.forEach(item => {
                    item.notes = item.notes.filter(note => (note.name.toLowerCase().includes(searchText.toLowerCase())))
                })
            }
            console.log(newNoteList);
            return newNoteList;
        } else {
            console.log(notes);
            return notes;
        }

    };


    return (
        <div className="App">
            <div className="note">
                <DeleteModal itemForDelete={itemForDelete}
                             deleteCategory={deleteCategory}
                             deleteNote={deleteNote}
                             deleteModalIsOpen={deleteModalIsOpen}
                             closeDeleteModal={closeDeleteModal}
                             deleteText={deleteText}/>
                <EditModal itemForEdit={itemForEdit}
                           editCategory={editCategory}
                           editNote={editNote}
                           editModalIsOpen={editModalIsOpen}
                           closeEditModal={closeEditModal}
                           editText={editText}
                           setEditText={setEditText}/>
                <div className="menu">
                    <MenuList items={notes} selectedItem={selectedCategory} selectItem={selectCategory}
                              openDeleteModal={openDeleteModal}
                              setItemForDelete={setItemForDelete}
                    />
                    <AddItem setStateItem={addCategory} setActive={selectCategory} categoryId={selectedCategory}
                    />
                </div>
                <div className="content">
                    <Search setSearchText={setSearchText}/>
                    <NoteList items={
                        notes ?
                            (selectedCategory ?
                                (
                                    searchText !== "" ?
                                        (
                                            notes.filter(note => (
                                                note.id === selectedCategory
                                            )).map(item => (
                                                {
                                                    ...item,
                                                    "notes": item.notes.filter(note => (note.name.toLowerCase().includes(searchText.toLowerCase())))
                                                }
                                            ))
                                        )
                                        : (notes.filter(note => (note.id === selectedCategory)))
                                )
                                : (searchText !== "" ? (
                                    notes.map(item => (
                                        {
                                            ...item, "notes": item.notes.filter(note => (
                                                note.name.toLowerCase().includes(searchText.toLowerCase())))
                                        }
                                    )).filter(item => item.notes.length > 0)) : notes))
                            : null
                    }
                              selectItem={selectCategory}
                              checkItem={checkNote}
                              openDeleteModal={openDeleteModal}
                              setItemForDelete={setItemForDelete}
                              openEditModal={openEditModal}
                              setItemForEdit={setItemForEdit}
                    />
                    {
                        selectedCategory &&
                        <AddItem setStateItem={addNote} isNote categoryId={selectedCategory}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
