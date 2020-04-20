class Drink < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true
  validates :category, presence: true

  enum category: {ビール:0,シャンパーニュ:1,赤ワイン:2,白ワイン:3,焼酎:4,ウイスキー:5,ソフトドリンク:6,その他:7}
  
  has_many :sales, through: :sales_drinks
  has_many :sales_drinds
end
