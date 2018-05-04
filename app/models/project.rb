class Project < ApplicationRecord
    validates :name, :presence => true

    has_and_belongs_to_many :users
    has_many :tasks
    has_many :tags, -> { distinct }, through: :tasks

    def self.assign_and_create(params, user)
        project = Project.create(params)
        project.users << user
        project
    end
end
