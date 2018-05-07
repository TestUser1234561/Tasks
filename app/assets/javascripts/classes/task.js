class Task {
    constructor(data) {
        this.valid = false;
        if(data.data.length > 0 && Number.isInteger(parseInt(data.data[0]['id']))) {
            this.id = data.data[0]['id'];
            data = data.data[0]['attributes'];
            this.valid = true;
            this.projectId = parseInt(window.location.pathname.split('/').pop());
            this.users = data['users'];
            this.title = data['title'];
            this.description = data['description'];
            this.created_at = data['created_at'];
            this.updated_at = data['updated_at']
        }
    }

    getHTML() {
        return `
            <h2>${this.title}</h2>
            <form class="form">
                <span>${this.description}</span><br>
                <span>Users: ${this.getUserNames()}</span><br><br>
                <span>Created at: ${new Date(this.created_at).toDateString()}</span>
                <span>Last updated: ${new Date(this.updated_at).toDateString()}</span>
            </form>
            <div id="view-task-buttons">
                <div class="button" style="display: inline-block" data-target="edit-project">
                    <i class="fas fa-pencil-alt"></i>
                </div>
                <div class="button" style="display: inline-block" data-target="delete-project">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `
    }

    getUserNames() {
        return this.users.map((user) => {
            if(user.first_name !== null && user.last_name !== null) {
                return `${user.first_name} ${user.last_name} <${user.email}>`
            } else {
                return user.email
            }
        }).join(', ');
    }

    update(params) {

    }

    delete() {

    }
}