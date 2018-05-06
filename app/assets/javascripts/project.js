//= require application
//= require ./classes/dashboard_generator

let dashboardGenerator = new DashboardGenerator();

$(document).on('turbolinks:load', function() {

    getTasks();

});

const projectID = parseInt(window.location.pathname.split('/').pop());

function getTasks() {
    $.ajax({
        type: 'GET',
        url: `/project/${projectID}/task`,
        dataType: 'json'
    }).done((data) => {
        dashboardGenerator.parse(data);
    })
}

//Add new task
function newTask() {
    let data = $('#new-task form').serialize();
    $.post({
        url: `/project/${projectID}/task`,
        data: data
    }).done((data) => {
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
        if(data.success) {
            $('#dimmer').click();
            $('#title a:last-child').text($('#edit-project form').serializeArray()[1].value);
        } else {
            //TODO: error
        }
    });
}