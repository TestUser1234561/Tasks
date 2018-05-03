class TasksUsers < ActiveRecord::Migration[5.2]
    def change
        create_table :tasks_users, :id => false do |t|
            t.integer :user_id
            t.integer :task_id
        end
    end
end
