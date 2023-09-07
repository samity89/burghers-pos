class User < ApplicationRecord
  has_many :checks
  has_many :orders, through: :checks
  validates :encrypted_password, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  devise :database_authenticatable, :registerable, :api, :recoverable, :rememberable, :validatable, :session_limitable
end
