class Api::AddressController < ApplicationController
  before_filter :authenticate

  def index
    address = exe_sql("select * from addresses")
    render json: address
  end

  def create
    exe_sql("insert into addresses (
      user_id,
      zipcode,
      country,
      city,
      created_at,
      updated_at) values (
        '#{@memo_user[0]['id']}',
        '#{address_params[:zipcode]}',
        '#{address_params[:country]}',
        '#{address_params[:city]}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    address = exe_sql("select * from addresses order by created_at desc limit 1")
    render json: address[0]
  end

  def destroy
    exe_sql("delete from addresses where id = #{params[:id]}");
    render json: {status:'succes'}
  end

  private

  def address_params
    params.require(:data).permit(:zipcode, :city, :country)
  end

end
