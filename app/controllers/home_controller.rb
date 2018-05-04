class HomeController < ApplicationController
    before_action :authenticate_user!

    def index
        @user = current_user
        @projects = @user.projects

        render layout: 'main'
    end
end
