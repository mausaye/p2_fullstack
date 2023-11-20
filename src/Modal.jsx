import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Modal.css';
import toastr from "toastr";
import "toastr/build/toastr.min.css";


export const Modal = ({ rows, edit_helper, setRowToEdit, editing, onEditing, openModal, closeModal, addRows, setIsComplete, handleEditRow, defaultValue }) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            title: "",
            description: "",
            deadline: "",
            priority: "Low"
        }
    );

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        date: false,
    });

    const setError = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    };

    const clearError = (field) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    };

    useEffect(() => {
        if (defaultValue) {
            setFormState(defaultValue);
        }
    }, [defaultValue]);

    // When edit is clicked.
    const onUpdate = () => {
        closeModal();
        console.log("Form State:", formState);
        edit_helper({
            description: formState.description,
            deadline: formState.deadline,
            priority: formState.priority,

        })

    }

    const handleChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === "priority") {
            setFormState({ ...formState, [e.target.name]: document.querySelector(`label[for=${e.target.id}]`).innerText })
        }
        else {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    };

    const reset = () => {
        closeModal();
        setRowToEdit(null);
    }

    const validate = () => {
        const title = document.getElementById('Title');
        const desc = document.getElementById('Description');
        const date = document.getElementById('date');
        var priority;

        if (document.getElementById('lowRadio').checked) {
            priority = 'Low';
        } else if (document.getElementById('medRadio').checked) {
            priority = 'Medium';
        } else if (document.getElementById('highRadio').checked) {
            priority = 'High';
        }

        var count = 0;

        if (title.value === '' || rows.some((row) => row.title === title.value)) {
            title.closest('.form-control').classList.add('has-error');
            count += 1;
            setError("title");
        } else {
            title.closest('.form-control').classList.remove('has-error');
            clearError("title");
        }

        if (desc.value === '') {
            desc.closest('.form-control').classList.add('has-error');
            count += 1;
            setError("description");
        } else {
            desc.closest('.form-control').classList.remove('has-error');
            clearError("description");
        }

        if (date.value === '') {
            date.closest('.form-control').classList.add('has-error');
            count += 1;
            setError("date");
        } else {
            date.closest('.form-control').classList.remove('has-error');
            clearError("date");
        }

        if (count === 0) {
            addRows({
                title: title.value,
                description: desc.value,
                deadline: date.value,
                priority: priority,
            });

        }
    };

    return (
        <div className="card" id="popUp">
            <div className="card-header bg-primary text-white">
                {(editing)? "Edit Task": "Add Task"}</div>
            <div className="card-body">
                <form id="form">
                    {(!editing) && <div className="form-group">
                        <input type="text" className="form-control col-12 mb-0" id="Title" onChange={handleChange} name="title" placeholder="Title"></input>
                        {errors.title && <span className="text-danger mt-0">Title cannot be empty or already exist.</span>}
                    </div>
                    }
                    <div className="form-group">
                        <input type="text" className="form-control col-12 mb-0" id="Description" onChange={handleChange} name="description" placeholder="Description" defaultValue={formState.description} />
                        {errors.description && <span className="text-danger mt-0">Description cannot be empty.</span>}
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control col-12 mb-0" onChange={handleChange} id="date" name="deadline" defaultValue={formState.deadline} />
                        {errors.date && <span className="text-danger mt-0">Date cannot be empty.</span>}
                    </div>
                    <div className="form-group">
                        <div className="row" id="priority">
                            <div className="form-check form-check-inline col-3">
                                <input className="form-check-input" onChange={handleChange} type="radio" name="priority" id="lowRadio" defaultChecked={formState.priority === 'Low'}></input>
                                <label className="form-check-label" htmlFor="lowRadio">Low</label>
                            </div>
                            <div className="form-check form-check-inline col-3">
                                <input className="form-check-input" onChange={handleChange} type="radio" name="priority" id="medRadio" defaultChecked={formState.priority === 'Medium'}></input>
                                <label className="form-check-label" htmlFor="medRadio">Med </label>
                            </div>
                            <div className="form-check form-check-inline col-3">
                                <input className="form-check-input" onChange={handleChange} type="radio" name="priority" id="highRadio" defaultChecked={formState.priority === 'High'}></input>
                                <label className="form-check-label" htmlFor="highRadio">High</label>
                            </div>
                        </div>
                    </div>
                    <div id="buttons">
                        {(editing) ?
                            <>
                                <button className="btn btn-danger col-6" onClick={reset} id="cancelButton" type="button"><i class="fa fa-ban"></i> Cancel</button>
                                <button className="btn btn-primary col-5" id="editButton" type="button" onClick={onUpdate}><i class="fa fa-pencil"></i>  Edit</button>
                            </> :
                            <>
                                <button className="btn btn-danger col-6" onClick={closeModal} id="cancelButton" type="button"> <i class="fa fa-ban"></i> Cancel</button>
                                <button onClick={validate} className="btn btn-primary col-5" type="button" id="addBtn" ><i class="fa fa-plus"></i> Add</button>
                            </>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};
