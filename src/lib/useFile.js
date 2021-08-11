import { useState } from "react"

const useFile = (initValue) => {
    const [value, setValue] = useState(initValue)

    const onChange = (e) => {
        setValue(e.target.files[0])
    }

    return { value, onChange }
}

export default useFile