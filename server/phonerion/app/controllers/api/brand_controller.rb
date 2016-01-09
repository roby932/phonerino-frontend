class Api::BrandController < ApplicationController
  before_filter :authenticate

  def index
    brand = exe_sql("select * from brands")
    render json: brand
  end

  def create
    exe_sql("insert into brands (
      name,
      created_at,
      updated_at) values (
        '#{brand_params[:name]}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    brand = exe_sql("select * from brands order by created_at desc limit 1")
    render json: brand[0]
  end

  def destroy
    exe_sql("delete from brands where id = #{params[:id]}");
    render json: {status:'succes'}
  end

  private

  def brand_params
    params.require(:data).permit(:name, :logo)
  end

end
