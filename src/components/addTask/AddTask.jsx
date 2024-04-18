import ContentContext from '../../context/ContentContext';
import './addTask.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

// retunerar ett formulär för att skapa en ny task
const AddTask = ({ column, isAddTask, setIsAddTask }) => {
    const [newHeader, setNewHeader] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const { setColumns, taskCounter, setTaskCounter } = useContext(ContentContext);
    const headerInput = useRef(null);

    // sätter focus på titel inputen när taskmodalen visas
    useEffect(() => {
        headerInput.current.focus();
    }, [isAddTask]);

    // ökar 'taskCounter med 1, som är de unika id för varje task
    // skapar en ny task med datan från input taggarna i ett nytt objekt 'createNewTask'
    // uppdaterar kolumnens 'tasks' med den nya tasken
    // uppdaterar 'columns' med den updaterade kolumnen
    // döljer addTask modalen
    const handleSaveNewTask = () => {
        setTaskCounter(prev => prev + 1);
        const createNewTask = {
            header: newHeader,
            date: new Date().toLocaleDateString(),
            description: newDescription,
            id: taskCounter
        }
        const updateColum = { ...column, tasks: [...column.tasks, createNewTask] };
        setColumns(prev => prev.map(c => (c.id === column.id ? updateColum : c)));
        setIsAddTask(false);
    }

    return (
        isAddTask &&
        <form onSubmit={handleSaveNewTask} className='task-modal'>
            <button aria-label='close modal' className='task-close-btn' onClick={() => setIsAddTask(false)} ><RxCross2 /></button>
            <h3 className='task-category'>{column.title}</h3>
            <input className='task-modal-title-input' ref={headerInput} onChange={(e) => e.target.value && setNewHeader(e.target.value)} placeholder={'Your header..'} required />
            <p className='task-date'>{new Date().toLocaleDateString()}</p>
            <textarea
                className='task-modal-textarea-description'
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder={'Your description..'}
            ></textarea>
            <button aria-label='save task' type='submit' className='task-save-btn task-modal-btns'>Save task</button>
        </form>
    )
}

export default AddTask