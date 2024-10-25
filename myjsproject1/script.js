document.addEventListener("DOMContentLoaded",()=> {
    const todo = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => renderTask(task));
    
    addTaskBtn.addEventListener("click",()=> {
        const taskText = todo.value.trim();
        if (taskText === "") return;
    
        const newTask = {
            id : Date.now(),
            text : taskText,
            completed : false
        }
        tasks.push(newTask);
        renderTask( newTask)
        saveTask();
        todo.value = "";
    }
    );
    
    function renderTask(task){
        const li = document.createElement("li");
        li.setAttribute("data-id",task.id); 
        if (task.completed ) li.classList.add("completed");
        li.innerHTML = `
        <span>${task.text}</span>
        <button> delete </button>`
        li.addEventListener("click",(e) =>{
            if (e.target.tagName === 'BUTTON') return;
            task.completed != task.completed;
            li.classList.toggle("completed");
            saveTask(); // here we are calling saveTask function to save updated tasks array in local storage.  // whenever we update task we need to save the updated array in local storage.  // whenever we load the page, we will fetch the tasks from local storage and render them.  // whenever we add a new task, we will add it to the array and then save it in local storage.  // whenever we delete a task, we will remove it from the array and then save it
        });
        li.querySelector("button").addEventListener("click",(e) => {
            e.stopPropagation(); // prevent toggle from firingg 
             // remove the li element from DOM  // when we delete a task, we will remove it from the DOM and then also remove it from the tasks array in memory.  // we will not save the updated tasks array in local storage, because we will not have the reference to the removed task.  // instead, we will filter out the task from the tasks array that has the same id as the one that was clicked.  // then we will save the updated tasks array
            tasks = tasks.filter(t => t.id!== task.id);
            li.remove();
            saveTask(); // here we are calling saveTask function to save updated tasks array in local storage.  // whenever we delete a task, we will remove it from the DOM and then also remove it from the tasks array in memory.  // we will not save the updated tasks array in local storage, because we will not have the reference to the removed task.  // instead, we will filter out the task from the tasks array that has the same id as the one that was clicked.

        });
        todoList.appendChild(li);
    }
    function saveTask(){
        localStorage.setItem("tasks", JSON.stringify(tasks)); //key value pair here we are converting tasks array into string using json.stringify
    
    }
});