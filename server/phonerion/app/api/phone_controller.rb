class Api::PhoneController < ApplicationController
  before_filter :authenticate

  def index
    phone = exe_sql("select * from phones inner join details on phones.id = details.phone_id")
    render json: phone
  end

  def create
    exe_sql("insert into phones (
      name,
      brand_id,
      start_price,
      buyout_price,
      created_at,
      updated_at) values (
        '#{phone_params[:name]}',
        '#{phone_params[:brand_id]}',
        '#{phone_params[:start_price]}',
        '#{phone_params[:buyout_price]}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    phone = exe_sql("select * from phones order by created_at desc limit 1")
    exe_sql("insert into details (
      camera,
      state,
      info,
      product_id,
      created_at,
      phone_id,
      updated_at) values (
        '#{phone_params[:camera]}',
        '#{phone_params[:state]}',
        '#{phone_params[:info]}',
        '#{phone[0]['id']}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    phone = exe_sql("select * from phones inner join details on phones.id = details.phone_id
      order by created_at desc limit 1")
    render json: phone[0]
  end

  def destroy
    exe_sql("delete from phones where id = #{params[:id]}");
    render json: {status:'succes'}
  end

  private

  def phone_params
    params.require(:data).permit(:name, :brand_id, :start_price, :buyout_price, :camera, :state, :info)
  end

end
