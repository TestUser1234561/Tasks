class Task < ApplicationRecord
    validates :title, presence: true
    validates :tag_id, presence: true

    belongs_to :project
    belongs_to :tag
    has_and_belongs_to_many :users

    def update_task(params)
        self.update(title: params[:title], description: params[:description])
        self.tag = Tag.find_or_create_by(name: params[:tag_name]) unless params[:tag_name] === tag.name
        self.users.clear
        params[:users].each do |user|
            user = User.find(user)
            self.users << user if user.project_ids.include? self.project_id #Check if user is in this project
        end unless params[:users].nil? #Check if param exists
        self
    end

    def self.assign_and_create(params)
        task = Task.create(title: params[:title], description: params[:description])
        task.tag = Tag.find_or_create_by(name: params[:tag_name])
        params[:users].each do |user|
            user = User.find(user)
            task.users << user if user.project_ids.include? params[:project] #Check if user is in this project
        end unless params[:users].nil? #Check if param exists
        task.project = Project.find(params[:project])
        task
    end
end
