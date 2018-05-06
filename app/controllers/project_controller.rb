class ProjectController < ApplicationController
    before_action :authenticate_user!
    before_action :validate_owner, except: [:new, :create]
    layout 'main'

    def show
        @tasks = @project.tasks
        @tags = @project.tags
        @task = Task.new
    end

    def new
        @user = current_user
        @project = Project.new
        @errors = @project.errors
    end

    def create
        @user = current_user
        @project = Project.assign_and_create(project_params, @user)
        validate :new
    end

    def update
        @project.update(project_params)
        if @project.valid?
            @project.save
            render json: {success: true}
        else
            @errors = @project.errors.full_messages
            render json: {success: false, error: @errors}
        end
    end

    def add
        user = User.find_by(email: add_params[:email])
        unless user.nil?
            @project.users << user
            @project.save
            render json: {success: true}
        else
            @errors = ["User not found!"]
            render json: {success: false, error: @errors}
        end
    end

    def destroy
        # noinspection RubyArgCount
        @project.users.destroy(@user)
        if @project.users.empty?
            @project.tasks.each do |task|
                task.destroy
            end
            @project.destroy
        end
        redirect_to(dashboard_path)
    end

    private
    def validate(error)
        if @project.valid?
            @project.save
            redirect_to( project_path(@project) )
        else
            @errors = @project.errors.full_messages
            render error
        end
    end

    def project_params
        params.require(:project).permit(:name)
    end

    def add_params
        params.require(:add).permit(:email)
    end
end
