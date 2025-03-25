// Класс конструктор
class Todo {
    id = Date.now()
    createdAt = new Date().toLocaleTimeString()

    constructor(title, description, user, status = 'todo') {
        this.title = title
        this.description = description
        this.user = user
        this.status = status
    }
}

export { Todo }