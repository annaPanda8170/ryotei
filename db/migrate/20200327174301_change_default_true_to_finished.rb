class ChangeDefaultTrueToFinished < ActiveRecord::Migration[5.2]
  def change
    remove_column :reservations, :finished, :boolean, default: false
  end
  
  def change
    add_column :reservations, :status,  :integer, default: 1
  end
end
