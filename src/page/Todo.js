import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, getTasks } from "../modules/todo"
import useInput from "../lib/useInput"

const Todo = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.todo.tasks)
    const { value: text, onChange: onChangeText, setValue: setText } = useInput('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addTask({ description: text }))
        setText('')
    }

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    return <div>
        <h1>할 일</h1>
        <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={onChangeText} />
            <button type="submit">등록</button>
        </form>
        <ul>
            {tasks.map(task => <li key={task._id}>
                <input id={task._id} type="checkbox" onChange={e => console.log(e.target.checked)} checked={task.completed} />
                <label htmlFor={task._id}>{task.description}</label>
                <button type="button">수정</button>
                <button type="button">삭제</button>
            </li>)}
        </ul>
    </div>
}

export default Todo