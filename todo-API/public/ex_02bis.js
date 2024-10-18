document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const form = document.querySelector('form');
    
    function fetchTasks() {
        fetch('/api/v1/todo')
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = '';
                data.todo.forEach(task => {
                    const li = document.createElement('li');
                    li.textContent = task.title;
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.onclick = () => editTask(task.id);
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteTask(task.id);
                    li.appendChild(editButton);
                    li.appendChild(deleteButton);
                    taskList.appendChild(li);
                });
            });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = document.getElementById('results-textarea').value;
        fetch('/api/v1/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTask })
        })
        .then(response => {
            if (response.ok) {
                fetchTasks();
                document.getElementById('results-textarea').value = '';
            }
        });
    });

    function deleteTask(id) {
        fetch(`/api/v1/todo/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchTasks();
            }
        });
    }

    fetchTasks();
});
