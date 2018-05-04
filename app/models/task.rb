class Task < ApplicationRecord
    validates :title, presence: true
    validates :tag_id, presence: true

    belongs_to :project
    belongs_to :tag
    has_and_belongs_to_many :users

    def self.assign_and_create(params)
        task = Task.create(title: params[:title], description: params[:description])
        task.tag = Tag.find_or_create_by(name: params[:tag_name])
        task.users << User.find(params[:users])
        task.project = Project.find(params[:project])
        task
    end
end
