class CheckOrderSerializer < ActiveModel::Serializer
    attributes :id, :quantity, :created_at
    belongs_to :product, serializer: CheckOrderProductSerializer
end