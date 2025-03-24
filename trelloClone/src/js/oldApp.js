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
const statusElement = document.querySelector('#status')
const inProgressElement = document.querySelector('.todo-in-progress')
const doneElement = document.querySelector('.todo-done')
// const editElement = document.querySelector('.edit')
render(state.todos)
counterTodo()

// Класс конструктор
class Todo {
    id = Date.now()
    createdAt = new Date().toString()

    constructor(title, description, user) {
        this.title = title
        this.description = description
        this.user = user
        this.status = status
    }
}

// Придаем дате понятный вид
function prepareDate(date) {
    return new Date(date).toLocaleTimeString('ru-RU')
}

// Объеденяем сохранение и рендер в 1 функцию
function setState(newState = {}) {
    state = { ...state, ...newState }
    render(state.todos)
    setDataToStorage(state.todos)
    counterTodo()
}

// Создаем шаблон карточки todo
function buildTemplateTodo({ title, description, id, createdAt, user, status }) {
    const date = prepareDate(createdAt)
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

    let title = addTitleElement.value
    let description = addDescriptionElement.value
    let user = userElement.value
    // let status = statusElement
    const todo = new Todo(title, description, user, status)
    const todos = structuredClone(state.todos)
    todos.push(todo)
    setState({ todos })
    formElement.reset()
    
    // Закрытие модального окна, для добавления toodo
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
}

// // Открытие модального окна, для редактирования toodo
todoElement.addEventListener('click', function ({ target }) {
    event.preventDefault()
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
    if (confirm('Вы уверены, что хотите удалить ВСЕ?')) {
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
    return data 
}
function setDataToStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// // Счетчик todo
function counterTodo() {
    document.getElementById("todo-title-counter").innerHTML = state.todos.length
}

// Перемещение карточек в другие состояния
const selectElement = document.getElementById('status')
todoElement.addEventListener('change', handleChange)
function handleChange(event) {
    const selectedValue = event.target.value
    const target = event.target
    if (target.classList.contains('status')) {
        const id = target.dataset.id

        const todoStatus = state.todos.find(todo => todo.id == id)
        
        if (todoStatus) {
            todo.status = selectedValue
            setDataToStorage(state.todo)
        }
    }
}

// function handleTaskStatusChange(event) {
//     const target = event.target
//     if (target.classList.contains('task-status-select')) {
//         const id = target.dataset.id
//         const newStatus = event.target.value

//         if (newStatus === "progress" && state.tasks.filter(task => task.status === 'progress').length >= 2) {
//             openWarningModal()
//             target.value = state.tasks.find(task => task.id == id)?.status || 'task'
//             return
//         }

//         const task = state.tasks.find(task => task.id == id)
        
//         if (task) {
//             task.status = newStatus
//             setDataToStorage(state.tasks)
//             render(state.tasks)
//             updateCount()
//         }
//     }
// }
