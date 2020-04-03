class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.references :client, foreign_key: true
      t.string :guest
      t.references :member, foreign_key: true
      t.references :room, foreign_key: true
      t.references :kaiseki, foreign_key: true
      t.integer :number_of_guest, null: false
      t.date :date, null: false
      t.integer :start_hour, null: false
      t.integer :start_minute, null: false
      t.text :memo
      t.integer :status, null: false, delault: 1
      t.timestamps
    end
  end
end
