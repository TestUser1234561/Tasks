class TaskController < ApplicationController
    # noinspection RailsParamDefResolve
    before_action :authenticate_user!
    before_action :validate_owner
    layout 'main'

    def index
        tasks = @project.tasks
        render jsonapi: tasks
    end

    def show
        render jsonapi: @task
    end

    def create
        pp params
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
    end

    private
    def validate(error)
        if @task.valid?
            @task.save
            render json: {success: true}
        else
            @errors = @task.errors.full_messages
            render json: {success: false, error: @errors}
        end
    end

    def task_params
        params.require(:task).permit(:title, :description, :tag_name, :project, :users => [])
    end
end
