class Order < ApplicationRecord
    belongs_to :check
    belongs_to :product
    validates :check_id, presence: true
    validates :product_id, presence: true
    validates_associated :product
end

