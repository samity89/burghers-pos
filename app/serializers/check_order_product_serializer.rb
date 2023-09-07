class CheckOrderProductSerializer < ActiveModel::Serializer
    attributes :id, :name, :price, :inventory
end