import React, { useState } from 'react'

function useFormFieldsUpdater<T>(defaultObject: T) {
    const [state, setState] = useState<T>(defaultObject)
    //   const [ form, dispatch ] = useReducer( reducer, {} )

    // TODO
    // useReduce

    function handleUpdate<key extends keyof T>(k: key, value: T[key]) {
        console.log(`[${String(k)}] set to ${value}`)
        state[k] = value
        setState({ ...state })
    }

    function get() {
        return state
    }

    return [handleUpdate, get] as [<key extends keyof T>(k: key, value: T[key]) => void, () => T]
}



export default useFormFieldsUpdater
