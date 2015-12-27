class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.belongs_to :user, index: true
    	t.string :phone
	    t.string :address
	    t.string :country
	    t.string :city
	    t.string :zipcode
      t.timestamps null: false
    end
  end
end
