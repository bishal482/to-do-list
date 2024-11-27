// Select elements
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority');
const taskTableBody = document.querySelector('#task-table tbody');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');
const themeToggle = document.getElementById('theme-toggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add a new task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;

    if (!taskText) {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        priority,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
});

// Render tasks
function renderTasks() {
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="task-name ${task.completed ? 'completed' : ''}" contenteditable="false">${task.text}</td>
            <td>${getPriorityLabel(task.priority)}</td>
            <td>
                <button class="complete-btn">${task.completed ? '❌' : '✔️'}</button>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">❌</button>
            </td>
        `;

        taskTableBody.appendChild(row);

        // Add event listeners
        const completeBtn = row.querySelector('.complete-btn');
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => toggleCompleteTask(task.id));
        editBtn.addEventListener('click', () => editTask(row, task));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
    });

    updateStats();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle task completion
function toggleCompleteTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

// Edit a task
function editTask(row, task) {
    const taskNameCell = row.querySelector('.task-name');

    if (taskNameCell.contentEditable === 'false') {
        taskNameCell.contentEditable = 'true';
        taskNameCell.style.backgroundColor = '#fff';
        taskNameCell.focus();
    } else {
        task.text = taskNameCell.textContent.trim();
        taskNameCell.contentEditable = 'false';
        taskNameCell.style.backgroundColor = '';
        saveTasks();
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Update task statistics
function updateStats() {
    const completedTasks = tasks.filter(task => task.completed).length;
    completedTasksEl.textContent = completedTasks;
    pendingTasksEl.textContent = tasks.length - completedTasks;
}

// Get priority label
function getPriorityLabel(priority) {
    switch (priority) {
        case '1': return '🔥 High';
        case '2': return '⚡ Medium';
        case '3': return '🌱 Low';
        default: return '';
    }
}

// Initialize app
function init() {
    renderTasks();
}

init();

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
