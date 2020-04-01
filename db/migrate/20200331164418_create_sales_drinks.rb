class CreateSalesDrinks < ActiveRecord::Migration[5.2]
  def change
    create_table :sales_drinks do |t|
      t.references :sale, null: false, foriegn__key: true
      t.references :drink, null: false, foriegn_key: true
      t.timestamps
    end
  end
end
