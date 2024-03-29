import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskForm = () => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState([]);
    const [errorMessaqge, setErrorMessage] = useState();
    const inputElement = useRef(null)

    const onAddTask = () => {
        let included = false;
        let isEmpty = true;

        if(newTask.length > 0){
            isEmpty = false;
        }

        (isEmpty === false) ? tasks.map(task => {
            if (task.name.toLowerCase() === newTask.toLowerCase()) { included = true; } return task;
        }) : included = false;

        if ((!included) && (!isEmpty) ){
            dispatch({ type: 'ADD_TASK', payload: newTask });
            setNewTask('');
        } else if (isEmpty) {
            setErrorMessage('This field is required.')
        } else {
            setErrorMessage('Duplicate Item');
        }
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();
        e.target.reset();
        inputElement.current.focus()
    }

    const onChangeHandle = (e) => {
        setNewTask(e.target.value);
        setErrorMessage();
    }

    useEffect(() => {
        if (inputElement.current) {
          inputElement.current.focus();
        }
      }, []);

    return (
        <div className="newTaskContainer">
            <form onSubmit={onSubmitHandle}>
                <input type="text" value={newTask} onChange={(e) => onChangeHandle(e)} style={errorMessaqge && { outlineColor: 'red' }} ref={inputElement}/>
                <span>{errorMessaqge}</span>
                <button onClick={onAddTask}>Add Task</button>
            </form>

        </div>
    )
}

export default TaskForm;