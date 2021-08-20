import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, getTasks } from "../modules/todo"
import useInput from "../lib/useInput"
import TodoItem from '../components/TodoItem'
import useFetchInfo from "../lib/useFetchInfo"
import { Types } from '../modules/todo'
import Input from "../components/Input"
import Button from "../components/Button"
import Wrapper from "../components/Wrapper"

const Todo = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.todo.tasks)
    const { value: text, onChange: onChangeText, setValue: setText } = useInput('')

    const onLoadTask = useCallback(() => dispatch(getTasks()), [dispatch])
    const onAddTask = useCallback(data => dispatch(addTask(data)), [dispatch])
    const { isFetched } = useFetchInfo(Types.GET_TASKS)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            window.alert('내용을 입력하세요')
            return
        }
        onAddTask({ description: text })
        setText('')
    }

    useEffect(() => {
        if (!isFetched) onLoadTask()
    }, [onLoadTask, isFetched])

    return <Wrapper>
        <section>
            <form onSubmit={onSubmit}>
                <Input type="text" value={text} onChange={onChangeText} autoFocus placeholder="할 일 입력..." />
                <Button type="submit">➕</Button>
            </form>
        </section>
        <ul>
            {tasks.map?.(({ _id, completed, description }) => <TodoItem
                key={_id}
                id={_id}
                completed={completed}
                description={description} />)}
        </ul>
    </Wrapper>
}

export default React.memo(Todo)