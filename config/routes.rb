Rails.application.routes.draw do
    #User home
    get 'dashboard', to: 'home#index'

    #Projects
    get 'project/:project_id/users', to: 'project#users'
    post 'project/:project_id/add', to: 'project#add'
    resources :project, except: [:index, :edit], controller: :project do

        #tasks
        resources :task, except: [:new, :edit], controller: :task, param: :task_id

    end

    #Sign in/up
    devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}
    devise_scope :user do
        root to: "devise/sessions#new"
    end
end
