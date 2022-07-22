const taskValue = document.querySelector('.task_value');
const taskSubmit = document.querySelector('.task_submit');
const taskList = document.querySelector('.task_list');

const addTasks = (task) => {
    const listItem = document.createElement('li');
    const showItem = taskList.appendChild(listItem);
    showItem.innerHTML = task;

    // const deleteButton = document.createElement('button');
    // deleteButton.innerHTML = 'Delete';
    // listItem.appendChild(deleteButton);

    // deleteButton.addEventListener('click', evt => {
    //     evt.preventDefault();
    //     deleteTasks(deleteButton);
    // });
};

// const deleteTasks = (deleteButton) => {
//     const chosenTask = deleteButton.closest('li');
//     taskList.removeChild(chosenTask);
// };

taskSubmit.addEventListener('click', evt => {
    evt.preventDefault();
    const task = taskValue.value;
    addTasks(task);
    taskValue.value = '';
});