class CreateSales < ActiveRecord::Migration[5.2]
  def change
    create_table :sales do |t|
      t.references :reservation, foreign_key: true
      t.references :member, null: false, foreign_key: true
      t.integer :status, nill: false, default: 1
      t.integer :mean
      t.integer :from
      t.timestamps
    end
  end
end
