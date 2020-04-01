class SalesDrink < ApplicationRecord
  belongs_to :sale
  belongs_to :drink
end
