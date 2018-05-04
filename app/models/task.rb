class Task < ApplicationRecord
    validates :title, presence: true
    validates :tag_id, presence: true

    belongs_to :project
    belongs_to :tag
    has_and_belongs_to_many :users
end
