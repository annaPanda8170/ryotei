class AddColumnToSalesDrinks < ActiveRecord::Migration[5.2]
  def change
    add_column :sales_drinks, :number, :integer, null: false
  end
end
