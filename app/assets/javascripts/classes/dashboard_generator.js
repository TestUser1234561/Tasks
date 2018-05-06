class DashboardGenerator {
    constructor() {
        this.displayed = [];
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
            let tag = task['relationships']['tag']['meta']['name'];

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

            this.tasks[tag].push({id : task['id'], title: task['attributes']['title'],
                                  description: task['attributes']['description']});
        });
        this.renderTasks()
    }

    renderTasks() {
        $('#welcome').addClass('hidden');
        let dom = '';
        Object.keys(this.tasks).forEach((tag) => {
            dom += `<div class="tag-container"><span class="title">${tag}</span><div class="task-container">`
            this.tasks[tag].forEach((task) => {
                dom += `<a class="task">${task.title}</a>`
            });
            dom += '</div></div>'
        });
        let task = $('#tasks');
        task.html(dom);
        task.removeClass('hidden');
    }

    static renderWelcome() {
        $('#tasks').addClass('hidden');
        $('#welcome').removeClass('hidden')
    }
}