class Sale < ApplicationRecord
  validates :reservation, uniqueness: true

  enum mean: {クレジット:0, 現金:1}

  belongs_to :reservation
  # , optional: true
  has_many :drinks, through: :sales_drinks
  has_many :sales_drinks
  accepts_nested_attributes_for :sales_drinks
end
