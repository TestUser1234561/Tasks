class User < ApplicationRecord
    #User has many projects
    has_and_belongs_to_many :projects
    has_and_belongs_to_many :tasks

    # Include default devise modules. Others available are:
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: %i[google_oauth2]

    def self.from_omniauth(auth)
        where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
            user.email = auth.info.email
            user.password = Devise.friendly_token[0, 20]
            user.first_name = auth.info.first_name
            user.last_name = auth.info.last_name
        end
    end
end
