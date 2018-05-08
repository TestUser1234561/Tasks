class SerializableTask < JSONAPI::Serializable::Resource
    type 'tasks'
    attribute :title
    attribute :description
    attribute :created_at
    attribute :updated_at
    attribute :users
    attribute :tag
end
