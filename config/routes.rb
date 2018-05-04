Rails.application.routes.draw do
    #User home
    get 'dashboard', to: 'home#index'

    #Projects
    resources :project, except: [:index, :show], controller: :project, param: :project_id
    get 'project/:project_id/delete', to: 'project#confirm_destroy', as: 'delete_project'
    get 'project/:project_id', to: 'project#show'

    #Sign in/up
    devise_for :users, controllers: {omniauth_callbacks: 'users/omniauth_callbacks'}
    devise_scope :user do
        root to: "devise/sessions#new"
    end
end
