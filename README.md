# README
## Tasks
A simple platform for user's to create projects and assign catergorized tasks to other users in a kanban board style.

## Instalation
Tasks currently supports ruby version 2.4.3
1. Fork or clone the tasks repository.
2. Run `bundle install` inside the tasks directory
3. Add `config.omniauth :google_oauth2, 'API_KEY', 'API_SECRET', scope: 'email'` to `config/initializers/devise.rb` replacing the `API_KEY` and `API_SECRET` with your own.
    * Visit [google_oauth2](https://github.com/zquestz/omniauth-google-oauth2) github page for detailed instructions
4. Run `rake db:migrate` to generate the database.
5. Start the rails server with `rails s`

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

### Pull Request Process

1. Update the CHANGELOG.md with details of changes to the project, this includes new environment
   variables, exposed ports, and  notabale file locations.
2. You may merge the Pull Request in once you have a sign-off from one other developer, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

## License
This project has been licensed under the [GNU GPLv3](https://github.com/TestUser1234561/Tasks/blob/master/LICENSE) License.