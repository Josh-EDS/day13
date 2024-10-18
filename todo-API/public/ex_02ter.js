function editTask(id) {
    const newTitle = prompt('Enter new task title:');
    if (newTitle) {
        fetch(`/api/v1/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle })
        })
        .then(response => {
            if (response.ok) {
                fetchTasks();
            }
        });
    }
}
