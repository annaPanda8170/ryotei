class Reservation < ApplicationRecord
  validates :guest, presence: true, unless: :client_id?
  belongs_to :clinet, optional: true
  belongs_to :kaiseki
  belongs_to :room
  belongs_to :member
end
