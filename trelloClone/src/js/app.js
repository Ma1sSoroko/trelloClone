import { digitalClock } from './clock.js'
import { Todo } from './classTodo.js'

// Переменные
let state = {
    todos: getDataFromStorage()
}
const addTodoElement = document.querySelector('.add-todo') //кнопка для открытия модального окна
const addPopupElement = document.querySelector('#popup') //для видимости модального окна (добавление)
const formElement = document.querySelector('.popup-content') //для отправки формы
const addTitleElement = document.querySelector('.add-title') //для добавления title
const addDescriptionElement = document.querySelector('#add-description') //для добавления description
const userElement = document.querySelector('#user') //для добавления user
const closePopupElement = document.querySelector('.close-popup') //для закрытия модалки через Cancel
const todoElement = document.querySelector('.todo-todo') //контейнер для todo в todo

// Открытие модального окна, для добавления toodo
addTodoElement.addEventListener('click', function (event) {
    addPopupElement.style.cssText = 'opacity: 1; visibility: visible;'
})

// Отправляем форму для добавления toodo
formElement.addEventListener('submit', handleSubmitForm)
function handleSubmitForm(event) {
    event.preventDefault()

    const title = addTitleElement.value
    const description = addDescriptionElement.value
    const user = userElement.value
    const todo = new Todo(title, description, user)
    // const todos = structuredClone(state.todos)
    state.todos.push(todo)
    setDataToStorage(state.todos)
    render(state.todos)
    // setState({ todos })
    formElement.reset()

    // Закрытие модального окна, для добавления toodo
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
}

// Закрытие модального окна через Cancel
closePopupElement.addEventListener('click', function (event) {
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
})

// Сохранение в localStorage
function getDataFromStorage() {
    const data = localStorage.getItem('tasks')

    return data ? JSON.parse(data) : []
}

function setDataToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Создаем шаблон карточки todo
function buildTemplateTodo({ title, description, id, createdAt, user, status }) {
    return `<div class="card" data-id="${id}">
                <form class="card-top">
                    <button class="edit" data-role="edit">EDIT</button>
                    <select name="3" id="status" data-role="status" class="status" data-id="${id}">
                        <option value="todo" id="todo" ${status === 'todo'}>TODO</option>
                        <option value="in-progress" id="in-progress" ${status === 'in-progress'}>IN PROGRESS</option>
                        <option value="done" id="done" ${status === 'done'}>DONE</option>
                    </select>
                    <button class="delete" data-role="remove">DELETE</button>
                </form>
                <div class="card-title">${title}</div>
                <div class="card-description">${description}</div>
                <div class="card-bottom">
                        <div class="user">${user}</div>
                        <div class="timer">${createdAt}</div>
                </div>
            </div>`
}

// Добавляем рендер для отрисовки карточек
function render(todos = []) {
    todoElement.innerHTML = ''

    todos.forEach(todo => {
        const containerTask = document.querySelector(`.todo-${todo.status}`)
        console.log(containerTask)
        if (containerTask) {
            containerTask.innerHTML += buildTemplateTodo(todo)
        }
    })
}