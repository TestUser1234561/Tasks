class Tag < ApplicationRecord
    validates :name, uniqueness: true, presence: true
    scope :most_recent, -> (limit) { order("created_at desc").limit(limit) }
end
