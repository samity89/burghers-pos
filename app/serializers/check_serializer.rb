class CheckSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :open, :created_at, :updated_at
    has_many :orders, serializer: CheckOrderSerializer
    belongs_to :user
end