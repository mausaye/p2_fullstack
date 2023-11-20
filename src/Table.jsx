import React from 'react';
import { useState } from "react";
import "./Table.css";
import { Modal } from './Modal';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
    positionClass: 'toast-bottom-right',
    closeButton: true,
    timeOut: 5000,
};

export const Table = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCompleteState, setIsCompleteState] = useState([]);
    const [editing, setEditing] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([])

    const toggleIsComplete = (index) => {
        const updatedIsCompleteState = [...isCompleteState];
        updatedIsCompleteState[index] = !updatedIsCompleteState[index];
        setIsCompleteState(updatedIsCompleteState);
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        // const desc = document.getElementById('Description');
        //const date = document.getElementById('date');
        //var priority = document.getElementById('priority');;

        openModal();
    };

    const edit_helper = (data) => {

        if (editing && rowToEdit !== null) {

            // If editing, update the existing row
            const updatedRows = [...rows];

            updatedRows[rowToEdit] = {
                ...updatedRows[rowToEdit],
                description: data.description,
                deadline: data.deadline,
                priority: data.priority,

                // Add other properties if needed
            };
            setRows(updatedRows);
            toastr.success("Row has been successfully updated.");
        }
    }

    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        toastr.info("Row has been successfully deleted.");
    };

    const update = (index) => {
        handleEditRow(index);
        setEditing(true);
    }

    const addRows = (details) => {

        rows.push(details);
        setRows(rows);

        toastr.success("Task has been successfully added.")
        closeModal();

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
                <button onClick={openModal} class="btn btn-primary col-2">Add</button>
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
                            <td>{<input type="checkbox" name="isComplete" onChange={() => toggleIsComplete(index)}></input>}</td>
                            <td>
                                {!isCompleteState[index] && <button key="update" onClick={() => update(index)}>Update</button>}

                                <button key="remove" onClick={() => handleRemoveRow(index)}>Remove</button>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

        {isModalOpen && <Modal rows={rows} edit_helper={edit_helper} setRowToEdit={setRowToEdit} editing={editing} setEditing={setEditing} openModal={openModal} closeModal={closeModal} addRows={addRows} handleEditRow={handleEditRow} defaultValue={rowToEdit !== null && rows[rowToEdit]} />}

    </div>

}