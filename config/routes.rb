Rails.application.routes.draw do
    #User home
    get 'dashboard', to: 'home#index'

    #Projects
    get 'project/:project_id/delete', to: 'project#confirm_destroy', as: 'delete_project'
    get 'project/:project_id/add', to: 'project#add_user', as: 'add_user'
    post 'project/:project_id/add', to: 'project#add'
    resources :project, except: [:index,], controller: :project do

        #tasks
        get 'task/:task_id/delete', to: 'task#confirm_destroy', as: 'delete_task'
        resources :task, except: [:index], controller: :task, param: :task_id

    end

    #Sign in/up
    devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}
    devise_scope :user do
        root to: "devise/sessions#new"
    end
end
