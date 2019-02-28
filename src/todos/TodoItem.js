import React from 'react';

const TodoItem = ({id, text, done, onCheckboxClick}) => {
  return(
    <li className="Todos__item">
      <input type="checkbox" checked={done} onChange={() => onCheckboxClick(id)} />
      <span className={`Todos__item-text ${done ? 'checked' : ''}`}>{text}</span>
    </li> 
  )
}

export default TodoItem;