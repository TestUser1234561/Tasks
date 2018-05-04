class ApplicationController < ActionController::Base
    def after_sign_in_path_for(resource)
        dashboard_path
    end

    def after_sign_out_path_for(resource_or_scope)
        root_path
    end

    def validate_owner
        @user = current_user
        if params[:project_id]
            @project = @user.projects.try(:find_by_id, params[:project_id])
            redirect_to(dashboard_path) if @project.nil?
        end
    end
end
