//= require application
//= require select2
//= require ./classes/dashboard_generator
//= require ./classes/task

let dashboardGenerator = new DashboardGenerator(displayTask);
let task;
const projectID = parseInt(window.location.pathname.split('/').pop());

$(document).on('turbolinks:load', () => {
    //Start select2
    $('.select').select2().on('change', () => {
        $('#user_field').height($('.selection').height()) //Bad css fix
    });
    getUsers();
    getTasks();
});

//Get project users
function getUsers() {
    $.ajax({
        type: 'GET',
        url: `/project/${projectID}/users`,
        dataType: 'json'
    }).done((res) => {
        //Add users to select
        let select = $('.select');
        res.forEach((user) => {
            if(select.find(`option[value="${user.id}"]`).length === 0){
                select.append(new Option(user.name, user.id)).trigger('change')
            }
        });
    });
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: `/project/${projectID}/task`,
        dataType: 'json'
    }).done((res) => {
        //Generate and display dashboard
        dashboardGenerator.parse(res);
    })
}

function displayTask(id) {
    //Dont fetch task if its already in memory
    if(task !== undefined && id === task.id) {
        $('#dimmer').removeClass('invisible');
        $('#view-task').removeClass('invisible');
    } else {
        $.ajax({
            type: 'GET',
            url: `/project/${projectID}/task/${id}`,
            dataType: 'json'
        }).done((res) => {
            //Generate new task object
            task = new Task(res);

            //Show task if valid
            if(task.valid) {
                let view = $('#view-task .popup-menu');
                $('#dimmer').removeClass('invisible');
                view.html(task.getHTML()).promise().done(() => {
                    $('#view-task').removeClass('invisible');
                    bindButtons();
                })
            }
        })
    }
}

//Add new task
function newTask() {
    let data = $('#new-task form').serialize();
    $.post({
        url: `/project/${projectID}/task`,
        data: data
    }).done((data) => {
        //Check if API call was successful
        if(data.success) {
            getTasks();
            $('#dimmer').click();
        } else {
            //TODO: error
        }
    });
}

//Resets form data if it has been changed for edits
function resetNewTask() {
    $('#new-task > div > h2').text('New Task');
    $('#task_title').val('');
    $('#task_description').val('');
    $('.select').val('').trigger('change');
    $('#task_tag_name').val('');
    $('#task_create').val('Create');
    $('#new_task').attr("action", `javascript:newTask()`);
}

//Setup edit task form
function editTask() {
    $('#new-task > div > h2').text('Edit Task');
    $('#task_title').val(task.title);
    $('#task_description').val(task.description);
    $('.select').val(task.users.map((u) => u.id)).trigger('change');
    $('#task_tag_name').val(task.tag);
    $('#task_create').val('Update');
    $('#new_task').attr("action", `javascript:task.update()`);
}

//Delete task
function deleteTask() {
    task.delete();
}

//Add new user
function addUser() {
    let data = $('#add-user form').serialize();
    $.post({
        url: `/project/${projectID}/add`,
        data: data
    }).done((data) => {
        //Check if API call was successful
        if(data.success) {
            $('#dimmer').click();
            getUsers();
        } else {
            //TODO: error
        }
    });
}

//Edit project
function editProject() {
    let data = $('#edit-project form').serialize();
    $.ajax({
        method: 'PATCH',
        url: `/project/${projectID}`,
        data: data
    }).done((data) => {
        //Check if API call was successful
        if(data.success) {
            $('#dimmer').click();
            $('#title a:last-child').text($('#edit-project form').serializeArray()[1].value);
        } else {
            //TODO: error
        }
    });
}