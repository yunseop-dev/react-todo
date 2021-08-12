import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, getTasks, updateTask, removeTask } from "../modules/todo"
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
            {tasks.map(({ _id, completed, description }) => <TodoItem key={_id} id={_id} completed={completed} description={description} />)}
        </ul>
    </div>
}

const TodoItem = ({ id, completed, description }) => {
    const [isModifying, setIsModifying] = useState(false)
    const { value: text, onChange: onChangeText } = useInput(description)
    const dispatch = useDispatch()

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(updateTask({ id, description: text }))
            onToggle()
        }
    }

    const onToggle = () => {
        setIsModifying(val => !val)
    }

    const onChangeChecked = (e) => {
        dispatch(updateTask({ id, completed: e.target.checked }))
    }

    const onRemove = () => {
        dispatch(removeTask(id))
    }

    return <li>
        <input id={id} type="checkbox" onChange={onChangeChecked} checked={completed} />
        {isModifying
            ? <input type="text" onChange={onChangeText} onKeyDown={onKeyDown} value={text} />
            : <span onClick={onToggle}>{description}</span>}
        <button type="button" onClick={onRemove}>삭제</button>
    </li>
}

export default Todo