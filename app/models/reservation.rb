class Reservation < ApplicationRecord
  validates :guest, presence: true, unless: :client_id?
  # validates :room, presence: true
  # validates :kaiseki, presence: true
  validates :number_of_guest, presence: true
  validates :date, presence: true
  validates :start_time, presence: true
  validate :booked

  belongs_to :client, optional: true
  belongs_to :kaiseki
  belongs_to :room
  belongs_to :member

  def booked
    # binding.pry
    first = Reservation.where(date: date, start_time: start_time, room_id: room_id).length > 0
    second = Reservation.where(date: date, start_time: start_time - 1, room_id: room_id).length > 0
    third = Reservation.where(date: date, start_time: start_time + 1, room_id: room_id).length > 0
    if first || second || third  
      errors.add(:date, "すでに予約があります")
    end
  end
end
