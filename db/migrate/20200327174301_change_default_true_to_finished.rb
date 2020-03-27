class ChangeDefaultTrueToFinished < ActiveRecord::Migration[5.2]
  def up
    change_column :reservations, :finished, :boolean, default: false
  end
  
  def down
    change_column :reservations, :finished,  :boolean, delault: 1
  end
end
