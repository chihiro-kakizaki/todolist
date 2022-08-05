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

    // 編集中のpersonIdを管理する変数
    let underEditedPersonId = undefined;

    // タスクを追加する関数
    const addTask = (newTaskTitle, selectedPersonId) => {
        if(newTaskTitle === '') return; // 何も入力されてなかったら処理終了
        const newTaskId = new Date().getTime().toString()
        const newTask = { id: newTaskId, title:newTaskTitle, status:0, personId: selectedPersonId }
        taskList.push(newTask); // 新しいタスクを配列の最後に追加
        appendTask(newTask);
    }

    // 担当者を追加する関数
    const addPerson = (newPersonName) => {
        if(newPersonName === '') return;
        const newPersonId = new Date().getTime().toString();
        const newPerson = { id: newPersonId, name: newPersonName }
        personList.push(newPerson);
        appendNewPerson(newPerson);
        appendPersonSelectBox(newPerson);
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

    const appendTask = (task) => {
        const newTaskElm = document.createElement('li');
        const newTaskTitleElm = document.createElement('div')
        newTaskTitleElm.textContent = task.title
        newTaskElm.setAttribute("id", "task_" + task.id);
        newTaskElm.appendChild(newTaskTitleElm)
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
            todoButton.className = 'button task_button'
            todoButton.addEventListener('click', function() {
                changeStatus(task.id, 0);
            })
            newTaskElm.appendChild(todoButton);
        }
        if (task.status !== 1) {
            const doingButton = document.createElement('button');
            doingButton.textContent = 'doing';
            doingButton.className = 'button task_button'
            doingButton.addEventListener('click', function() {
                changeStatus(task.id, 1);
            })
            newTaskElm.appendChild(doingButton);
        }
        if (task.status !== 2) {
            const doneButton = document.createElement('button');
            doneButton.textContent = 'done';
            doneButton.className = 'button task_button'
            doneButton.addEventListener('click', function() {
                changeStatus(task.id, 2);
            })
            newTaskElm.appendChild(doneButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.className = 'button delete_button'
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id);
        })
        newTaskElm.appendChild(deleteButton);
        
        const person = personList.find(person => person.id === task.personId);
        const taskPersonElm = document.createElement('span');
        taskPersonElm.textContent = person.name;
        newTaskElm.appendChild(taskPersonElm);
    }
    
    const appendDefaultPerson = () =>  {
        personList.forEach((person) => {
            appendNewPerson(person);
        });
    }

    const appendNewPerson = (person) => {
        const appendPersonElm = document.createElement('li');
        appendPersonElm.setAttribute("id", "person_" + person.id);
        appendPerson(person, appendPersonElm);
        personListArea.appendChild(appendPersonElm);
    }

    const appendPerson = (person, parentElm) => {
        const appendPersonNameElm = document.createElement('div');
        appendPersonNameElm.textContent = person.name
        parentElm.appendChild(appendPersonNameElm)
        
        const editButton = document.createElement('button');
        editButton.setAttribute("id", "edit_button_" + person.id);
        editButton.textContent = '編集';
        editButton.className = 'button edit_button';
        editButton.addEventListener('click', function() {
            appendEditInput(person.id);
        })
        parentElm.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute("id", "delete_button_" + person.id);
        deleteButton.textContent = '削除';
        deleteButton.className = 'button delete_button';
        deleteButton.addEventListener('click', function() {
            deletePerson(person.id);
        })
        parentElm.appendChild(deleteButton);
    }

    const appendPersonSelectBox = (person) => {
        const newPersonSelectElm = document.createElement('option');
        newPersonSelectElm.setAttribute("id", "select_person_" + person.id);
        newPersonSelectElm.value = person.id;
        newPersonSelectElm.textContent = person.name;
        selectedPersonId.appendChild(newPersonSelectElm);
    }
    
    const appendDefaultPersonSelectBox = () => {
        personList.forEach((person) => {
            appendPersonSelectBox(person);
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
    
    const appendEditInput = (personId) => {
        if (underEditedPersonId !== undefined) {
            cancelEditPerson(underEditedPersonId);
        }
        underEditedPersonId = personId;
        const person = personList.find(person => person.id === personId);
        const beforeChangeElm = document.querySelector('#person_' + personId);
        const personNameBeforeChengeElm = beforeChangeElm.querySelector('div');
        const appendEditInputElm = document.createElement('input');
        appendEditInputElm.className = "input";
        appendEditInputElm.value = person.name;
        beforeChangeElm.replaceChild(appendEditInputElm, personNameBeforeChengeElm);
        const editButton = document.querySelector('#edit_button_' + person.id);
        const saveButton = document.createElement('button');
        saveButton.setAttribute("id", "save_button_" + personId);
        saveButton.className = 'button save_button'
        saveButton.textContent = "保存"
        beforeChangeElm.replaceChild(saveButton, editButton);
        saveButton.addEventListener('click', function() {
            savePerson(personId, appendEditInputElm.value);
        })
        const deleteButton = document.querySelector('#delete_button_' + person.id)
        const cancelButton = document.createElement('button');
        cancelButton.className = 'button cancel_button';
        cancelButton.textContent = "キャンセル";
        beforeChangeElm.replaceChild(cancelButton, deleteButton);
        cancelButton.addEventListener('click', function() {
            cancelEditPerson(person.id);
        })
    }

    const cancelEditPerson = (cancelEditPersonId) => {
        const person = personList.find(person => person.id === cancelEditPersonId);
        const targetLiElm = document.querySelector('#person_' + cancelEditPersonId);
        while (targetLiElm.firstChild) {
            targetLiElm.removeChild(targetLiElm.firstChild);
        }
        appendPerson(person, targetLiElm);
        underEditedPersonId = undefined;
    } 
    
    const savePerson = (personId, enteredPersonName) => {
        if (enteredPersonName === "") {
            return ;
        }
        const person = personList.find(person => person.id === personId)
        person.name = enteredPersonName;
        const changedPersonElm = document.querySelector('#person_' + person.id)
        const personInputElm = changedPersonElm.querySelector('input')
        const personDivElm = document.createElement('div');
        personDivElm.textContent = enteredPersonName;
        changedPersonElm.replaceChild(personDivElm, personInputElm)
        console.log(changedPersonElm)
        const appendEditSelectPersonElm = document.querySelector('#select_person_' + personId);
        appendEditSelectPersonElm.textContent = enteredPersonName;
        while (changedPersonElm.firstChild) {
            changedPersonElm.removeChild(changedPersonElm.firstChild);
        }
        appendPerson(person, changedPersonElm);
        // personに紐づくtaskの担当者名を変更
        const task = taskList.filter(task => task.personId === personId);
        for (let i = 0; i < task.length; i++){
            const editTaskElm = document.querySelector('#task_' + task[i].id).querySelectorAll('span');
            editTaskElm[0].textContent = enteredPersonName;
        }
    }
    
    taskSubmitButton.addEventListener('click', function() {
        const newTask = document.querySelector('#task_value');
        addTask(newTask.value, selectedPersonId.value);
        newTask.value = '';
    });

    appendDefaultPersonSelectBox();

    personSubmitButton.addEventListener('click', function() {
        const newPersonName = document.querySelector('#person_name');
        addPerson(newPersonName.value);
        newPersonName.value = '';
    });

    appendDefaultPerson();
});
