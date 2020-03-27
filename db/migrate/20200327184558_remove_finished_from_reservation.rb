class RemoveFinishedFromReservation < ActiveRecord::Migration[5.2]
  def change
    remove_column :reservations, :finished
  end
end
