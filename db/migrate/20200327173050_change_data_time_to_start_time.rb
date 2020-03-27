class ChangeDataTimeToStartTime < ActiveRecord::Migration[5.2]
  def change
    change_column :reservations, :start_time, :time
  end
end
