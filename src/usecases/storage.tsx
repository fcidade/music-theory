import { Dispatch, SetStateAction, useEffect, useState } from "react"

export const useStorage = <T,>(id: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {

    const get = (key: string) => {
        const item = localStorage.getItem(key)
        if (!item) return null
        return JSON.parse(item) as T
    }

    const set = (key: string, value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const [value, setValue] = useState(get(id) ?? defaultValue)

    useEffect(() => {
        set(id, value)
    }, [value])

    return [value, setValue]
}
