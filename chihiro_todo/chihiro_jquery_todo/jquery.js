let underEditedPersonId = undefined;

//新規タスクをタスクリストに表示させる関数
$(function () {
    $('#task_submit').click(function() {
        const taskElm =$('<li>').text($('#task_value').val()); 
        taskElm.appendTo($('#todo_area'));
        const selectedPersonElm = $('#person_select option:selected')
        const taskPersonSpanElm =$('<span data-task-person-id= '+ selectedPersonElm.val() +' >').text(selectedPersonElm.text());
        taskPersonSpanElm.appendTo(taskElm);
        appendButtonByStatus(taskElm);
        $('#task_value').val("");
    })
});

//デフォルトの担当者をPersonListに表示させる関数
$(function() {
    $('#person_select option').each(function() {
        appendNewPerson($(this).text(),$(this).val())
    })
})

//新規担当者をPersonListに表示させる関数
$(function() {
    $('#person_submit').click(function() {
        const createValue = new Date().getTime().toString()
        const personName = $('#person_name').val()
        appendNewSelectPerson(personName, createValue);
        appendNewPerson(personName,createValue);
    })
});

function appendNewPerson(personName, createValue) {
    const newPersonElm =$('<li data-person-id= '+ createValue +'>')
    newPersonElm.appendTo($('#person_list_area'))
    appendPerson(personName,newPersonElm)
}

function appendPerson(personName,personElm) {
    const personLiSpanElm =$('<span>').text(personName);
    personLiSpanElm.appendTo(personElm);
    editPersonButton(personElm)
    deletePersonButton(personElm);
    $('#person_name').val("");
}

function appendNewSelectPerson(personName, createValue) {
    const selectPersonElm =$('<option value=' + createValue + '>'+ personName +'</option>')
    selectPersonElm.appendTo($('#person_select'));
}

//ステータス(todo,doing,done)によってリストの表示するボタンを変更する関数
function appendButtonByStatus(taskElm) {
    const taskPersonElm = taskElm.children("span")
    const button = $(taskElm).find('button')
    button.remove()
    const taskArea = $(taskElm).closest('ul')

    if (taskArea[0].id !== "todo_area") {
        const todoButton =$('<button>').text("todo");
        taskPersonElm.before(todoButton);
        todoButton.click(changeToTodo); 
    }

    if (taskArea[0].id !== "doing_area") {
        const doingButton =$('<button>').text("doing");
        taskPersonElm.before(doingButton);
        doingButton.click(changeToDoing);
    }

    if (taskArea[0].id !== "done_area") {
        const doneButton =$('<button>').text("done");
        taskPersonElm.before(doneButton);
        doneButton.click(changeToDone);
    }

    const deleteButton =$('<button>').text("delete");
    taskPersonElm.before(deleteButton)
    deleteButton.click(deleteTask);
}

//タスクのステータスをtodoに変更する関数
function changeToTodo() {
    const targetTaskElm = $(this).closest('li');
    targetTaskElm.appendTo($('#todo_area'))
    appendButtonByStatus(targetTaskElm);
}

//タスクのステータスをdoingに変更する関数
function changeToDoing() {
    const targetTaskElm = $(this).closest('li');
    targetTaskElm.appendTo($('#doing_area'));
    appendButtonByStatus(targetTaskElm);
}

//タスクのステータスをdoneに変更する関数
function changeToDone() {
    const targetTaskElm =$(this).closest('li');
    targetTaskElm.appendTo($('#done_area'));
    appendButtonByStatus(targetTaskElm);
}

//タスクを削除する関数
function deleteTask() {
    const targetTaskElm = $(this).closest('li');
    targetTaskElm.remove();
}

//担当者に削除ボタンを付与する関数
function deletePersonButton(personElm) {
    const deleteButton =$('<button>').text("delete");
    deleteButton.appendTo(personElm);
    deleteButton.click(deletePerson);
}

//担当者をPersonListとselectboxから削除する関数
function deletePerson() {
    const personLiElm = $(this).closest('li');
    const personLiId =personLiElm.data('person-id').toString()
    personLiElm.remove();
    $('#person_select option').each(function() {
        const selectOptionId =$(this).val();
        const targetPersonElm = $(this).closest('option')
        if (selectOptionId === personLiId) {
           targetPersonElm.remove()
        }
    })
}

//担当者に編集ボタンを付与する関数
function editPersonButton(personElm) {
    const editButton =$('<button>').text("edit");
    editButton.appendTo(personElm);
    editButton.click(function() {
        appendEditInput(personElm,editButton);
    })
}

function appendEditInput(personElm, editButton) {
    const beforeChangePersonElm = personElm.children("span")
    const beforeEditPersonName = beforeChangePersonElm.text()
    if (underEditedPersonId !== undefined) {
        $('#person_list_area li').each(function() {
            if (($(this).data('person-id') === underEditedPersonId)) {
            const cancelEditPersonElm = $(this)
            cancelEditPerson(cancelEditPersonElm.children("span").text(), cancelEditPersonElm)
            }
        })
    }
    underEditedPersonId = personElm.data('person-id');
    const editPersonInput =$('<input>').attr('id', 'edit_input')
    editPersonInput.val(beforeEditPersonName);
    editPersonInput.replaceAll(beforeChangePersonElm)
    const beforeChangedeleteButton = personElm.children().last();
    
    const cancelButton =$('<button>').text("cancel")
    cancelButton.replaceAll(beforeChangedeleteButton)
    cancelButton.click(function() {
        cancelEditPerson(beforeEditPersonName, personElm);
    })
    const saveButton =$('<button>').text("save")
    saveButton.replaceAll(editButton);
    saveButton.click(function() {
        const newPersonName = $('#edit_input').val()
        personElm.children().remove();
        appendPerson(newPersonName, personElm);
        underEditedPersonId = undefined;
        
        const personLiId = personElm.data('person-id').toString();
        $('#person_select option').each(function() {
            const selectPersonId = ($(this));
            if (personLiId === selectPersonId.val()) {
                selectPersonId.text(newPersonName);
            }
        })
        $('#todo_area li, #doing_area li, #done_area li').each(function() {
            const taskPersonName= ($(this).children("span"));
            const taskPersonId = taskPersonName.data('task-person-id').toString();
            if (personLiId === taskPersonId) {
                taskPersonName.text(newPersonName);
            }
        })
    });
}

function cancelEditPerson(beforeEditPersonName, personElm) {
    personElm.children().remove();
    appendPerson(beforeEditPersonName, personElm)
    underEditedPersonId = undefined;
}