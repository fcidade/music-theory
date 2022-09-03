import { useStorage } from "."

export const useTracker = (trackerId: string, options: string[]) => {
    const optionsMap = options.reduce((map, key) => ({ ...map, [key]: false }), {})
    const [checkedOptions, setCheckedOptions] = useStorage<Record<string, boolean>>(trackerId, optionsMap)

    const toggleCheck = (key: string) => {
        setCheckedOptions(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const items = options.map(option => ({
        name: option,
        checked: checkedOptions[option],
        toggleCheck: () => toggleCheck(option),
    }))

    return {
        options,
        checkedOptions,
        items,
        toggleCheck,
    }
}