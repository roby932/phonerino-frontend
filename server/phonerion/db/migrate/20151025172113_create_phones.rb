class CreatePhones < ActiveRecord::Migration
  def change
    create_table :phones do |t|
    	t.string :name
      t.string :status
      t.string :state
      t.integer :startPrice
      t.integer :buyoutPrice
      t.timestamps null: false
    end
  end
end
