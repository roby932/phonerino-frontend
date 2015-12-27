class Api::UserController < ApplicationController

  def index
    @user = User.first
    render json: @user
  end

  def show
    respond_to do |format|
      render json: {test:"test"}.to_json
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
       render json: user.errors
    end
  end

  private

  def user_params
    params.require(:data).permit(:first_name, :last_name, :email, :password)
  end

end
