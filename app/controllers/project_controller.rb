class ProjectController < ApplicationController
    before_action :authenticate_user!
    before_action :validate_owner, except: [:new, :create]
    layout 'main'

    def show
        @tasks = @project.tasks
        @tags = @project.tags
    end

    def edit
    end

    def new
        @user = current_user
        @project = Project.new
        @errors = @project.errors
    end

    def create
        @user = current_user
        @project = Project.assign_and_create(project_params, @user)
        @errors = @project.errors.full_messages

        if @project.valid?
            @project.save
            redirect_to( project_path(@project) )
        else
            @errors = [*@project.errors.full_messages]
            render :new
        end
    end

    def update
        @project.update(project_params)

        if @project.valid?
            @project.save
            redirect_to( project_path(@project) )
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
    def project_params
        params.require(:project).permit(:name)
    end
end
