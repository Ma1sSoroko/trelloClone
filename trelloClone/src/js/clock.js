// Часы
function digitalClock() {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    //Добавление ведущих нулей
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    document.getElementById("id-clock").innerHTML = hours + ':' + minutes + ':' + seconds
    setTimeout(digitalClock, 1000)
}
digitalClock()
setInterval(digitalClock, 1000)

export {digitalClock}