import { useNavigate, useParams } from 'react-router-dom';
import './renderTask.css';

// renderar ut alla tasks i columnen om det finns några annars en text med att kolumnen saknar tasks
// gör varje 'task' klickbar så att man kommer till dens unika url och kollar om användaren är inne i en kolumn eller är på landing page och uppdaterar urlen utefter det
// gör tasksen dragbara och skcikar med vilken task man drar i och kolumnen den dras ifrån
const RenderTask = ({ column }) => {
  const navigateTo = useNavigate();
  const { category } = useParams();

  return column.tasks.length > 0 ? (
    <>
      {column.tasks.map(task => (
        <div 
        onClick={() => navigateTo(category ? `/${column.title}/task/${task.id}` : `/task/${task.id}`)}
        className='task' 
        key={task.id}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('task', JSON.stringify({
            task: task,
            column: column
          }))
        }}
        >
          <h2>{task.header.length < 15 ? task.header : `${task.header.slice(0, 15)}..`}</h2>
          <p>{task.date}</p>
        </div>
      ))}
    </>
  ) : (
    <div className='task'>
      <p>You have no tasks in {column.title}</p>
    </div>
  )
}

export default RenderTask;