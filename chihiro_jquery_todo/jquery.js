let underEditedPersonId = undefined;

//新規タスクをタスクリストに表示させる関数
$(function () {
    $('#task_submit').click(function() {
        if($('#task_value').val() === '') return;
        const taskLiElm =$('<li>').addClass('list__task-item')
        const taskLiDivElm = $('<div>').addClass('list__task-item--break-all').text($('#task_value').val()); 
        taskLiDivElm.appendTo(taskLiElm);
        taskLiElm.appendTo($('#todo_area'));
        const taskPersonSpanElm =$('<span data-task-person-id= '+ $('#person_select option:selected').val() +' >').addClass('list__task-item--break-all').text($('#person_select option:selected').text());
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
    const newPersonLiElm =$('<li data-person-id= '+ personId +'>').addClass('list__person-item')
    newPersonLiElm.appendTo($('#person_list_area'))
    appendPerson(personName,newPersonLiElm)
}

function appendPerson(personName,personLiElm) {
    $('<span>').addClass('list__person-item--break-all').text(personName).appendTo(personLiElm);
    const editButton =$('<button>').addClass('list__button--edit').text("編集");
    editButton.appendTo(personLiElm);
    editButton.click(function() {
        appendEditInput(personLiElm,editButton);
    })
    const deleteButton =$('<button>').addClass('list__button--delete').text("削除");
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
        const todoButton =$('<button>').addClass('list__button--add').text("todo");
        taskPersonSpanElm.before(todoButton);
        todoButton.click(function() {
            const targetTaskElm = $(this).closest('li');
            targetTaskElm.appendTo($('#todo_area'))
            appendButtonByStatus(targetTaskElm);
        }); 
    }

    if (taskArea[0].id !== "doing_area") {
        const doingButton =$('<button>').addClass('list__button--add').text("doing");
        taskPersonSpanElm.before(doingButton);
        doingButton.click(function() {
            const targetTaskElm = $(this).closest('li');
            targetTaskElm.appendTo($('#doing_area'));
            appendButtonByStatus(targetTaskElm);
        });
    }

    if (taskArea[0].id !== "done_area") {
        const doneButton =$('<button>').addClass('list__button--add').text("done");
        taskPersonSpanElm.before(doneButton);
        doneButton.click(function() {
            const targetTaskElm =$(this).closest('li');
            targetTaskElm.appendTo($('#done_area'));
            appendButtonByStatus(targetTaskElm);
        });
    }

    const deleteButton =$('<button>').addClass('list__button--delete').text("削除");
    taskPersonSpanElm.before(deleteButton)
    deleteButton.click(function() {
        const targetTaskElm = $(this).closest('li');
        targetTaskElm.remove();
    });
}

//担当者をPersonListとselectboxから削除する関数
function deletePerson() {
    const personLiElm = $(this).closest('li');
    const personId =personLiElm.data('person-id').toString()
    $('#todo_area li, #doing_area li, #done_area li').each(function() {
        const taskPersonId = ($(this).children("span")).data('task-person-id').toString();
        if (personId === taskPersonId) {
            alert('担当者に紐づくタスクがあるため担当者を削除できません')
            return ;
        }
        personLiElm.remove();
        $('#person_select option').each(function() {
            const selectOptionId =$(this).val();
            const personOptionElm = $(this).closest('option')
            if (selectOptionId === personId) {
               personOptionElm.remove()
            }
        })
    })
}

function appendEditInput(personLiElm, editButton) {
    const beforeChangePersonElm = personLiElm.children("span")
    const beforeEditPersonName = beforeChangePersonElm.text()
    if (underEditedPersonId !== undefined) {
        $('#person_list_area li').each(function() {
            if (($(this).data('person-id') === underEditedPersonId)) {
                const cancelEditPersonElm = $(this)
                cancelEditPerson(cancelEditPersonElm.children("span").text(), cancelEditPersonElm)
                }
        })
    }
    underEditedPersonId = personLiElm.data('person-id');
    $('<input>').attr('id', 'edit_input').val(beforeEditPersonName).replaceAll(beforeChangePersonElm)
    const beforeChangeDeleteButton = personLiElm.children().last();
    
    const cancelButton =$('<button>').addClass('list__button--cancel').text("キャンセル")
    cancelButton.replaceAll(beforeChangeDeleteButton)
    cancelButton.click(function() {
        cancelEditPerson(beforeEditPersonName, personLiElm);
    })
    const saveButton =$('<button>').addClass('list__button--save').text("保存")
    saveButton.replaceAll(editButton);
    saveButton.click(function() {
        const newPersonName = $('#edit_input').val()
        personLiElm.children().remove();
        appendPerson(newPersonName, personLiElm);
        underEditedPersonId = undefined;
        
        const personLiId = personLiElm.data('person-id').toString();
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

function cancelEditPerson(beforeEditPersonName, personLiElm) {
    personLiElm.children().remove();
    appendPerson(beforeEditPersonName, personLiElm)
    underEditedPersonId = undefined;
}