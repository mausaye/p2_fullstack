import React from 'react';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Modal.css';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    timeOut: 5000,
};

export const Modal = ({setRowToEdit, editing, onEditing, openModal, closeModal, addRows, setIsComplete, handleEditRow, defaultValue}) => {
    const [formState, setFormState] = useState(
        defaultValue || {
            title: "",
            description: "",
            deadline: "",
        }
      );
      
    const onUpdate = () => {
        toastr.success("Row successfully updated.");
        closeModal();
       
    }

    const [showUpdateButton, setShowUpdateButton] = useState(true);
    
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const reset=()=>{
        closeModal();
        setRowToEdit(null);
    }

    const handleIsCompleteChange = () => {
        console.log("handling");
        const isCompleteCheckbox = document.getElementById('isCompleteCheckbox');
        setIsComplete(isCompleteCheckbox.checked);
    
        // Hide the "Update" button if the checkbox is checked
        if (isCompleteCheckbox.checked) {
          setShowUpdateButton(false);
        } else {
          setShowUpdateButton(true);
        }
      };

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

        if (title.value === '') {
            title.closest('.form-group').classList.add('has-error');
            count += 1;
        } else {
            title.closest('.form-group').classList.remove('has-error');
        }

        if (desc.value === '') {
            desc.closest('.form-group').classList.add('has-error');
            count += 1;
        } else {
            desc.closest('.form-group').classList.remove('has-error');
        }

        if (date.value === '') {
            date.closest('.form-group').classList.add('has-error');
            count += 1;
        } else {
            date.closest('.form-group').classList.remove('has-error');
        }

        console.log(date.value);

        if (count === 0) {
            console.log("print")
            addRows({
                title: title.value,
                description: desc.value,
                deadline: date.value,
                priority: priority,
                isComplete: <input id="isCompleteCheckbox" type="checkbox" onChange={handleIsCompleteChange}></input>,
            });
            closeModal();
        }
    };

    return (
        <div className="card" id="popUp">
            <div className="card-header bg-primary text-white">Add Task</div>
            <div className="card-body">
                <form id="form">
                    <div className="form-group">
                        <input type="text" className="form-control col-12" id="Title" onChange={handleChange} placeholder="Title"/>
                        <input type="text" className="form-control col-12" id="Description" onChange={handleChange} placeholder="Description"/>
                        <input type="date" className="form-control col-12" onChange={handleChange} id="date"/>
                        
                        <div className="row" id="priority">
                            <div className="form-check form-check-inline col-3">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="lowRadio" defaultChecked></input>
                                <label className="form-check-label" htmlFor="lowRadio">Low</label>
                            </div>
                            <div className="form-check form-check-inline col-3">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="medRadio"></input>
                                <label className="form-check-label" htmlFor="medRadio">Med </label>
                            </div>
                            <div className="form-check form-check-inline col-3">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="highRadio" ></input>
                                <label className="form-check-label" htmlFor="highRadio">High</label>
                            </div>
                        </div>
                    </div>
                    <div id="buttons">
                        {console.log(editing)}
                        {(editing)?
                        <>
                            <button className="btn btn-danger col-5" onClick={reset} id="cancelButton" type="button">Cancel</button>
                            <button className="btn btn-primary col-5" type="button" onClick={onUpdate()}id="editButton" > Edit</button>
                        </> :
                        <>
                            <button className="btn btn-danger col-5" onClick={closeModal} id="cancelButton" type="button">Cancel</button>
                            <button onClick={validate} className="btn btn-primary col-5" type="button" id="addButton" > Add</button>
                        </>
                        }
                        </div>
                </form>
            </div>
        </div>
    );
};
