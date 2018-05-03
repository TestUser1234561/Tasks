require 'rails_helper'

RSpec.describe Task, type: :model do

    before do
        Project.delete_all
        Task.delete_all
        Tag.delete_all
    end

    it "can have a tag" do
        tag = Tag.find_or_create_by!(name: 'Test')
        task = Task.create(title: 'Test task', description: 'This is a test')
        task.tag = tag

        expect(task.tag).to_not eq nil
    end

end
