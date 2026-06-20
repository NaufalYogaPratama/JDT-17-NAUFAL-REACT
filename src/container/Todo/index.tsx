import { useState } from 'react'
import useTodo from '../../hooks/useTodo'
import Button from '../../components/button'
import { useNavigate } from 'react-router'

const Todo = () => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodo()
  const [textTodo, setTextTodo] = useState<string>('')

  const handleAdd = () => {
    if (!textTodo.trim()) return
    addTodo(textTodo.trim())
    setTextTodo('')
  }

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-4 p-8'>
      <h1 className='text-2xl font-semibold'>Todo List</h1>

      <div className='flex gap-2'>
        <input
          className='border border-gray-300 rounded-md px-3 py-2'
          value={textTodo}
          onChange={(e) => setTextTodo(e.target.value)}
          placeholder='Add a todo...'
        />
        <button
          className='bg-amber-100 hover:bg-amber-400 px-4 py-2 rounded-md'
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className='flex flex-col gap-2 w-full max-w-md'>
        {todos.map((item) => (
          <li
            key={item.id}
            className='flex items-center gap-3 border border-gray-200 rounded-md px-3 py-2'
          >
            <input
              type='checkbox'
              checked={item.isCompleted}
              onChange={() => toggleTodo(item.id)}
            />
            <span className={`flex-1 ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>
              {item.text}
            </span>
            <button
              className='text-red-500 hover:text-red-700 text-sm'
              onClick={() => removeTodo(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Button content='Kembali ke Home' onClick={() => navigate('/')} />
    </div>
  )
}

export default Todo