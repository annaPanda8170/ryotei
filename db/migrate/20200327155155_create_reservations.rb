class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.references :client, foreign_key: true
      t.string :guest
      t.references :member, foreign_key: true
      t.references :room, foreign_key: true
      t.references :kaiseki, foreign_key: true
      t.integer :number_of_guest
      t.integer :start_time, null: false
      t.text :memo
      t.boolean :finished, null: false, delault: 1
    end
  end
end
