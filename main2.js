const taskSubmit = document.querySelector('#task_submit');
const taskList = document.querySelector('#task_list');


taskSubmit.addEventListener('click', function() {
    const taskValue = document.querySelector('#task_value');
    const list = document.createElement('li');
    list.textContent = taskValue.value;
    taskList.appendChild(list);
    taskValue.value = "";

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'delete';
    list.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        const deletetask = deleteButton.closest('li');
        taskList.removeChild(deletetask);
    });
});
