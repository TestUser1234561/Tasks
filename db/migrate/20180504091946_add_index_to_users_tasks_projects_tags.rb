class AddIndexToUsersTasksProjectsTags < ActiveRecord::Migration[5.2]
    def change
        add_index :tasks_users, [:user_id, :task_id], :unique => true
        add_index :tasks_users, :task_id
        add_index :projects_users, [:user_id, :project_id], :unique => true
        add_index :projects_users, :project_id
    end
end
