require 'rails_helper'

RSpec.describe User, type: :model do

    before do
        User.destroy_all
        Project.destroy_all
    end

    it "can have many projects" do
        user = User.create!(email: 't@t.t', password: 'test123')
        user.projects << Project.create!(name: 'test 1')
        user.projects << Project.create!(name: 'test 2')
        expect(user.projects.length).to eq(2)
    end

end