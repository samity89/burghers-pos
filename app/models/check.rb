class Check < ApplicationRecord
    belongs_to :user
    has_many :orders, dependent: :destroy
    has_many :products, through: :orders
    validates :user_id, presence: true
end
