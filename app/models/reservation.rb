class Reservation < ApplicationRecord
  validates :guest, presence: true, unless: :client_id?
  # 以下なぜか二重にでてしまうのでコメントアウト
  # validates :room, presence: true
  # validates :kaiseki, presence: true
  validates :number_of_guest, presence: true
  validates :date, presence: true
  validates :start_hour, presence: true
  # validate :booked

  belongs_to :client, optional: true
  belongs_to :kaiseki
  belongs_to :room
  belongs_to :member
  has_one :sale

  def booked
    book = false
    start_hour_up = start_hour
    start_minute_up = start_minute
    1.upto(10) do
      first = Reservation.find_by(date: date, start_hour: start_hour_up, start_minute: start_minute_up, room_id: room_id)
      if first && id != first.id
        book = true
      end
      start_minute_up+= 15
      if start_minute_up == 60
        start_minute_up = 0
        start_hour_up += 1
      end
    end
    start_hour_down = start_hour
    start_minute_down = start_minute
    1.upto(10) do
      second = Reservation.find_by(date: date, start_hour: start_hour_down, start_minute: start_minute_down, room_id: room_id)
      if second && id != second.id
        book = true
      end
      puts start_hour_down
      puts start_minute_down
      puts "------------------"
      if start_minute_down == 0
        start_minute_down = 60
        start_hour_down -= 1
      end
      start_minute_down -= 15
    end
    if book
      errors.add(:date, "すでに予約があります")
    end
  end
end
