// // Select elements
// const addTaskButton = document.getElementById('add-task');
// const taskInput = document.getElementById('task-input');
// const priorityInput = document.getElementById('priority');
// const taskTableBody = document.querySelector('#task-table tbody');
// const completedTasksEl = document.getElementById('completed-tasks');
// const pendingTasksEl = document.getElementById('pending-tasks');
// const themeToggle = document.getElementById('theme-toggle');

// let taskId = 0; // Counter for task IDs

// // Add a new task
// addTaskButton.addEventListener('click', () => {
//     const taskText = taskInput.value.trim();
//     const priority = priorityInput.value;

//     if (!taskText) {
//         alert('Please enter a task!');
//         return;
//     }

//     taskId++;
//     const row = document.createElement('tr');
//     row.innerHTML = `
//         <td>${taskId}</td>
//         <td>${taskText}</td>
//         <td>${getPriorityLabel(priority)}</td>
//         <td>
//             <button class="complete-btn">✔️</button>
//             <button class="delete-btn">❌</button>
//         </td>
//     `;

//     taskTableBody.appendChild(row);
//     taskInput.value = '';
//     updateStats();
// });

// // Handle edit button click
// document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('edit-btn')) {
//         const row = event.target.closest('tr'); // Get the closest row to the clicked button
//         const taskNameCell = row.querySelector('.task-name'); // Get the task name cell

//         // Make the task name editable
//         taskNameCell.contentEditable = true;
//         taskNameCell.style.backgroundColor = '#fff';  // Optional: Highlight the editable area

//         // Change the Edit button to a Save button
//         event.target.textContent = '💾'; // Change to Save icon
//         event.target.classList.remove('edit-btn');
//         event.target.classList.add('save-btn');
//     } 
//     // Handle save button click
//     else if (event.target.classList.contains('save-btn')) {
//         const row = event.target.closest('tr'); // Get the closest row to the clicked button
//         const taskNameCell = row.querySelector('.task-name'); // Get the task name cell

//         // Disable editing
//         taskNameCell.contentEditable = false;
//         taskNameCell.style.backgroundColor = '';  // Reset the background color

//         // Change the Save button back to an Edit button
//         event.target.textContent = '✏️'; // Change to Edit icon
//         event.target.classList.remove('save-btn');
//         event.target.classList.add('edit-btn');
//     }
// });


// // Update statistics
// function updateStats() {
//     const totalTasks = document.querySelectorAll('#task-table tbody tr').length;
//     const completedTasks = document.querySelectorAll('#task-table .completed').length;
//     completedTasksEl.textContent = completedTasks;
//     pendingTasksEl.textContent = totalTasks - completedTasks;
// }

// // Get priority label
// function getPriorityLabel(priority) {
//     switch (priority) {
//         case '1':
//             return '🔥 High';
//         case '2':
//             return '✏️ Medium';
//         case '3':
//             return '🛌 Low';
//         default:
//             return '';
//     }
// }

// // Toggle theme
// themeToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
//     themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
// });


document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority');
    const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];

    let taskCounter = 1;  // To track task numbers

    // Function to update task stats
    function updateTaskStats() {
        const completedTasks = document.querySelectorAll('.completed').length;
        const pendingTasks = taskTable.rows.length - completedTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
        document.getElementById('pending-tasks').textContent = pendingTasks;
    }

    // Function to create a new task row
    function addTaskRow(taskText, priorityLevel) {
        const row = taskTable.insertRow();
        row.setAttribute('data-task-id', taskCounter);

        // Task number
        const taskNumberCell = row.insertCell(0);
        taskNumberCell.textContent = taskCounter;

        // Task name
        const taskNameCell = row.insertCell(1);
        taskNameCell.textContent = taskText;
        taskNameCell.classList.add('task-name');

        // Priority
        const priorityCell = row.insertCell(2);
        let priorityText = '';
        switch (priorityLevel) {
            case '1': priorityText = '🔥High'; break;
            case '2': priorityText = '⚡ Medium'; break;
            case '3': priorityText = '🌱Low'; break;
        }
        priorityCell.textContent = priorityText;

        // Actions
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `
            <button class="complete-btn">✔️</button>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        `;

        // Increment task counter
        taskCounter++;

        // Update task stats
        updateTaskStats();
    }

    // Handle Add Task Button Click
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const priorityLevel = prioritySelect.value;

        if (taskText) {
            addTaskRow(taskText, priorityLevel);
            taskInput.value = ''; // Clear input field
        }
    });

    // Handle Edit, Complete, Delete Button Clicks
    taskTable.addEventListener('click', function (event) {
        const row = event.target.closest('tr');
        if (row) {
            const taskNameCell = row.querySelector('.task-name');

            // Edit Button
            if (event.target.classList.contains('edit-btn')) {
                taskNameCell.contentEditable = true;
                taskNameCell.style.backgroundColor = '#f1f1f1';
                event.target.textContent = '💾'; // Change to Save icon
                event.target.classList.remove('edit-btn');
                event.target.classList.add('save-btn');
            }

            // Save Edited Task
            if (event.target.classList.contains('save-btn')) {
                taskNameCell.contentEditable = false;
                taskNameCell.style.backgroundColor = '';
                event.target.textContent = '✏️'; // Change back to Edit icon
                event.target.classList.remove('save-btn');
                event.target.classList.add('edit-btn');
            }

            // Complete Button
            if (event.target.classList.contains('complete-btn')) {
                row.classList.toggle('completed');
                updateTaskStats();
            }

            // Delete Button
            if (event.target.classList.contains('delete-btn')) {
                taskTable.deleteRow(row.rowIndex - 1);
                updateTaskStats();
            }
        }
    });
});
