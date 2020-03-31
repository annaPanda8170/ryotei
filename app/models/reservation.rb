class Reservation < ApplicationRecord
  validates :guest, presence: true, unless: :client_id?
  # validates :room, presence: true
  # validates :kaiseki, presence: true
  validates :number_of_guest, presence: true
  validates :date, presence: true
  validates :start_time, presence: true

  belongs_to :client, optional: true
  belongs_to :kaiseki
  belongs_to :room
  belongs_to :member
end
