class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
    	t.string :brand
    	t.string :model
    	t.integer :camera
    	t.integer :screen_size
    	t.string :additonal_info
      t.timestamps null: false
    end
  end
end
