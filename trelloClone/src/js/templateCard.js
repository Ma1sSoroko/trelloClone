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

export {buildTemplateTodo}