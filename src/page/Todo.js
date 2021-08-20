import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, getTasks } from "../modules/todo"
import useInput from "../lib/useInput"
import TodoItem from '../components/TodoItem'
import useFetchInfo from "../lib/useFetchInfo"
import { Types } from '../modules/todo'

const Todo = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.todo.tasks)
    const { value: text, onChange: onChangeText, setValue: setText } = useInput('')

    const onLoadTask = useCallback(() => dispatch(getTasks()), [dispatch])
    const onAddTask = useCallback(data => dispatch(addTask(data)), [dispatch])
    const { isFetched } = useFetchInfo(Types.GET_TASKS)

    const onSubmit = (e) => {
        e.preventDefault()
        onAddTask({ description: text })
        setText('')
    }

    useEffect(() => {
        if (!isFetched) onLoadTask()
    }, [onLoadTask, isFetched])

    return <div>
        <h1>할 일</h1>
        <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={onChangeText} autoFocus />
            <button type="submit">등록</button>
        </form>
        <ul>
            {tasks.map?.(({ _id, completed, description }) => <TodoItem
                key={_id}
                id={_id}
                completed={completed}
                description={description} />)}
        </ul>
    </div>
}

export default React.memo(Todo)