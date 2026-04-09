let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    
    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
        taskList.innerHTML = filteredTasks.map((task, index) => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-checkbox" onclick="toggleTask(${task.id})">
                    <i class="fas fa-check"></i>
                </div>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn" onclick="editTask(${task.id})" title="Edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }
    
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newText = prompt('Edit task:', task.text);
        if (newText && newText.trim()) {
            task.text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }
}

document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
        addTask(text);
        input.value = '';
    }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderTasks();
    });
});

document.getElementById('clearCompleted').addEventListener('click', function() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
});

document.getElementById('clearAll').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

document.addEventListener('DOMContentLoaded', renderTasks);
