class CreateKaisekis < ActiveRecord::Migration[5.2]
  def change
    create_table :kaisekis do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.timestamps
    end
  end
end
