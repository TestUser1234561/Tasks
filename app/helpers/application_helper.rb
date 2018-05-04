module ApplicationHelper
    def full_user_id(user)
        "#{user.first_name} #{user.last_name} <#{user.email}>"
    end
end
