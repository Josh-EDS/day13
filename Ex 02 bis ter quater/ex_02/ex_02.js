document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.querySelector('.list-container ul'); // Target the <ul> element

    // Function to fetch and display tasks from the API
    const fetchTasks = () => {
        fetch('http://localhost:3000/api/v1/todo') // Replace with your actual API URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                taskList.innerHTML = ''; // Clear the list before appending new tasks
                data.todo.forEach(task => { // Adjust based on your API structure
                    const li = document.createElement('li');
                    li.textContent = task.name; // Assuming task has a 'name' property
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';

                    li.appendChild(editButton);
                    li.appendChild(deleteButton);
                    taskList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching tasks:', error));
    };

    fetchTasks(); // Fetch tasks on page load
});
