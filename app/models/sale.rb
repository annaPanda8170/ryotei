class Sale < ApplicationRecord
  validates :reservation, uniqueness: true

  belongs_to :reservation
  # , optional: true
  has_many :drinks, through: :sales_drinks
end
