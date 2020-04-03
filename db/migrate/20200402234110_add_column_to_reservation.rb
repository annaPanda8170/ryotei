class AddColumnToReservation < ActiveRecord::Migration[5.2]
  def down
    remove_column :reservations, :start_time
  end
  def up
    add_column :reservations, :start_hour, :integer, null: false
    add_column :reservations, :start_minute, :integer, null: false
  end
end
