class DashboardGenerator {
    constructor(callback) {
        this.displayed = [];
        this.cb = callback
    }

    parse(data) {
        this.data = data.data;
        if(data.length < 1) { DashboardGenerator.renderWelcome(); }
        else { this.parseData() }
    }

    parseData() {
        this.tasks = {};

        //For each task
        this.data.forEach((task) => {
            //Get tag name
            let tag = task['attributes']['tag']['name'];

            //Create tag array
            if(this.tasks[tag] === undefined) {
                this.tasks[tag] = [];
            }

            //Check if element has been displayed
            //TODO: nice css animation?
            //let css = '';
            //if(!this.displayed.includes(task.id)) {
            //    this.displayed.push(id);
            //}

            this.tasks[tag].push({id : task['id'], title: task['attributes']['title']});
        });
        this.renderTasks()
    }

    renderTasks() {
        //Hide welcome if shown
        $('#welcome').addClass('hidden');

        //Build dom
        let dom = '';
        Object.keys(this.tasks).forEach((tag) => {
            dom += `<div class="tag-container"><span class="title">${tag}</span><div class="task-container">`
            this.tasks[tag].forEach((task) => {
                dom += `<a class="task" data-id="${task.id}">${task.title}</a>`
            });
            dom += '</div></div>'
        });

        //Append new dom data and display
        let task = $('#tasks');
        task.html(dom).promise().done(() => {
            task.removeClass('hidden');
            $('.task').click((event) => {
                this.cb($(event.target).data('id'));
            });
        });
    }

    static renderWelcome() {
        //Hide tasks and show welcome
        $('#tasks').addClass('hidden');
        $('#welcome').removeClass('hidden')
    }
}