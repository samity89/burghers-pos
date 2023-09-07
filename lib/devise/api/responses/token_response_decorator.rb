module Devise::Api::Responses::TokenResponseDecorator
    def body
      return default_body.merge({ 
        id: resource_owner.id,
        first_name: resource_owner.first_name,
        admin: resource_owner.admin 
      })
    end
end