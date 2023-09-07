class UserCheckSerializer < ActiveModel::Serializer
    attributes :id, :open, :created_at, :updated_at
    belongs_to :user
    has_many :orders
end