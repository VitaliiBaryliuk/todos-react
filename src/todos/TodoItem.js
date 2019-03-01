import React from 'react';

const TodoItem = ({id, text, done, onCheckboxClick}) => {
  return(
    <label className="Todos__item" onChange={() => onCheckboxClick(id)}>
      <input type="checkbox" checked={done} />
      <span className={`Todos__item-text ${done ? 'checked' : ''}`}>{text}</span>
    </label>
  )
}

export default TodoItem;