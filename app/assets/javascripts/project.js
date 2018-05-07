//= require application
//= require ./classes/dashboard_generator
//= require ./classes/task

let dashboardGenerator = new DashboardGenerator(displayTask);

$(document).on('turbolinks:load', function() {

    getTasks();

});

const projectID = parseInt(window.location.pathname.split('/').pop());

function displayTask(id) {
    $.ajax({
        type: 'GET',
        url: `/project/${projectID}/task/${id}`,
        dataType: 'json'
    }).done((res) => {
        //Generate new task object
        let task = new Task(res);

        //Show task if valid
        if(task.valid) {
            let view = $('#view-task .popup-menu');
            $('#dimmer').removeClass('invisible');
            view.html(task.getHTML()).promise().done(() => {
                $('#view-task').removeClass('invisible');
            })
        }
    })
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