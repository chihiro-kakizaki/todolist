const taskSubmitButton = document.querySelector('#task_submit');
const todoArea = document.querySelector('#todo_area');
const doingArea = document.querySelector('#doing_area');
const doneArea = document.querySelector('#done_area');


// taskをデータとして管理する変数
let taskList = [];

//担当者をデータとして管理する変数
const personList = [{ id: "1", name: "柿崎"}, {id: "2", name: "柴田"}, {id: "3", name: "黒澤"}];

//プルダウンで選択された担当者と一致するidをpersonListから探し出し、担当者名で返却する関数
const getPersonNameById = (personId) => {
    return personList.find(person => person.id === personId).name;
}

// タスクを追加する関数
const addTask = function(newTask, selectPerson) {
    if(newTask === '') return; // 何も入力されてなかったら処理終了
    taskList.push({ title:newTask, status:0, personId: selectPerson}); // 新しいタスクを配列の最後に追加
    renderTaskList(); // htmlとして表示する
}

// タスクを削除する関数
const deleteTask = (index) => {
    taskList = taskList.filter((_, i) => i !== index); // 削除対象の配列のindexを除いてtaskListを上書き
    renderTaskList(); // htmlとして表示する
}

//タスクのステータスをtodoにする関数
const todoTask = (index) => {
    taskList[index].status = 0;
    renderTaskList();
}

//タスクのステータスをdoingにする関数
const doingTask = (index) => {
    taskList[index].status = 1;
    renderTaskList();
}

//タスクのステータスをdoneにする関数
const doneTask = (index) => {
    taskList[index].status = 2;
    renderTaskList();
}

const renderSelectPersonBox = () => {
    for (let person of personList) {
        let op = document.createElement("option");
        op.value = person.id;
        op.text = person.name;
        document.querySelector("#person_select").appendChild(op);
    }
};

// タスクリストをhtml要素にしてul要素配下に挿入する
const renderTaskList = () => {
    todoArea.innerHTML = taskList.map((task, i) => {
        if (task.status === 0) {
            return `<li>${task.title}<button onclick="deleteTask(${i})">delete</button><div><button onclick="doingTask(${i})">doing</button><button onclick="doneTask(${i})">done</button><p>担当者:${getPersonNameById(task.personId)}</p></li></div>`//各taskに対してli要素の配列を作成
        }
        return "";
    }).join('');

    doingArea.innerHTML = taskList.map((task, i) => {
        if (task.status === 1) {
            return `<li>${task.title}<button onclick="deleteTask(${i})">delete</button><div><button onclick="todoTask(${i})">todo</button><button onclick="doneTask(${i})">done</button><p>担当者:${getPersonNameById(task.personId)}</p></li></div>`
        }
        return "";            
    }).join('');

    doneArea .innerHTML = taskList.map((task, i) => {
        if (task.status === 2) {
            return `<li>${task.title}<button onclick="deleteTask(${i})">delete</button><div><button onclick="todoTask(${i})">todo</button><button onclick="doingTask(${i})">doing</button><p>担当者:${getPersonNameById(task.personId)}</p></li></div>`
        }
        return "";
    }).join('');            
}

taskSubmitButton.addEventListener('click', function() {
    const newTask = document.querySelector('#task_value');
    const selectPerson = document.querySelector('#person_select');
    addTask(newTask.value, selectPerson.value);
    newTask.value = '';
});

renderSelectPersonBox();