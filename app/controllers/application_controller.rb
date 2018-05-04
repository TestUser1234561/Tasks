class ApplicationController < ActionController::Base
    def after_sign_in_path_for(resource)
        dashboard_path
    end

    def after_sign_out_path_for(resource_or_scope)
        root_path
    end

    def validate_owner
        @user = current_user

        if params[:id] || params[:project_id]
            if params[:task_id]
                @project = @user.projects.try(:find_by_id, params[:project_id])
                @task = @project.tasks.try(:find_by_id, params[:task_id]) if !@project.nil?

                redirect_to(project_path(@project)) if @task.nil? && !@project.nil?
            else
                @project = @user.projects.try(:find_by_id, params[:id]) if params[:id]
                @project = @user.projects.try(:find_by_id, params[:project_id]) if params[:project_id]
            end

            redirect_to(dashboard_path) if @project.nil?
        end
    end
end
