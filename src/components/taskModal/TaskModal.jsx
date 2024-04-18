import ContentContext from '../../context/ContentContext';
import './taskModal.css';
import { useContext, useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";

// om användaren klickat på en task så uppdateras urlen och där med körs useEffecten och då får 'currentTask' ett värde
// när 'currentTask' är true så retuneras en modal med alla info om klickad task
// klickar man på 'delete' knappen raderas tasken, 'handleDelete()' körs
// klickar man på 'edit task' knappen körs 'handleEditMode()', titeln och beskrivnings fälten redigerbara och 'edit task' knappen byter namn till 'save task'
// klickar man på 'save task' körs 'handleUpdateTask()'
const TaskModal = () => {
  const [column, setColumn] = useState({}); // håller reda på aktuell kolumn
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { columns, setColumns } = useContext(ContentContext);
  const navigateTo = useNavigate();
  const { id, category } = useParams();

  // Körs varje gång endpointen i url som använder id ändras
  // hittar aktuell task och tilldelar statet 'currentTask' rätt task och då visas modalen
  // 'setColumn' får aktuell kolumn som värde
  useEffect(() => {
    const foundTask = columns.flatMap(c => c.tasks).find(t => t.id === Number(id));
    if (foundTask) {
      setCurrentTask(foundTask)
      const currentColumn = columns.find(c => c.tasks.includes(foundTask));
      setColumn(currentColumn);
    }
  }, [id]);

  // ändrar modalen så att det går att redigera i tasken
  // uppdaterar aktuell task 'date'
  const handleEditMode = (e) => {
    e.preventDefault();
    setIsEditMode(true)
    setCurrentTask({ ...currentTask, date: new Date().toLocaleDateString() })
  }

  // lägger till den updaterade tasken i 'updatedTasks' arrayen
  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTasks = column.tasks.map(t => t.id === currentTask.id ? currentTask : t);
    handleCloseModal(updatedTasks);
  }
  
  // raderar vald task
  const handleDelete = (id) => {
    const updatedTasks = column.tasks.filter(t => t.id !== id);
    handleCloseModal(updatedTasks);
  }
  
  // uppdaterar columnen med 'tasks'
  // uppdaterar huvud objektet 'colums' med 'updateColumn'
  // återställer 'edit task' knappen till 'save task'
  // resettar 'currentTask'
  // navigerar tillbaka den kolumn man har klickat på, om ingen tillbaks till landing page
  const handleCloseModal = (tasks) => {
    if (tasks) {
      const updateColumn = { ...column, tasks: tasks }
      setColumns(prev => prev.map(c => (c.id === column.id ? updateColumn : c)))
    }
    setIsEditMode(false);
    setCurrentTask(null);
    navigateTo(category ? `/${column.title}` : "/");
  }

  return (
    currentTask && (
      <form className='task-modal'>
        <button aria-label='close modal' className='task-close-btn' onClick={() => handleCloseModal()} ><RxCross2 /></button>
        <h3 className='task-category'>{column.title}</h3>
        {!isEditMode ? (
          <>
            <p className='task-modal-title-input'>{currentTask.header}</p>
            <p className='task-date'>{currentTask.date}</p>
            <p className='task-modal-textarea-description'>{currentTask.content}</p>
            <button aria-label='edit task' onClick={(e) => handleEditMode(e)} className='task-save-btn task-modal-btns'>Edit task</button>
          </>
        ) : (
          <>
            <input className='task-modal-title-input' value={currentTask.header} onChange={(e) => setCurrentTask({ ...currentTask, header: e.target.value })} />
            <p className='task-date'>{new Date().toLocaleDateString()}</p>
            <textarea
              value={currentTask.content}
              className='task-modal-textarea-description'
              onChange={(e) => setCurrentTask({ ...currentTask, content: e.target.value })}
            ></textarea>
          <button aria-label='save task' onClick={(e) => handleUpdateTask(e)} className='task-save-btn task-modal-btns'>Save task</button>
          </>
        )}
          <button aria-label='delete task' onClick={() => handleDelete(currentTask.id)} className='task-delete-btn task-modal-btns' >Delete task</button>
      </form>
    ))
}

export default TaskModal;