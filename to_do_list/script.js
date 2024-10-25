document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('tasks');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            saveTasks();
            renderTasks();
        });

        li.appendChild(deleteButton);
        return li;
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    };

    addTaskButton.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            saveTasks();
            taskInput.value = '';
            renderTasks();
        }
    });

    renderTasks(); // Initial rendering of saved tasks
});
