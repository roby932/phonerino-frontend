class CreateAuctions < ActiveRecord::Migration
  def change
    create_table :auctions do |t|
      t.belongs_to :phone, index: true
      t.belongs_to :user, index: true
    	t.integer :offered_price
      t.timestamps null: false
    end
  end
end
