class TaskController < ApplicationController
    # noinspection RailsParamDefResolve
    before_action :authenticate_user!
    before_action :validate_owner
    layout 'main'

    def show
        @tags = @project.tags
    end

    def edit
        @errors = []
    end

    def new
        @task = Task.new
        @errors = @task.errors
    end

    def create
        @task = Task.assign_and_create(task_params)

        validate(:new)
    end

    def update
        @task.update_task(task_params)
        validate(:update)
    end

    def destroy
        # noinspection RubyArgCount
        @task.destroy
        redirect_to(project_path(@project))
    end

    def confirm_destroy
        render :delete
    end

    private
    def validate(error)
        if @task.valid?
            @task.save
            redirect_to(project_task_path(@project, @task))
        else
            @errors = @task.errors.full_messages
            render error
        end
    end

    def task_params
        params.require(:task).permit(:title, :description, :users, :tag_name, :project)
    end
end
