import React, {Component} from 'react';

import TodoItem from './TodoItem.js';

class TodoApp extends Component {
  state = {
    todos: [],
    filtredTodos: [],
    filtredBy: '',
    inputValue: '',
    leftCount: 0,
  }

  onInputValueChenge = (value) => {
    
    this.setState({
      inputValue: value
    })
  }

  addNewTodosItem = () => {

    if (!this.state.inputValue) {
      return
    }

    this.setState(({todos, inputValue}) => {
      let newTodo = {
        value: todos.length + 1,
        text: inputValue,
        done: false
      }

      return {
        todos: [...todos, newTodo],
        inputValue: ''
      }
    }, () => {
      this.setLeftCount()

      if (this.state.filtredBy) {
        this.setFilter(this.state.filtredBy);
      }
    });
  }

  setDone = (key) => {

    this.setState(({todos}) => {
      const clickedItem = todos.find(todo => todo.value === key)
      clickedItem.done = !clickedItem.done;

      return {
        todos
      }
    }, () => {
      this.setLeftCount()

      if (this.state.filtredBy) {
        this.setFilter(this.state.filtredBy);
      }
    })
    
  }

  setLeftCount() {
    this.setState(() => {
      const leftCount = this.state.todos.filter(todo => todo.done === false).length
      
      return {
        leftCount
      }
    })
  }

  setFilter(filtredBy) {
    let filtredTodos = []
    if (filtredBy === 'done') {
      filtredTodos = this.state.todos.filter(todo => todo.done === true)
    } else if (filtredBy === 'all') {
      filtredBy = ''
    } else {
      filtredTodos = this.state.todos.filter(todo => todo.done === false)
    }
    
    this.setState({
      filtredTodos,
      filtredBy
    })
  }


render() {
  let { todos, inputValue, leftCount, filtredBy, filtredTodos } = this.state

  if(filtredBy) {
    todos = filtredTodos
  }

  return(
    <div className="Todos">
      <h1 className="Todos__title">Todos</h1>
      <div className="Todos__input-wrapper">
        <input
          className="Todos__input"
          type="text"
          value={inputValue}
          onChange={(event) => {
            this.onInputValueChenge(event.target.value)
          }}
          onKeyPress={key => {
            if (key.key === "Enter") {
              this.addNewTodosItem()
            }
          }} 
        />
        <button
          className="Todos__input-button"
          onClick={() => this.addNewTodosItem() }
        >
          Add
        </button>
      </div>
      <div className="Todos__list">
        {todos.map( todo => 
          <TodoItem 
            key={todo.value}
            text={todo.text}
            done={todo.done}
            id={todo.value}
            onCheckboxClick={this.setDone}
        />
        )}
      </div>
      <div className="Todos__bottom">
        <p className="Todos__bottom-left-count">{leftCount} left</p>
        <button className="Todos__bottom-button" onClick={() => { this.setFilter('all') }}>all</button>
        <button className="Todos__bottom-button" onClick={() => { this.setFilter('active') }}>Active</button>
        <button className="Todos__bottom-button" onClick={() => { this.setFilter('done') }}>Archived</button>
      </div>
    </div>
  )
 } 
}

export default TodoApp;
