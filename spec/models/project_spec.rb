require 'rails_helper'

RSpec.describe Project, type: :model do

    before(:all) do
        User.delete_all
        Project.delete_all
        Tag.delete_all
        @project = Project.create!(name: 'Test Project')
    end

    it "belongs to many users" do
        user1 = User.create!(email: 't@t.t', password: 'test123')
        user2 = User.create!(email: 't2@t.t', password: 'test123')
        user1.projects << @project
        user2.projects << @project

        expect(@project.users.length).to eq(2)
    end

    it "can have multiple tasks" do
        test1 = Task.create(title: 'Test task', description: 'This is a test')
        test2 = Task.create(title: 'Test task 2', description: 'This is another test')
        @project.tasks << test1
        @project.tasks << test2

        expect(@project.tasks.length).to eq 2
    end

    it "has many tags" do
        tags = [Tag.find_or_create_by!(name: 'Test'), Tag.find_or_create_by!(name: 'Test 2')]
        @project.tasks.each_with_index do |v, i|
            v.tag = tags[i]
            v.save
        end

        expect(@project.tasks[0].tag.name).to eq 'Test'
        expect(@project.tasks[1].tag.name).to eq 'Test 2'
        expect(@project.tags.length).to eq 2
    end

end