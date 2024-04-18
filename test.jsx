import { useNavigate, useParams } from "react-router-dom";

// när man klickar på en task
const navigateTo = useNavigate();
navigateTo('/task.id');


// för att modalen ska visas med rätt task i
// 'tasks' är en array med alla tasks
const { id } = useParams();

useEffect(() => {
    const task = tasks.find((task) => id == task.id)
    setTaskData(task)
    setShow(true)
}, [id])