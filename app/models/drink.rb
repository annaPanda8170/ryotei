class Drink < ApplicationRecord
  enum category: {ビール:0,赤ワイン:1,白ワイン:2,焼酎:3,ウイスキー:4,ソフトドリンク:5,その他:6}
end
