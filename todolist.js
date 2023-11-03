const dom = {
    new : document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'),
    count: document.getElementById('count'),
}

const tasks = []; //Массив задач

//Отслеживаем клик по кнопке добавить Добавление задачи
dom.add.onclick = () => {
    const newTaskText = dom.new.value
    if(newTaskText && isNotHaveTask(newTaskText, tasks)){
        addTask(newTaskText, tasks)
        dom.new.value = ""  //При добавлении задачи, мы меняем поле меняем переменную на пустую строку
        tasksRender(tasks)
    }
}
//Функция добавления задачи
function addTask(text, list) {
const timestamp = Date.now() // Метод позволяющий брать уникальное значение времени, которое будет являться нашим id
const task = {
    id: timestamp, 
    text,
    isComplete: false
}
    list.push(task)
    console.log(tasks)
    }


//Функция проверки на совпадение текста с уже существующей задачей
function isNotHaveTask(text, list) {
    let isNotHave = true //Изначально полагаем, что функция нет (отстутсвие = правда)

    list.forEach((task) => {
        if(task.text == text){
            alert('Задачи уже существует!')
            dom.new.value = ""
            isNotHave = false //Если задача есть, то хуярим ей ложь, что отсутствует 
        }
    })  
    return isNotHave
}


// Функция вывода списка задач
function tasksRender(list) {
    let htmlList = ''

    list.forEach((task) => {
        const cls = task.isComplete 
        ? "todo__task todo__task_complete"  //update ot 03.11 tut toje))
        : "todo__task"  // в этом месте я вместо "__" написал "_" нихуя не работало и я час искал ошибку
        const checked  = task.isComplete ? 'checked' : ''

        const taskHtml = `
        <div id="${task.id}" class="${cls}">
            <label class="todo__checkbox" >
                <input type="checkbox" ${checked}>
                <div class = "todo__checkbox-div"></div>
            </label>
            <div class="todo__task-text"> ${task.text}</div>
            <div class="todo__task-del">-</div>
        </div>
        `
        htmlList = htmlList + taskHtml
    })

    dom.tasks.innerHTML = htmlList
    renderTasksCount(list)
}
//Отслеживаем клик по чекбоксу задачи 
dom.tasks.onclick = (event) => {
    const target = event.target 
    
    const isCheckboxEl = target.classList.contains("todo__checkbox-div")
    const isDeleteEl = target.classList.contains("todo__task-del")
    if (isCheckboxEl){
        const task = target.parentElement.parentElement //поднимаемся на два уровня выше
        const taskId = task.getAttribute('id') //получаем айди задачи
        changeTaskStatus(taskId, tasks)
        tasksRender(tasks) // после клика перерендериваем всю страницу
    }
    if (isDeleteEl) {
        const task = target.parentElement //поднимаемся на два уровня выше
        const taskId = task.getAttribute('id') //получаем айди задачи
        deleteTask(taskId, tasks)
        tasksRender(tasks)
    }
}

//Функция изменения статуса задачи
function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if(task.id == id) {
            task.isComplete = !task.isComplete //Возврат противоположного значения
        }
    })
}

// Функция удалении задачи
function deleteTask(id, list) {
    list.forEach((task, idx) => {
        if (task.id == id) {
            list.splice(idx, 1)
        }
    })
}

// Функция подсчета задач
function renderTasksCount(list) {
    dom.count.innerHTML = list.length
}