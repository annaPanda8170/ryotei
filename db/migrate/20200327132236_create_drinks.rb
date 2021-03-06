class CreateDrinks < ActiveRecord::Migration[5.2]
  def change
    create_table :drinks do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.integer :category, null: false
      t.text :discription
      t.text :memo
      t.timestamps
    end
  end
end
