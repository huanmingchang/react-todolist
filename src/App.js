import './App.css'
import { useState, useEffect } from 'react'

function Input(props) {
  const { newTodo, setNewTodo, setTodos } = props

  function addTodo() {
    setTodos((prev) => [
      ...prev,
      {
        item: newTodo,
        completed: false,
      },
    ])
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

function Todos(props) {
  const { todos, setTodos } = props

  return (
    <ul className='todoList_item'>
      {todos.map((item, i) => {
        return (
          <li key={i}>
            <label className='todoList_label'>
              <input className='todoList_input' type='checkbox' value='true' />
              <span>{item.item}</span>
            </label>
            <a href='#'>
              <i className='fa fa-times'></i>
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
            <div className='todoList_list'>
              <ul className='todoList_tab'>
                <li>
                  <a href='#' className='active'>
                    全部
                  </a>
                </li>
                <li>
                  <a href='#'>待完成</a>
                </li>
                <li>
                  <a href='#'>已完成</a>
                </li>
              </ul>
              <div className='todoList_items'>
                <Todos todos={todos} />
                <div className='todoList_statistics'>
                  <p> 5 個已完成項目</p>
                  <a href='#'>清除已完成項目</a>
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
