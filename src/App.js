import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

const Input = (props) => {
  const { newTodo, setNewTodo, setTodos } = props

  const addTodo = () => {
    if (!newTodo) {
      alert('請輸入待辦事項內容')
      return
    }

    setTodos((prev) => [
      ...prev,
      {
        id: uuidv4(),
        item: newTodo,
        completed: false,
      },
    ])

    setNewTodo('')
  }

  return (
    <div className='inputBox'>
      <input
        type='text'
        placeholder='請輸入待辦事項'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <a href='#'>
        <i
          className='fa fa-plus'
          onClick={() => {
            addTodo()
          }}
        ></i>
      </a>
    </div>
  )
}

const Todos = (props) => {
  const { todos, setTodos, filteredTodos } = props

  const deleteTodo = (e) => {
    const id = e.target.dataset.id
    setTodos((todos) => todos.filter((item) => item.id !== id))
  }

  const completeTodo = (e) => {
    const id = e.target.dataset.id
    setTodos((prevState) => {
      const newState = prevState.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed }
        }

        return item
      })

      return newState
    })
  }

  return (
    <ul className='todoList_item'>
      {filteredTodos.map((item, i) => {
        return (
          <li key={i}>
            <label className='todoList_label'>
              <input
                className='todoList_input'
                type='checkbox'
                value={item.completed}
                checked={item.completed ? 'checked' : ''}
                data-id={item.id}
                onChange={(e) => {
                  completeTodo(e)
                }}
              />
              <span>{item.item}</span>
            </label>
            <a href='#'>
              <i
                className='fa fa-times'
                data-id={item.id}
                onClick={(e) => {
                  deleteTodo(e)
                }}
              ></i>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [currentTab, setCurrentTab] = useState('all')

  const clearCompleted = () => {
    if (todos.length === 0) return

    setTodos((todos) => todos.filter((item) => !item.completed))
  }

  const changeCurrentTab = (tab) => {
    if (tab === 'active') {
      setCurrentTab('active')
    }

    if (tab === 'completed') {
      setCurrentTab('completed')
    }

    if (tab === 'all') {
      setCurrentTab('all')
    }
  }

  const filteredTodos = () => {
    if (currentTab === 'all') {
      return todos
    }

    if (currentTab === 'active') {
      return todos.filter((item) => !item.completed)
    }

    if (currentTab === 'completed') {
      return todos.filter((item) => item.completed)
    }
  }

  return (
    <div className='App'>
      <div id='todoListPage' className='bg-half'>
        <nav>
          <h1>
            <a href='#'>ONLINE TODO LIST</a>
          </h1>
        </nav>
        <div className='conatiner todoListPage vhContainer'>
          <div className='todoList_Content'>
            <Input
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              setTodos={setTodos}
            />
            <div
              className='todoList_list'
              style={
                todos.length === 0 ? { display: 'none' } : { display: 'block' }
              }
            >
              <ul className='todoList_tab'>
                <li>
                  <a
                    href='#'
                    className='hover'
                    onClick={() => {
                      changeCurrentTab('all')
                    }}
                  >
                    全部
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover'
                    onClick={(e) => {
                      changeCurrentTab('active')
                    }}
                  >
                    待完成
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover'
                    onClick={(e) => {
                      changeCurrentTab('completed')
                    }}
                  >
                    已完成
                  </a>
                </li>
              </ul>
              <div className='todoList_items'>
                <Todos
                  todos={todos}
                  setTodos={setTodos}
                  filteredTodos={filteredTodos()}
                />
                <div className='todoList_statistics'>
                  <p>
                    {todos.filter((item) => item.completed === true).length +
                      ' '}
                    個已完成項目
                  </p>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      clearCompleted()
                    }}
                    className='hover'
                  >
                    清除已完成項目
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
