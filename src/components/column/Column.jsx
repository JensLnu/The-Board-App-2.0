import RenderTask from '../renderTask/RenderTask';
import AddTask from '../addTask/AddTask';
import ContentContext from '../../context/ContentContext';
import './column.css';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";

// retunerar en rendering av en kolumn
// kallar på 'RenderTask' för att rendera ut alla tasks i kolumen
// om det är den första kolumnen alltså 'column.id' === 1 så ska en knapp för att skapa tasks läggas till
// klickar man på 'Create new task' körs 'AddTask'
const Column = ({ column, width, isShowColumn }) => {
    const {  setColumns } = useContext(ContentContext);
    const [isAddTask, setIsAddTask] = useState(false);
    const navigateTo = useNavigate();

    // sparar datan från dataTransfer i varsin variabel
    // kontrollerar så att användaren inte försöker dra en task till samma kolumn
    // tar bort den dragna tasken ur den tidigare kolumnen
    // lägger till den dragna tasken i den nya Kolumnen
    const handleDrop = (e, toColumn) => {
        e.preventDefault();
        const movedData = JSON.parse(e.dataTransfer.getData('task'));
        const movedTask = movedData.task;
        const fromColumn = movedData.column;
        if (toColumn.id !== fromColumn.id) {
            // tar bort
            const updatedTasks = fromColumn.tasks.filter(t => t.id !== movedTask.id);
            const updateFromColumn = { ...fromColumn, tasks: updatedTasks };
            setColumns(prev => prev.map(c => (c.id === fromColumn.id ? updateFromColumn : c)));
            // lägger till
            const updateToColumn = { ...toColumn, tasks: [...toColumn.tasks, movedTask] };
            setColumns(prev => prev.map(c => (c.id === toColumn.id ? updateToColumn : c)));
        }
    }

    return (
        <>
            <section
                className="card"
                tabIndex="0"
                style={{ width: `${width}%` }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, column)} >
                <div
                    className='column-header'
                    onClick={() => navigateTo(!isShowColumn ? `/${column.title}` : '/')}
                >
                    <h2>{column.title}</h2>
                    <i className='resize-icon'><IoMdResize /></i>
                </div>
                <RenderTask column={column} />
                {column.id === 1 && <button aria-label='create task' className="add-task-btn" onClick={() => setIsAddTask(true)} ><span><FaPlus /></span>Create new task</button>}
            </section>
            {isAddTask && column.id === 1 && (<AddTask column={column} isAddTask={isAddTask} setIsAddTask={setIsAddTask} />)}
        </>
    )
}

export default Column