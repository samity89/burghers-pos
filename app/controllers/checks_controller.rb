class ChecksController < ApplicationController
  before_action :set_check, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token, only: [:show, :index]

  # GET /checks
  def index
    @checks = Check.all

    render json: @checks, include: ['orders', 'orders.product', 'user'], status: 200
  end

  # GET /checks/1
  def show
    render json: @check
  end

  # POST /checks
  def create
    @check = Check.new(check_params)

    if @check.save
      render json: @check, status: :created, location: @check
    else
      render json: @check.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /checks/1
  def update
    if @check.update(check_params)
      render json: @check
    else
      render json: @check.errors, status: :unprocessable_entity
    end
  end

  # DELETE /checks/1
  def destroy
    @check.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_check
      @check = Check.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def check_params
      params.require(:check).permit(:user_id, :open)
    end
end
