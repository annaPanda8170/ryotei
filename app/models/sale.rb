class Sale < ApplicationRecord
  belongs_to :reservation
  has_many :drinks, through: :sales_drinks
end
