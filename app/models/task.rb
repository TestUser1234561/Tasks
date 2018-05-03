class Task < ApplicationRecord
    belongs_to :project
    belongs_to :tag
    has_and_belongs_to_many :users
end
