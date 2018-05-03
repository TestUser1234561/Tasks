require 'rails_helper'

RSpec.describe Task, type: :model do

    before(:all) do
        User.destroy_all
        Task.destroy_all
        Tag.destroy_all

        @project = Project.create!(name: 'Test Project')
        @task = Task.create(title: 'Test task', description: 'This is a test')
        @project.tasks << @task
    end

    it "can have a tag" do
        tag = Tag.find_or_create_by!(name: 'Test')
        @task.tag = tag
        expect(@task.tag).to_not eq nil
    end

    it "can be assigned to users" do
        user = User.create!(email: 't@t.t', password: 'test123')
        user.tasks << @task

        expect(@task.users[0]).to eq(user)
        expect(user.tasks[0]).to eq(@task)
    end

end
