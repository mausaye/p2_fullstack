import React from 'react';
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./Table.css";
import { Modal } from './Modal';

toastr.options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    timeOut: 5000,
};

export const Table = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [editing, setEditing] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([])

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        openModal();
    };

    const handleRemoveRow = (index) => {
        console.log(index)
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        toastr.info("Row has been successfully deleted.");
    };

    const update = (index) => {
        handleEditRow(index);
        setEditing(true);
    }



    const addRows = (details)=> {
        
        rows.push(details);
        setRows(rows);
    }
    
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(false);
    };

    return <div>
        <div class="card">
            <div class="card-header bg-primary text-white">Frameworks
                <button onClick={openModal} class="btn btn-primary col-2"> Add</button>
            </div>
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Is Complete</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.title}</td>
                                <td>{row.description}</td>
                                <td>{row.deadline}</td>
                                <td>{row.priority}</td>
                                <td>{row.isComplete}</td>
                                <td>
                                    {!isComplete && <button key="update" onClick={() => update(index)}>Update</button>}
                                    
                                    <button key="remove" onClick={() => handleRemoveRow(index)}>Remove</button>
                                    
                                </td>
                            </tr>
                        ))}
                            
                    </tbody>
                </table>
        </div>

        {isModalOpen && <Modal setRowToEdit={setRowToEdit} editing={editing} setEditing={setEditing} openModal={openModal} closeModal={closeModal} addRows={addRows} setIsComplete={setIsComplete} handleEditRow={handleEditRow} defaultValue={rowToEdit !== null && rows[rowToEdit]}/>}
        
    </div>
   
}