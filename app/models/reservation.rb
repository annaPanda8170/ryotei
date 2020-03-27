class Reservation < ApplicationRecord
  validates :guest, presence: true, unless: :client_id?
end
