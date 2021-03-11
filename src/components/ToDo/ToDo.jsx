import React, {useState, useEffect, useMemo} from "react";
import icon from "../../img/icon.png";
import basket from "../../img/basket.png";
import {useHistory} from 'react-router-dom';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("all");
  const history = useHistory()

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks")
    const access = JSON.parse(localStorage.getItem('access'))
    access === true ? localTasks && setTasks(JSON.parse(localTasks)) : history.push('/')
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  const numLeft = useMemo(() => tasks.filter(({checked}) => !checked).length, [tasks]);
  const displayedTasks = useMemo(() => {
    switch (status) {
      case 'all':
        return (
          tasks
        )
      case 'active':
        return (
          tasks.filter(task => task.checked === false)
        )
      case 'completed':
        return (
          tasks.filter(task => task.checked === true)
        )
      default:
        break;
    }
  }, [tasks, status]);


  const handleOnClick = () => {
    setTasks(prevTasks => [...prevTasks, {
      id: new Date().getTime(),
      checked: false,
      text: value,
    }])
    setValue("")
  }

  const deleteTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  const deleteAll = () => {
    setTasks(prevTasks => prevTasks.filter(task => task.checked === false))
  }

  const checkBox = (taskId) => {
    setTasks(prevTasks => prevTasks.map((task) => {
      if (task.id === taskId) {
        return (
          {
            ...task,
            checked: !task.checked
          }
        )
      }
      return task
    }))

  }

  const allChecked = () => {
    setTasks(prevTasks => {
      if (prevTasks.every(task => task.checked)) {
        return prevTasks.map(task => ({...task, checked: false}))
      } else {
        return prevTasks.map(task => ({...task, checked: true}))
      }
    })
  }

  return (
    <div className="todo-tasks">
      <div className="addTask">
        <button className="btn-check" onClick={allChecked}><img src={icon} alt=""/></button>
        <input className="add-tasked" value={value} onChange={(event => setValue(event.target.value))} type="text"
               placeholder={'What needs to be done?'}/>
        <button className="btn-add-task" onClick={() => {
          if (value !== '') {
            handleOnClick();
          }
        }}>
          Add
        </button>
      </div>
      <div className="tasks-block">
        {displayedTasks.map(task => {
          return (
            <div key={task.id} className="tasks">
              <div>
                <input checked={task.checked} type="checkbox" onChange={() => checkBox(task.id)}/>
                <span
                  style={{
                    textDecoration: task.checked ? 'line-through' : 'none'
                  }}
                >
                {task.text}
            </span>
              </div>
              <button onClick={() => {
                deleteTask(task.id)
              }}><img src={basket} alt=""/>
              </button>
            </div>
          )
        })}
      </div>
      <div className="button-list">
        <div>{numLeft} left item</div>
        <button className="btn" onClick={() => setStatus("all")}>All</button>
        <button className="btn" onClick={() => setStatus("active")}>Active</button>
        <button className="btn" onClick={() => setStatus("completed")}>Completed</button>
        <button className="btn" onClick={deleteAll}>Completed Delete</button>
      </div>
    </div>
  )
}
export default ToDo