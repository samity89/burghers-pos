class Product < ApplicationRecord
    has_many :orders, dependent: :destroy
    has_many :checks, through: :orders
    validates :name, presence: true
    validates :description, presence: true
    validates :price, numericality: { greater_than_or_equal_to: 9 }
    validates :inventory, numericality: { greater_than_or_equal_to: 0 }
end
