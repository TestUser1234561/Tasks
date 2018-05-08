class Task {
    constructor(data) {
        this.valid = false;
        if(Number.isInteger(parseInt(data.data['id']))) {
            this.id = parseInt(data.data['id']);
            data = data.data['attributes'];
            this.valid = true;
            this.projectId = parseInt(window.location.pathname.split('/').pop());
            this.users = data['users'];
            this.title = data['title'];
            this.tag = data['tag']['name'];
            this.description = data['description'];
            this.created_at = data['created_at'];
            this.updated_at = data['updated_at']
        }
    }

    getHTML() {
        return `
            <h2>${this.title}</h2>
            <form class="form">
                ${ this.description ? `<span>${this.description}</span><br>` : ``}
                ${ this.users.length ? `<span>Users: ${this.getUserNames()}</span><br><br>` : `` }
                <span>Created at: ${new Date(this.created_at).toDateString()}</span>
                <span>Last updated: ${new Date(this.updated_at).toDateString()}</span>
            </form>
            <div id="view-task-buttons">
                <div class="button" style="display: inline-block" data-target="new-task" data-function="editTask">
                    <i class="fas fa-pencil-alt"></i>
                </div>
                <div class="button" style="display: inline-block" data-function="deleteTask">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `
    }

    getUserNames() {
        return this.users.map((user) => {
            if(user.first_name !== null && user.last_name !== null) {
                return `${user.first_name} ${user.last_name} (${user.email})`
            } else {
                return user.email
            }
        }).join(', ');
    }

    update() {
        let data = $('#new-task form').serialize();
        $.ajax({
            method: 'PATCH',
            url: `/project/${this.projectId}/task/${this.id}`,
            data: data
        }).done((data) => {
            //Check if API call was successful
            if(data.success) {
                task = undefined;
                App.projectChannel.send({update: 'tasks'});
                $('.popup').addClass('invisible');
                $(`a[data-id="${this.id}"]`).click();
            } else {
                appendErrors('new_task', data['error'])
            }
        });
    }

    delete() {
        if(window.confirm('Are you sure you want to delete this task?')) {
            $.ajax({
                method: 'DELETE',
                url: `/project/${this.projectId}/task/${this.id}`
            }).done(() => {
                $('#dimmer').click();
                App.projectChannel.send({update: 'tasks'});
            });
        }
    }
}