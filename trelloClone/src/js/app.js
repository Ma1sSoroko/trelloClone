import { digitalClock } from './clock.js'
import { Todo } from './classTodo.js'
import { buildTemplateTodo } from './templateCard.js'
import {
    getDataFromStorage,
    setDataToStorage
} from './localStorage.js'

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
const deleteAllElement = document.querySelector('.delete-all') //для удаления сразу всех
const closePopupEditElement = document.querySelector('.close-popup-edit') //для закрытия модалки редактирования
const editPopupElement = document.querySelector('#popup-edit') //для закрытия модалки редактирования
const inProgressElement = document.querySelector('.todo-in-progress') //для отрисовки карточек в in-progress
const doneElement = document.querySelector('.todo-done') //для отрисовки карточек в done

render(state.todos) // чтобы при обновлении страницы были видны сохраненные карточки
counterTodo() // чтобы при обновлении страницы было видно количество задач

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
    if (state.todos.length < 3) {
        state.todos.push(todo)
        setState(state.todos)
        formElement.reset()
    } else {
        formElement.reset()
        alert('Вы взяли на себя слишком много задач!')
    }

    // Закрытие модального окна, для добавления toodo
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
}

// Закрытие модального окна через Cancel
closePopupElement.addEventListener('click', function (event) {
    formElement.reset()
    addPopupElement.style.cssText = 'opacity: 0; visibility: hidden;'
})

// Добавляем рендер для отрисовки карточек
function render(todos = []) {
    todoElement.innerHTML = ''
    inProgressElement.innerHTML = ''
    doneElement.innerHTML = ''

    todoElement.innerHTML = ''
    const html = todos.reduce((acc, todo) => acc + buildTemplateTodo(todo), '')
    todoElement.innerHTML = html
}

// Объеденяем сохранение и рендер в 1 функцию
function setState(newState = {}) {
    state = { ...state, ...newState }

    render(state.todos)
    setDataToStorage(state.todos)
    counterTodo()
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

// Удаляем все todo
deleteAllElement.addEventListener('click', handleClickButtonDeleteAll)
function handleClickButtonDeleteAll() {
    if (confirm('Вы уверены, что хотите удалить ВСЕ?')) {
        setState({ todos: [] })
    }
}

// // Счетчик todo
function counterTodo() {
    const countTodo = state.todos.filter(todo => todo.status === 'todo').length
    const countInProgress = state.todos.filter(todo => todo.status === 'in-progress').length
    const countDone = state.todos.filter(todo => todo.status === 'done').length

    document.getElementById("todo-title-counter").innerHTML = countTodo
    document.getElementById("in-progress-counter").innerHTML = countInProgress
    document.getElementById("done-counter").innerHTML = countDone
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
            setDataToStorage(state.todos)
            console.log(todo.status)
        }
    }
}

// Запрет добавления
formElement.addEventListener('submit', handleSubmitFormProhibition)
function handleSubmitFormProhibition() {
    const countTodo = state.todos.filter(todo => todo.status === 'todo').length
    if (countTodo > 3) {
        alert('Вы взяли на себя слишком много задач!')
    }
}