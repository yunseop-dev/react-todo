import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import useInput from "../lib/useInput"
import { removeTask, updateTask } from "../modules/todo"


const TodoItem = ({ id, completed, description }) => {
    const [isModifying, setIsModifying] = useState(false)
    const { value: text, onChange: onChangeText } = useInput(description)
    const dispatch = useDispatch()

    const onUpdateTask = useCallback((data) => dispatch(updateTask(data)), [dispatch])
    const onChangeChecked = useCallback((e) => dispatch(updateTask({ id, completed: e.target.checked })), [id, dispatch])
    const onRemove = useCallback(() => dispatch(removeTask(id)), [id, dispatch])

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onUpdateTask({ id, description: text })
            onToggle()
        }
    }

    const onToggle = () => {
        setIsModifying(val => !val)
    }

    return <li>
        <input id={id} type="checkbox" onChange={onChangeChecked} checked={completed} />
        {isModifying
            ? <input type="text" onChange={onChangeText} onKeyDown={onKeyDown} value={text} />
            : <span onClick={onToggle}>{description}</span>}
        <button type="button" onClick={onRemove}>삭제</button>
    </li>
}

export default React.memo(TodoItem)