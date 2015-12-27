class Api::AddressController < ApplicationController
  before_filter :authenticate

  def create
    # render json: params
    address = Address.new(address_params)
    address.user_id = current_user.id

    if address.save
      render json: address
    else
       render json: address.errors
    end
  end

  private

  def address_params
    params.require(:data).permit(:attributes => [:user_id, :phone, :address, :country, :city, :zipcode])
  end

end
