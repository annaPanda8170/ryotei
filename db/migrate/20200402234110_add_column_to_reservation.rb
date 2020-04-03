class AddColumnToReservation < ActiveRecord::Migration[5.2]
  def change
    remove_column :reservations, :start_time
  end
  def change
    add_column :reservations, :start_hour, :integer, null: false
    add_column :reservations, :start_minute, :integer, null: false
  end
end
