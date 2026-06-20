import { useState } from "react";

interface Todo {
    id: string;
    text: string;
    isCompleted: boolean;
}

const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>([])

    const addTodo = (text: string) => {
        const trimmed = text.trim()
        if (!trimmed) return
        setTodos((prev) => [...prev, { id: Date.now().toString(), text: trimmed, isCompleted: false }])
    }

    const removeTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        )
    }

    return { addTodo, removeTodo, toggleTodo, todos }
}

export default useTodo