const taskSubmitButton = document.querySelector('#task_submit');
const taskArea = document.querySelector('#task_area');

// taskをデータとして管理する変数
let taskList = [];

// タスクを追加する関数
const addTask = (newTask) => {
    if(newTask === '') return; // 何も入力されてなかったら処理終了
    taskList.push(newTask); // 新しいタスクを配列の最後に追加
    renderTaskList(); // htmlとして表示する
}

// タスクを削除する関数
const deleteTask = (index) => {
    taskList = taskList.filter((_, i) => i !== index); // 削除対象の配列のindexを除いてtaskListを上書き
    renderTaskList(); // htmlとして表示する
}

// タスクリストをhtml要素にしてul要素配下に挿入する
const renderTaskList = () => {
    const htmlArray = taskList.map((task, i) => `<li>${task}<button onclick="deleteTask(${i})">delete</button></li>`); // 各taskに対してli要素の配列を作成
    const html = htmlArray.join(''); // stringの配列を一つの文字列として結合する
    taskArea.innerHTML = html; // taskArea(ul要素)の子要素として挿入（全上書き）
}

taskSubmitButton.addEventListener('click', function() {
    const newTask = document.querySelector('#task_value');
    addTask(newTask.value);
    newTask.value = '';
});