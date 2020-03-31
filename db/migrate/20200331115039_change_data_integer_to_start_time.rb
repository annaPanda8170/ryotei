class ChangeDataIntegerToStartTime < ActiveRecord::Migration[5.2]
  def change
    change_column :reservations, :start_time, :integer
  end
end
