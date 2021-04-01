import React, {useState, useEffect, useMemo} from "react";
import icon from "../../img/icon.png";
import basket from "../../img/basket.png";
import {useHistory} from 'react-router-dom';
import axios from "axios"


const axiosInstance = axios.create({
  baseURL: "http://localhost:5000"
})

const ToDo = () => {

  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("all");
  const history = useHistory()

  const getCurrData = () => {
    axiosInstance.get("/task", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        setTasks(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    const LocalToken = localStorage.getItem('token')
    if(LocalToken){
      history.push('/todo')
    }else{
      history.push('/')
    }
  }, [])

  useEffect(() => {
    getCurrData()
  }, [])


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
    if (value !== '') {
      axiosInstance.post("/task", {value}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(() => getCurrData())
        .catch(err => console.log(err))
    }
    setValue('')
  }

  const deleteTask = (id) => {
    axiosInstance.delete(`/task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => getCurrData())
      .catch(err => console.log(err))
  }

  const deleteAllCompleted = () => {
    axiosInstance.delete('/task', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => getCurrData())
      .catch(err => console.log(err))
  }

  const checkBox = (Id) => {
    axiosInstance.put(`/task/${Id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => getCurrData())
      .catch(err => console.log(err))
  }

  const allChecked = () => {
    axiosInstance.put('/task', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(() => getCurrData())
      .catch(err => console.log(err))
  }

  return (
    <div className="todo-tasks">
      <div className="addTask">
        <button className="btn-check" onClick={allChecked}><img src={icon} alt=""/></button>
        <input className="add-tasked"
               value={value}
               onChange={(event => setValue(event.target.value))}
               onKeyPress={(event) => {
                 if (event.key == 'Enter') {
                   handleOnClick()
                 }
               }}
               type="text"
               placeholder={'What needs to be done?'}
        />
        <button className="btn-add-task" onClick={handleOnClick}>
          Add
        </button>
      </div>
      <div className="tasks-block">
        {displayedTasks.map(task => {
          return (
            <div key={task.id} className="tasks">
              <div>
                <input checked={task.checked} type="checkbox" onChange={() => checkBox(task._id)}/>
                <span
                  style={{
                    textDecoration: task.checked ? 'line-through' : 'none'
                  }}
                >
                {task.value}
            </span>
              </div>
              <button onClick={() => {
                deleteTask(task._id)
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
        <button className="btn" onClick={deleteAllCompleted}>Completed Delete</button>
      </div>
    </div>
  )
}
export default ToDo