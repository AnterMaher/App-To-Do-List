// Get Element
const taskInput = <HTMLInputElement>document.getElementById('task-input');
const addTask = <HTMLButtonElement>document.getElementById('add-task-btn');
const searchInput=<HTMLInputElement>document.getElementById('search-input');
const searchBtn=<HTMLButtonElement>document.getElementById('search-btn')
const todoList=<HTMLUListElement>document.querySelector('.todo-list');
// type array tasks
interface typesTasks {
    id: number;
    text: string;
    completed: boolean;
}
// mode btn edit &add
type modeBtnEdit = 'edit' | 'create';
let currentMode: modeBtnEdit = 'create';
// array save  data task
let Tasks: typesTasks[] = [];
if (localStorage.getItem("tasks")) {
    Tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
} else {
    Tasks = [];
}
let index:number=Tasks.length;

addTask.addEventListener('click', () => {
    // create obj is task
    const newTask: typesTasks = {
        id: Tasks.length,
        text: taskInput.value,
        completed: false,
    }
    if (taskInput.value !== '') {
        Tasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(Tasks))
        taskInput.value = ``;
        renderTasks();
        showAddSuccess()
    }

})


// function render task
function renderTasks() {
    const taskLists = <HTMLUListElement>document.querySelector('.todo-list');
    let items = '';
    if (Tasks.length === 0) {
        items = `
            <div class="empty-state">
                <span>
                <img src="assets/image/To do list-rafiki.svg" alt="To Do List Illustration" width="400">
                </span>
                <h3>No tasks yet</h3>
                <p>Add your first task above to get started!</p>
            </div>
        `;

    }else{
        Tasks.forEach((item, index) => {
        items += `
            <div class="task-item">
            <div class="task-container">
            <input type="checkbox" ${item.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            <label id="task-${item.id}">${item.text}</label>
            </div>
            <div class="task-actions">
            <button class="btn-edit" onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
            <button class="btn-delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
            </div>`;
        });
    }

    if (taskLists) {
        taskLists.innerHTML = items;
    }
}
renderTasks();



// function delete task
function deleteTask(i:number):void{
    Tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(Tasks));
    renderTasks();
}

// function delete all task
const deleteAll = <HTMLButtonElement>document.getElementById('delete-all');
deleteAll.addEventListener('click', ():void => {
    Tasks = [];
    localStorage.setItem('tasks', JSON.stringify(Tasks));
    renderTasks();
})

// function edit task
function editTask(this: any, i: number): void {
    const taskLists = <HTMLUListElement>document.querySelector('.todo-list');
    let items =''
    
    for(let j=0;j<Tasks.length;j++){
        if(j==i){
            items += `
            <div class="task-item">
            <div class="task-container">
                <input type="checkbox" ${Tasks[j].completed ? 'checked' : ''} onclick="toggleTask(${j})">
                <input type="text" value="${Tasks[j].text}" id="task-${Tasks[j].id}">
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="SaveEdit(${j})"><i class="fas fa-check"></i></button>
                <button class="btn-delete" onclick="deleteTask(${j})"><i class="fas fa-trash"></i></button>
            </div>
            </div>`
        }else{
            items += `
            <div class="task-item">
            <div class="task-container">
                <input type="checkbox" ${Tasks[j].completed ? 'checked' : ''} onclick="toggleTask(${j})">
                <label id="task-${Tasks[j].id}">${Tasks[j].text}</label>
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="SaveEdit(${j})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteTask(${j})"><i class="fas fa-trash"></i></button>
            </div>
            </div>`
        }
    }
    taskLists.innerHTML = items;
}

function SaveEdit(j:number):void{
    const newTask:typesTasks = {
        id:Tasks[j].id,
        text:(document.getElementById(`task-${Tasks[j].id}`) as HTMLInputElement)?.value,
        completed:false,
    }
    if(newTask.text !== ''){
    Tasks[j]=newTask;
    localStorage.setItem('tasks',JSON.stringify(Tasks));
    renderTasks();
    showEditSuccess();
}
}
// function showEditSuccess
function showEditSuccess():void {
    const alert = document.createElement('div');
    alert.classList.add('alert-success');
    alert.innerHTML = `
    <div class="toast active">
        <div class="toast-content">
        <i class="fas fa-solid fa-check check"></i>
        <div class="message">
            <span class="text text-1">Success</span>
            <span class="text text-2">Task edited successfully</span>
        </div>
        </div>
        <div class="progress active"></div>
    </div>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 5000);
}
// showAddSuccess
function showAddSuccess():void {
    const alert = document.createElement('div');
    alert.classList.add('alert-success');
    alert.innerHTML = `
    <div class="toast active">
        <div class="toast-content">
          <i class="fas fa-solid fa-check check"></i>
          <div class="message">
            <span class="text text-1">Success</span>
            <span class="text text-2">Task added successfully</span>
          </div>
        </div>
        <div class="progress active"></div>
    </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 5000);
}