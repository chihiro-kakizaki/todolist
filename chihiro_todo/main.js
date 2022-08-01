document.addEventListener('DOMContentLoaded', function() {
    const taskSubmitButton = document.querySelector('#task_submit');
    const todoArea = document.querySelector('#todo_area');
    const doingArea = document.querySelector('#doing_area');
    const doneArea = document.querySelector('#done_area');
    const selectedPersonId = document.querySelector('#person_select');
    const personSubmitButton = document.querySelector('#person_submit');
    const personListArea = document.querySelector('#person_list_area');

    // taskをデータとして管理する変数
    let taskList = [];

    //担当者をデータとして管理する変数
    let personList = [{ id: "1", name: "柿崎"}, {id: "2", name: "柴田"}, {id: "3", name: "黒澤"}];

    
    // タスクを追加する関数
    const addTask = function(newTaskTitle, selectedPersonId) {
        if(newTaskTitle === '') return; // 何も入力されてなかったら処理終了
        const newTaskId = new Date().getTime().toString()
        const newTask = { id: newTaskId, title:newTaskTitle, status:0, personId: selectedPersonId }
        taskList.push(newTask); // 新しいタスクを配列の最後に追加
        appendTask(newTask);
    }

    // 担当者を追加する関数
    const addPerson = function(newPersonName) {
        if(newPersonName === '') return;
        const newPersonId = new Date().getTime().toString();
        const newPerson = { id: newPersonId, name: newPersonName }
        personList.push(newPerson);
        appendPerson(newPerson);
        selectPersonBox(newPerson);
    }

    // タスクを削除する関数
    const deleteTask = (taskId) => {
        const task = taskList.find( task => task.id === taskId);
        const deleteTargetElm = document.querySelector('#task_' + taskId);
        if (task.status === 0) {
            todoArea.removeChild(deleteTargetElm);
        }
        if (task.status === 1) {
            doingArea.removeChild(deleteTargetElm);
        }
        if (task.status === 2) {
            doneArea.removeChild(deleteTargetElm);
        }
        taskList = taskList.filter(task => task.id !== taskId); // 削除対象の配列のindexを除いてtaskListを上書き
    }
    const changeStatus = (taskId, newStatus) => {
        const deleteTargetElm = document.querySelector('#task_' + taskId);
        
        const task = taskList.find( task => task.id === taskId);
        if (task.status === 0) {
            todoArea.removeChild(deleteTargetElm);
        }
        if (task.status === 1) {
            doingArea.removeChild(deleteTargetElm);
        }
        if (task.status === 2) {
            doneArea.removeChild(deleteTargetElm);
        }
        task.status = newStatus;
        appendTask(task);
    }

    const appendTask = function(task) {
        newTaskElm = document.createElement('li');
        newTaskElm.setAttribute("id", "task_" + task.id);
        newTaskElm.textContent = task.title;
        if (task.status === 0) {
            todoArea.appendChild(newTaskElm);
        }
        if (task.status === 1) {
            doingArea.appendChild(newTaskElm);
        }
        if (task.status === 2) {
            doneArea.appendChild(newTaskElm);
        }
        
        if (task.status !== 0) {
            const todoButton = document.createElement('button');
            todoButton.textContent = 'todo';
            todoButton.addEventListener('click', function() {
                changeStatus(task.id, 0);
            })
            newTaskElm.appendChild(todoButton);
        }
        if (task.status !== 1) {
            const doingButton = document.createElement('button');
            doingButton.textContent = 'doing';
            doingButton.addEventListener('click', function() {
                changeStatus(task.id, 1);
            })
            newTaskElm.appendChild(doingButton);
        }
        if (task.status !== 2) {
            const doneButton = document.createElement('button');
            doneButton.textContent = 'done';
            doneButton.addEventListener('click', function() {
                changeStatus(task.id, 2);
            })
            newTaskElm.appendChild(doneButton);
        }
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id);
        })
        newTaskElm.appendChild(deleteButton);
        
        const person = personList.find(person => person.id === task.personId);
        taskPersonElm = document.createElement('span');
        taskPersonElm.textContent = person.name;
        newTaskElm.appendChild(taskPersonElm);
    }

    const appendDefaultPerson = function() {
        personList.forEach((person) => {
            appendPerson(person);
        });
    }

    const appendPerson = function(person) {
        appendPersonElm = document.createElement('li');
        appendPersonElm.setAttribute("id", "person_" + person.id);
        appendPersonElm.textContent = person.name
        personListArea.appendChild(appendPersonElm);

        deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', function() {
            deletePerson(person.id);
        })
        appendPersonElm.appendChild(deleteButton);
    }
    
    
    const selectPersonBox = (person) => {
        appendPersonSelectElm = document.createElement('option');
        appendPersonSelectElm.setAttribute("id", "select_person_" + person.id)
        appendPersonSelectElm.value = person.id;
        appendPersonSelectElm.textContent = person.name;
        selectedPersonId.appendChild(appendPersonSelectElm);
    }
    
    const defaultSelectPersonBox = () => {
        personList.forEach((person) => {
            selectPersonBox(person);
        });
    }

    //担当者を削除する関数
    const deletePerson = (personId) => {
        const task = taskList.find(task => task.personId === personId);
        if (task) {
            alert ('担当者のタスクがあるため削除できません')
            return ;
        }
        const deletePersonElm = document.querySelector('#person_' + personId);
        const deleteSelectPersonElm = document.querySelector('#select_person_' + personId);
        personListArea.removeChild(deletePersonElm);
        selectedPersonId.removeChild(deleteSelectPersonElm);
        personList = personList.filter(person => person.id !== personId);
    }

    taskSubmitButton.addEventListener('click', function() {
        const newTask = document.querySelector('#task_value');
        addTask(newTask.value, selectedPersonId.value);
        newTask.value = '';
    });

    defaultSelectPersonBox();

    personSubmitButton.addEventListener('click', function() {
        const newPersonName = document.querySelector('#person_name');
        addPerson(newPersonName.value);
        newPersonName.value = '';
    });

    appendDefaultPerson();
});

