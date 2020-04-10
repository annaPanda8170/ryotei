class Reservation < ApplicationRecord
  # もともとunless: :client_id?と書いていたが、テストでうまくいかないのでこれに変更した
  validates :guest, presence: true, unless: :client
  # 以下なぜか二重にでてしまうのでコメントアウト
  # validates :room, presence: true
  # validates :kaiseki, presence: true
  validates :number_of_guest, presence: true
  validates :date, presence: true
  validates :start_hour, presence: true
  validate :opening_hour
  validates :start_minute, presence: true
  validate :four_minute
  validate :out_of_opening
  validate :booked

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
      first = Reservation.find_by(date: date, start_hour: start_hour_up, start_minute: start_minute_up, room_id: room_id, status: [1, 2])
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
      second = Reservation.find_by(date: date, start_hour: start_hour_down, start_minute: start_minute_down, room_id: room_id, status: [1, 2])
      if second && id != second.id
        book = true
      end
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
  def opening_hour
    if start_hour < 11 || 19 < start_hour
      errors.add(:start_hour, "時間外です")
    end
  end
  def four_minute
    if !(start_minute == 0 || start_minute == 15 || start_minute == 30 || start_minute == 45)
      errors.add(:start_minute, "指定できない時間です")
    end
  end
  def out_of_opening
    if start_hour == 19 || start_minute == 45
      errors.add(:start_hour, "時間外です")
    end
  end
end