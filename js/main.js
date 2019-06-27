'use strict';

const handleRemoveButtonClick = (e, todoItemElement) => {
  const todoListElement = getTodoListElement();
  if (todoItemElement && todoListElement) {
    const confirmMessage = 'Bạn có muốn xóa';
    if (window.confirm(confirmMessage)) {
      todoListElement.removeChild(todoItemElement);
    }
  }
}

const setTodoFormValue = (todo) => {
  // find todo form
  const todoForm = document.querySelector('#todoForm');
  if (todoForm) {
    todoForm.setAttribute('data-todo-id', todo.id);
    const formControlNameList = ['title'];
    for (const formControlName of formControlNameList) {
      const control = todoForm.querySelector(`[name=${formControlName}]`);
      control.value = todo[formControlName];
    }

    const submitButton = todoForm.querySelector(`button[type=submit]`);
    if (submitButton) {
      submitButton.classList.remove('btn-primary');
      submitButton.classList.add('btn-success');
      submitButton.innerText = 'Cập nhật đi chú';
    }
  }

};

const handleEditButtonClick = (e, todo) => {
  setTodoFormValue(todo);
}

const buildTodoItem = (todo) => {
  const todoItemTemplate = document.querySelector('#todoItemTemplate');
  const todoItemFragment = todoItemTemplate.content.cloneNode(true);
  const todoItemElement = todoItemFragment.querySelector('li');
  if (todoItemElement) {
    todoItemElement.setAttribute('data-todo-id', todo.id.toString());
  }

  const todoItemTitleElement = todoItemElement.querySelector('#todoItemTitle');
  if (todoItemTitleElement) {
    todoItemTitleElement.innerText = todo.title;
    todoItemTitleElement.removeAttribute('id');
  }

  const removeButtonElement = todoItemElement.querySelector('#todoItemRemove');
  if (removeButtonElement) {
    removeButtonElement.addEventListener('click', (e) => handleRemoveButtonClick(e, todoItemElement));
    removeButtonElement.removeAttribute('id');
  }


  const editButtonElement = todoItemElement.querySelector('#todoItemEdit');
  if (editButtonElement) {
    editButtonElement.addEventListener('click', (e) => handleEditButtonClick(e, todo));
    editButtonElement.removeAttribute('id');
  }

  return todoItemElement;
};

const getTodoListElement = () => document.querySelector('ul#todoList');

const renderTodoList = (todoList) => {
  const todoListElement = getTodoListElement();
  if (todoListElement) {
    for (const todo of todoList) {
      const todoItem = buildTodoItem(todo);
      todoListElement.appendChild(todoItem);
    }
  }
};

const todoList = [{
  id: 1,
  title: 'Cường Nguyễn'
}, {
  id: 2,
  title: 'Hello World'
}];

renderTodoList(todoList);

const getTodoFormValue = () => {
  const formValue = {};

  const todoForm = document.querySelector('#todoForm');
  if (todoForm) {
    const formControlNameList = ['title'];
    for (const controlName of formControlNameList) {
      const control = todoForm.querySelector(`[name=${controlName}]`);
      formValue[controlName] = control.value;
    }
  }
  return formValue;
};

const randomNumber = (min, max) => {
  const randomNumber = Math.trunc(Math.random() * (max - min));
  return randomNumber + min;
}

const resetTodoForm = () => {
  const todoForm = document.querySelector('#todoForm');
  todoForm.reset();
  todoForm.removeAttribute('data-todo-id');

  const submitButton = todoForm.querySelector('button[type=submit]');
  if (submitButton) {
    submitButton.classList.remove('btn-success');
    submitButton.classList.add('btn-primary');
    submitButton.innerText = 'Add to list';
  }
};

const handleTodoFormSubmit = (e) => {
  e.preventDefault();

  const todoForm = document.querySelector('#todoForm');
  const mode = todoForm.hasAttribute('data-todo-id') ? 'edit' : 'add';
  const formValue = getTodoFormValue();
  switch (mode) {

    case 'edit': {
      const todoId = todoForm.getAttribute('data-todo-id');
      const todoListElement = getTodoListElement();
      const todoItemElement = todoListElement.querySelector(`li[data-todo-id="${todoId}"]`);
      const newTodo = {
        id: todoId,
        ...formValue,
      };
      const newTodoItemElement = buildTodoItem(newTodo);
      todoListElement.replaceChild(newTodoItemElement, todoItemElement);
      break;
    }

    case 'add': {
      const randomId = randomNumber(10000, 100000);
      const newTodo = {
        id: randomId,
        ...formValue,
      };
      const todoItemElement = buildTodoItem(newTodo);
      const todoListElement = getTodoListElement();
      if (todoItemElement && todoListElement) {
        todoListElement.appendChild(todoItemElement);
      }
      break;
    }
    default:
  }
  resetTodoForm()
};

const todoForm = document.querySelector('#todoForm');
if (todoForm) {
  todoForm.addEventListener('submit', handleTodoFormSubmit);
}