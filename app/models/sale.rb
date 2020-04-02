class Sale < ApplicationRecord
  validates :reservation, uniqueness: true

  belongs_to :reservation
  # , optional: true
  has_many :drinks, through: :sales_drinks
  has_many :sales_drinks
  accepts_nested_attributes_for :sales_drinks
end
