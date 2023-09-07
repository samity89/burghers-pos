class ApplicationController < ActionController::Base
    # primary_abstract_class
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    private
    # def authorize
    #     return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
    # end
    
    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
