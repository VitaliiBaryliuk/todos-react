import React, {Component} from 'react';

import TodoItem from './TodoItem.js';

class TodoApp extends Component {
  state = {
    todos: [],
    filtredBy: '',
    inputValue: '',
  }

  onInputValueChenge = (value) => {
    
    this.setState({
      inputValue: value
    })
  }

  addNewTodosItem = (event) => {
    event.preventDefault()

    if (!this.state.inputValue) {
      return
    }

    this.setState(({todos, inputValue}) => {
      let newTodo = {
        id: todos.length + 1,
        text: inputValue,
        done: false
      }

      return {
        todos: [...todos, newTodo],
        inputValue: '',
      }
    })
  }

  setDone = (key) => {

    this.setState(({todos}) => {
 
      return {
        todos: todos.map(todo => {
           if (todo.id === key) {
             return {
               ...todo,
               done: !todo.done
             }
           }
           return todo;
        }),
        leftCount: todos.filter(todo => todo.done === false).length
      }
    })
  }


  setFilter(filtredBy) {
    
    this.setState({
      filtredBy
    })
  }


render() {
  let { todos, inputValue, filtredBy } = this.state
  const leftCount = this.state.todos.filter(todo => todo.done === false).length

  if(filtredBy) {
    if (filtredBy === 'done') {
      todos = this.state.todos.filter(todo => todo.done === true)
    } else if (filtredBy === 'active') {
      todos = this.state.todos.filter(todo => todo.done === false)
    }
  }

  return(
    <div className="Todos">
      <h1 className="Todos__title">Todos</h1>
        <form className="Todos__input-wrapper" onSubmit={(event) => this.addNewTodosItem(event)}>
          <input
            className="Todos__input"
            type="text"
            value={inputValue}
            onChange={(event) => {
              this.onInputValueChenge(event.target.value)
            }}
          />
          <button
            className="Todos__input-button"
          >
            Add
          </button>
        </form>
      <div className="Todos__list">
        {todos.map( todo => 
          <TodoItem 
            key={todo.id}
            text={todo.text}
            done={todo.done}
            id={todo.id}
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
