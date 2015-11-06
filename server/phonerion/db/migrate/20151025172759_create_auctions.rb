class CreateAuctions < ActiveRecord::Migration
  def change
    create_table :auctions do |t|
    	t.integer :offered_price
      t.timestamps null: false
    end
  end
end
