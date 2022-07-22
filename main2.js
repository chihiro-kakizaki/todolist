const taskSubmit = document.querySelector('.task_submit');
const taskList = document.querySelector('.task_list');


taskSubmit.addEventListener('click', function() {
    const taskValue = document.querySelector('.task_value');
    const list = document.createElement('li');
    list.textContent = taskValue.value;
    taskList.appendChild(list);
    taskValue.value = "";
});