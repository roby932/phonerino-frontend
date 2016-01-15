class Api::AuctionController < ApplicationController
  before_filter :authenticate

  def index
    auction = exe_sql("select * from auctions
      inner join phones on phones.id = auctions.phone_id
      inner join users on users.id = auctions.user_id
      order_by auctions.created_at")
    render json: auction
  end

  def create
    exe_sql("insert into auctions (
      user_id,
      phone_id,
      offer,
      created_at,
      updated_at) values (
        '#{@memo_user[0]['id']}',
        '#{auction_params[:phone_id]}',
        '#{auction_params[:offer]}',
        '#{Time.now.to_s}',
        '#{Time.now.to_s}')")
    auction = exe_sql("select * from brands order by created_at desc limit 1")
    render json: auction[0]
  end

  def destroy
    exe_sql("delete from auctions where id = #{params[:id]}");
    render json: {status:'succes'}
  end

  private

  def auction_params
    params.require(:data).permit(:phone_id, :offer)
  end

end
