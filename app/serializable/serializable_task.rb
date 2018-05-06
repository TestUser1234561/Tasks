class SerializableTask < JSONAPI::Serializable::Resource
    type 'tasks'
    attribute :title
    attribute :description
    attribute :created_at
    attribute :updated_at
    has_one :tag do
        meta  do
            { id: @object.tag.id, name: @object.tag.name }
        end
    end
end
