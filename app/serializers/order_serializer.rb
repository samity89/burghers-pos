class OrderSerializer < ActiveModel::Serializer
    attributes :id, :check_id, :product_id, :quantity, :created_at
    belongs_to :product, serializer: CheckOrderProductSerializer
    belongs_to :check
end