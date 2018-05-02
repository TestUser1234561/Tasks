class ApplicationController < ActionController::Base
    def after_sign_in_path_for(resource)
        home_url
    end
    def after_sign_out_path_for(resource_or_scope)
        root_path
    end
end
