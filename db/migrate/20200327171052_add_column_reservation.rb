class AddColumnReservation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservations, :date, :date
  end
end
