import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, getTasks } from "../modules/todo"
import useInput from "../lib/useInput"
import TodoItem from '../components/TodoItem'
import useFetchInfo from "../lib/useFetchInfo"
import { Types } from '../modules/todo'
import { Link } from "react-router-dom"
import useQueryParams from "../lib/useQueryParams"

const Todo = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.todo.tasks)
    const total = 40 // api 버그가 있음
    const limit = 5
    const { value: text, onChange: onChangeText, setValue: setText } = useInput('')
    const totalPage = Math.ceil(total / limit)
    const page = useQueryParams("page") || 1

    const onLoadTask = useCallback((page = 1) => dispatch(getTasks({
        limit, skip: limit * (page - 1)
    })), [dispatch])
    const onAddTask = useCallback(data => dispatch(addTask(data)), [dispatch])
    const { isFetching } = useFetchInfo(Types.GET_TASKS)

    const onSubmit = (e) => {
        e.preventDefault()
        onAddTask({ description: text })
        setText('')
    }

    useEffect(() => {
        // if (!isFetched) onLoadTask(page)
        onLoadTask(page)
    }, [onLoadTask, page])

    return <div>
        <h1>할 일 {total}</h1>
        <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={onChangeText} autoFocus disabled={isFetching} />
            <button type="submit" disabled={isFetching}>등록</button>
        </form>
        <ul>
            {tasks.map?.(({ _id, completed, description }) => <TodoItem
                key={_id}
                id={_id}
                completed={completed}
                description={description} />)}
        </ul>
        <ul>
            {Array.from({ length: totalPage }, (_, i) => i + 1).map(el => <li key={el}>
                <Link to={`/todo?page=${el}`}>{el}</Link>
            </li>)}
        </ul>
    </div>
}

export default React.memo(Todo)