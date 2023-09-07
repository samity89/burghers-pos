class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]
  skip_before_action :verify_authenticity_token, only: [:show, :index]
  # GET /products
  def index
    @products = Product.all

    render json: @products, include: :orders, status: 200
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
    render json: {}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:name, :description, :price, :inventory)
    end

    # def render_unprocessable_entity_response(invalid)
    #   render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    # end
end
