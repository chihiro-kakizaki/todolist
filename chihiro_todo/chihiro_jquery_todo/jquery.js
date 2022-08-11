let underEditedPersonId = undefined;

//新規タスクをタスクリストに表示させる関数
$(function () {
    $('#task_submit').click(function() {
        if($('#task_value').val() === '') return;
        const taskLiElm =$('<li>').text($('#task_value').val()); 
        taskLiElm.appendTo($('#todo_area'));
        const taskPersonSpanElm =$('<span data-task-person-id= '+ $('#person_select option:selected').val() +' >').text($('#person_select option:selected').text());
        taskPersonSpanElm.appendTo(taskLiElm);
        appendButtonByStatus(taskLiElm);
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
        const personId = new Date().getTime().toString()
        const personName = $('#person_name').val()
        const selectPersonElm =$('<option value=' + personId + '>'+ personName +'</option>')
        selectPersonElm.appendTo($('#person_select'));
        appendNewPerson(personName,personId);
    })
});

function appendNewPerson(personName, personId) {
    const newPersonLiElm =$('<li data-person-id= '+ personId +'>')
    newPersonLiElm.appendTo($('#person_list_area'))
    appendPerson(personName,newPersonLiElm)
}

function appendPerson(personName,personLiElm) {
    $('<span>').text(personName).appendTo(personLiElm);
    const editButton =$('<button>').text("edit");
    editButton.appendTo(personLiElm);
    editButton.click(function() {
        appendEditInput(personLiElm,editButton);
    })
    const deleteButton =$('<button>').text("delete");
    deleteButton.appendTo(personLiElm);
    deleteButton.click(deletePerson);
}

//ステータス(todo,doing,done)によってリストの表示するボタンを変更する関数
function appendButtonByStatus(taskLiElm) {
    const taskPersonSpanElm = taskLiElm.children("span")
    const button = $(taskLiElm).find('button')
    button.remove()
    const taskArea = $(taskLiElm).closest('ul')

    if (taskArea[0].id !== "todo_area") {
        const todoButton =$('<button>').text("todo");
        taskPersonSpanElm.before(todoButton);
        todoButton.click(changeToTodo); 
    }

    if (taskArea[0].id !== "doing_area") {
        const doingButton =$('<button>').text("doing");
        taskPersonSpanElm.before(doingButton);
        doingButton.click(changeToDoing);
    }

    if (taskArea[0].id !== "done_area") {
        const doneButton =$('<button>').text("done");
        taskPersonSpanElm.before(doneButton);
        doneButton.click(changeToDone);
    }

    const deleteButton =$('<button>').text("delete");
    taskPersonSpanElm.before(deleteButton)
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

//担当者をPersonListとselectboxから削除する関数
function deletePerson() {
    const personLiElm = $(this).closest('li');
    const personId =personLiElm.data('person-id').toString()
    personLiElm.remove();
    $('#person_select option').each(function() {
        const selectOptionId =$(this).val();
        const targetPersonElm = $(this).closest('option')
        if (selectOptionId === personId) {
           targetPersonElm.remove()
        }
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
    $('<input>').attr('id', 'edit_input').val(beforeEditPersonName).replaceAll(beforeChangePersonElm)
    const beforeChangeDeleteButton = personElm.children().last();
    
    const cancelButton =$('<button>').text("cancel")
    cancelButton.replaceAll(beforeChangeDeleteButton)
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