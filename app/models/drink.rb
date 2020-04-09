class Drink < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true
  validates :category, presence: true

  enum category: {ビール:0,赤ワイン:1,白ワイン:2,焼酎:3,ウイスキー:4,ソフトドリンク:5,その他:6}
  
  has_many :sales, through: :sales_drinks
  has_many :sales_drinds
end
