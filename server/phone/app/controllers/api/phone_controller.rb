class Api::PhoneController < ApplicationController
  before_filter :authenticate, only: [:create, :update, :destroy]

  def index
    sql = "select phones.name,phones.id,phones.created_at,phones.updated_at,
      details.info,brands.name as brand_name,phones.start_price,phones.buyout_price,
      users.first_name,users.last_name from phones
      inner join details on phones.id = details.phone_id
      inner join brands on brands.id = phones.brand_id
      inner join users on users.id = phones.user_id";
    if params[:brands]
      sql = sql + " where brands.id in (" + params[:brands] +')';
    else
      sql = sql + " where brands.id in (select brands.id from brands)";
    end
    if params[:has_buyout] == 'true'
      sql = sql + " and phones.buyout_price != 0"
    end
    if params[:max_price]&& (params[:max_price] != '0')
      sql = sql + " and phones.start_price < " + params[:max_price]
    end
    if params[:order]
      sql = sql + " order by " + params[:order];
    end
    phone = exe_sql(sql)
    render json: phone
  end

  def show
    phone = exe_sql("select * from phones inner join details on phones.id = details.phone_id
      where phones.id = #{params[:id]}")
    render json: phone
  end

  def create
    buyout = phone_params[:buyout_price] || 0
    exe_sql("insert into phones (
      user_id,
      name,
      brand_id,
      start_price,
      buyout_price,
      created_at,
      updated_at) values (
        '#{@memo_user[0]['id']}',
        '#{phone_params[:name]}',
        '#{phone_params[:brand_id]}',
        '#{phone_params[:start_price]}',
        '#{buyout}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    phone = exe_sql("select * from phones order by created_at desc limit 1")
    camera = phone_params[:camera] || 0
    exe_sql("insert into details (
      camera,
      state,
      info,
      phone_id,
      created_at,
      updated_at) values (
        '#{camera}',
        '#{phone_params[:state]}',
        '#{phone_params[:info]}',
        '#{phone[0]['id']}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    phone = exe_sql("select * from phones inner join details on phones.id = details.phone_id
      order by phones.created_at desc limit 1")
    render json: phone[0]
  end

  def destroy
    phone = exe_sql("select * from phones inner join details on phones.id = details.phone_id
      where phones.id = #{params[:id]}")
    exe_sql("delete from details where id = #{phone[0]['id']}");
    exe_sql("delete from phones where id = #{params[:id]}");
    render json: {status:'succes'}
  end

  private

  def phone_params
    params.require(:data).permit(:name, :brand_id, :start_price, :buyout_price, :camera, :state, :info)
  end

end
