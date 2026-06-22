import { useState } from 'react'
import useTodo from '../../hooks/useTodo'
import Header from '../../components/header'
import Footer from '../../components/footer'

const Todo = () => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodo()
  const [textTodo, setTextTodo] = useState<string>('')

  const handleAdd = () => {
    if (!textTodo.trim()) return
    addTodo(textTodo.trim())
    setTextTodo('')
  }

  return (
    <div className="movie-page-container min-h-screen bg-[#000000] text-[#EEEEEE] flex flex-col w-full overflow-x-hidden font-sans relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#CB2957]/10 via-[#000000] to-[#000000] bg-grid-pattern">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 pt-32 pb-16 flex flex-col items-center gap-8 relative z-10 text-left">
        
        {/* Title and Tagline */}
        <div className="w-full text-center flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#EEEEEE] uppercase leading-none mt-1">
            Todo List
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
            Keep track of your tasks and projects with a cinematic list interface.
          </p>
        </div>

        {/* Input Form */}
        <div className="flex gap-2 w-full max-w-md mt-4">
          <input
            className="bg-[#1A1A1A] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:border-[#CB2957] focus:ring-1 focus:ring-[#CB2957]/50 focus:outline-none flex-1 placeholder-neutral-500 transition-colors"
            value={textTodo}
            onChange={(e) => setTextTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
          />
          <button
            className="bg-[#CB2957] hover:bg-[#CB2957]/90 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md hover:shadow-[#CB2957]/20 text-sm"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="flex flex-col gap-3 w-full max-w-md mt-2">
          {todos.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-4 bg-[#0B0B0B] border rounded-xl px-4 py-3.5 transition-all duration-300 hover:scale-[1.01] ${
                item.isCompleted ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-[#CB2957]/30'
              }`}
            >
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => toggleTodo(item.id)}
                className="w-4 h-4 cursor-pointer accent-[#CB2957] rounded border-white/20 bg-neutral-900 text-[#CB2957] focus:ring-[#CB2957]/20 focus:ring-offset-neutral-950"
              />
              <span className={`flex-1 text-sm font-medium transition-all ${
                item.isCompleted ? 'line-through text-neutral-500' : 'text-[#EEEEEE]'
              }`}>
                {item.text}
              </span>
              <button
                className="text-neutral-500 hover:text-[#CB2957] text-xs font-bold transition-colors duration-300 flex items-center gap-1 cursor-pointer"
                onClick={() => removeTodo(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="text-center py-8 text-neutral-500 font-light text-sm italic">
              No tasks found. Add a todo above!
            </li>
          )}
        </ul>

      </main>

      <Footer />
    </div>
  )
}

export default Todo