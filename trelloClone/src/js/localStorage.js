// Сохранение в localStorage
function getDataFromStorage() {
    const data = localStorage.getItem('todos')
    return data ? JSON.parse(data) : []
}

function setDataToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

export {
    getDataFromStorage,
    setDataToStorage
}