class Api::UserController < ApplicationController
  before_filter :authenticate, only: [:index, :update, :destroy, :show]

  def index
    user = exe_sql("select * from users")
    render json: user
  end

  def show
    user = exe_sql("select * from users where id = '#{params[:id]}'")
    render json: user[0]
  end

  def create
    exe_sql("insert into users (
        first_name,
        last_name,
        email,
        password,
        auth_token,
        created_at,
        updated_at) values (
          '#{user_params[:first_name]}',
          '#{user_params[:last_name]}',
          '#{user_params[:email]}',
          '#{user_params[:password]}',
          '#{SecureRandom.hex(13)}',
          '#{Time.now.to_s}',
          '#{Time.now.to_s}')")
    user = exe_sql("select * from users order by created_at desc limit 1")
    render json: user[0]
  end

  def destroy
    exe_sql("delete from users where id = #{params[:id]}");
    render json: {status:'succes'}
  end

  def login
    user = exe_sql("select * from users
      where email = '#{user_params[:email]}' and password = #{user_params[:password]}")
    if user.present?
      render json: user[0]
    else
      render json: {error:'invalid username or password'}, status: 400
    end
  end

  private

  def user_params
    params.require(:data).permit(:first_name, :last_name, :email, :password)
  end

end
