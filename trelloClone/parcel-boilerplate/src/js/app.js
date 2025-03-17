// Переменные
const storageKey = 'todos'
let state = {
    todos: getDataFromStorage()
}
const addTodoElement = document.querySelector('.add-todo')
const addPopupElement = document.querySelector('#popup')
const editPopupElement = document.querySelector('#popup-edit')
const closePopupElement = document.querySelector('.close-popup')
const closePopupEditElement = document.querySelector('.close-popup-edit')
const formElement = document.querySelector('.popup-content')
const addTitleElement = document.querySelector('.add-title')
const deleteAllElement = document.querySelector('.delete-all')
const addDescriptionElement = document.querySelector('#add-description')
const userElement = document.querySelector('#user')
const todoElement = document.querySelector('.todo-todo')
const editElement = document.querySelector('.edit')
render(state.todos)

// Класс конструктор
class Todo {
    id = Date.now()
    createdAt = new Date().toString()

    constructor(title, description, user) {
        this.title = title
        this.description = description
        this.user = user
    }
}

// Придаем дате понятный вид
function prepareDate(date) {
    const dateInstance = new Date(date)
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    return new Intl.DateTimeFormat('ru-RU', options).format(dateInstance)
}

// Объеденяем сохранение и рендер в 1 функцию
function setState(newState = {}) {
    state = { ...state, ...newState }
    render(state.todos)
    setDataToStorage(state.todos)
}

// Создаем шаблон карточки todo
function buildTemplateTodo({ title, description, id, createdAt, user }) {
    const date = prepareDate(createdAt)
    return `<div class="card" data-id="${id}">
                <div class="card-top">
                    <button class="edit" data-role="edit">EDIT</button>
                    <select name="3" id="status">
                        <option value="todo">TODO</option>
                        <option value="in-progress">IN PROGRESS</option>
                        <option value="done">DONE</option>
                    </select>
                    <button class="delete" data-role="remove">DELETE</button>
                </div>
                <div class="card-title">${title}</div>
                <div class="card-description">${description}</div>
                <div class="card-bottom">
                        <div class="user">${user}</div>
                        <div class="timer">${date}</div>
                </div>
            </div>`
}

// Добавляем рендер
function render(todos = []) {
    todoElement.innerHTML = ''
    const html = todos.reduce((acc, todo) => acc + buildTemplateTodo(todo), '')
    todoElement.innerHTML = html
}

// Открытие модального окна, для добавления toodo
addTodoElement.addEventListener('click', function (event) {
    addPopupElement.style.cssText = 'opacity: 1; visibility: visible;'
})

// Закрытие модального окна через Cancel
closePopupElement.addEventListener('click', function (event) {
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
})

// Отправляем форму для добавления toodo
formElement.addEventListener('submit', handleSubmitForm)
function handleSubmitForm(event) {
    event.preventDefault()

    const title = addTitleElement.value
    const description = addDescriptionElement.value
    const user = userElement.value
    const todo = new Todo(title, description, user)
    const todos = structuredClone(state.todos)
    todos.push(todo)
    setState({ todos })
    formElement.reset()

    // Закрытие модального окна, для добавления toodo
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
}

// // Открытие модального окна, для редактирования toodo
todoElement.addEventListener('click', function ({ target }) {
    const { role } = target.dataset
    if (role === 'edit') {
        editPopupElement.style.cssText = 'opacity: 1; visibility: visible;'
    }
})

// // Закрытие модального окна редактирования через Cancel
closePopupEditElement.addEventListener('click', function (event) {
        editPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
})

// Удаляем все todo
deleteAllElement.addEventListener('click', handleClickButtonDeleteAll)
function handleClickButtonDeleteAll() {
    if (    confirm('Вы уверены, что хотите удалить ВСЕ?')) {
    setState({ todos: [] })
    } 
}

// Удаляем одну todo
todoElement.addEventListener('click', handleClickButtonRemove)
function handleClickButtonRemove({ target }) {
    const { role } = target.dataset
    if (role === 'remove') {
        const cardElement = target.closest('.card')
        const { id } = cardElement.dataset
        const newTodos = state.todos.filter((todo) => todo.id !== Number(id))
        setState({ todos: newTodos })
    }
}

// Сохранение в localStorage
function getDataFromStorage() {
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
}
function setDataToStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}