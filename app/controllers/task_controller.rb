class TaskController < ApplicationController
    before_action :authenticate_user!
    before_action :validate_owner
    layout 'main'

    def show
        @tags = @project.tags
    end

    def edit
    end

    def new
        @task = Task.new
        @errors = @task.errors
    end

    def create
        @task = Task.assign_and_create(task_params)

        if @task.valid? && @task.tag.valid?
            @task.save
            redirect_to(project_task_path(@project, @task))
        else
            @errors = [*@task.errors, *@task.tag.errors.full_messages.map { |v| "Tag #{v}" }]
            render :new
        end
    end

    def update
        @project.update(task_params)

        if @project.valid?
            @project.save
            redirect_to(project_path(@project))
        else
            render :update
        end
    end

    def destroy
        #TODO: implement users deleting project will remove user until no users remain
        @project.destroy
        redirect_to(home_path)
    end

    def confirm_destroy
        render :delete
    end

    private

    def task_params
        params.require(:task).permit(:title, :description, :users, :tag_name, :project)
    end
end
