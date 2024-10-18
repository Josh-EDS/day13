document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('results-textarea');
    const newTask = { title: taskInput.value, content: '', done: false };
    
    // Send POST request to create a new task
    await fetch('http://localhost:3000/api/v1/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: newTask }),
    });

    taskInput.value = ''; // Clear the input field
    fetchTasks(); // Refresh the task list
});

// Fetch and display tasks
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/api/v1/todo');
    const data = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks
    data.todo.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.title} <button>Edit</button> <button>Delete</button>`;
        taskList.appendChild(li);
    });
};

// Initial fetch to load tasks
fetchTasks();
