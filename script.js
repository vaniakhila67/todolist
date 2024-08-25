document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
        });
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.completed ? 'completed' : 'pending');

            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div>
                    <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    const editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText.trim();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            renderTasks(filter);
        });
    });

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Expose functions to global scope for onclick attributes
    window.toggleComplete = toggleComplete;
    window.editTask = editTask;
    window.deleteTask = deleteTask;
});