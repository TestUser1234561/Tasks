class HomeController < ApplicationController
    before_action :authenticate_user!, except: :stats

    def index
        @user = current_user
        @projects = @user.projects

        render layout: 'main'
    end

    def stats
        @users = User.most_recent(5)
        @tags = Tag.most_recent(5)
    end
end
