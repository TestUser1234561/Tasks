// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer();
}).call(this);

//Setup channels
App.projectChannel = App.cable.subscriptions.create({ channel: 'ProjectChannel', id: parseInt(window.location.pathname.split('/').pop()) }, {
    received: (data) => {
        if(data.update) {
            switch(data.update) {
                case 'tasks':
                    getTasks();
                    break;
                case 'users':
                    getUsers();
                    break;
            }
        }
    }
});