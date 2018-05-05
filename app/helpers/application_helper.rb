module ApplicationHelper
    def first_name_check(user)
        if user.first_name.nil?
            return user.email.split("@").first
        end
        user.first_name.capitalize
    end
end
