class Reservation < ApplicationRecord
  validates :guest, presence: true, unless: :client_id?
  # validates :room, presence: true
  # validates :kaiseki, presence: true
  validates :number_of_guest, presence: true
  validates :date, presence: true
  validates :start_hour, presence: true
  validate :booked

  belongs_to :client, optional: true
  belongs_to :kaiseki
  belongs_to :room
  belongs_to :member
  has_one :sale

  def booked
    first = Reservation.find_by(date: date, start_hour: start_hour, room_id: room_id)
    second = Reservation.find_by(date: date, start_hour: start_hour - 1, room_id: room_id)
    third = Reservation.find_by(date: date, start_hour: start_hour + 1, room_id: room_id)
    if (first && (id != first.id)) || (second && (id != second.id)) || (third  && (id != third.id))
      errors.add(:date, "すでに予約があります")
    end
  end
end
