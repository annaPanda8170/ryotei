Member.create(
  [
    {
      name: "Grade3Member",
      email: "a@a",
      grade: 3,
      password: "123123123"
    },{
      name: "Grade2Member",
      email: "b@b",
      grade: 2,
      password: "123123123"
    },{
      name: "Grade1Member",
      email: "c@c",
      grade: 1,
      password: "123123123"
    },{
      name: "NoGradeMember",
      email: "d@d",
      grade: nil,
      password: "123123123"
    }
  ]
)

grades = [nil, 1, 2, 3]

25.times do
  Member.create(
    {
      name: Faker::Name.name,
      email: Faker::Internet.email,
      grade: grades[rand(0..3)],
      password: "123123123"
    }
  )
end

Kaiseki.create(
  [
    {
      name: "曙会席",
      price: 10000
    },{
      name: "花衣会席",
      price: 20000
    },{
      name: "福梅会席",
      price: 25000
    },{
      name: "瑞雲会席",
      price: 30000
    },{
      name: "花篝会席",
      price: 35000
    }
  ]
)

20.times do
  Client.create(
    {
      name: Faker::Company.name,
      memo: Faker::Food.description,
    }
  )
end

10.times do
  Client.create(
    {
      name: Faker::Name.name,
      memo: Faker::Food.description,
    }
  )
end


Room.create(
  [
    {
      name: "鳳凰の間",
      price: 10000
    },{
      name: "悠久の間",
      price: 20000
    },{
      name: "麒麟の間",
      price: 20000
    },{
      name: "高砂の間",
      price: 25000
    },{
      name: "夕霧の間",
      price: 100000
    }
  ]
)



beers = ["ヱビスビール","ザ・プレミアムモルツ","熟撰","ハートランドビール","クラシックラガー","一番搾り","スーパードライ","サッポロ生ビール黒ラベル","モルツ"]
beers.each_with_index do |b, i|
  Drink.create(
    {
      name: beers[i],
      price: rand(10..23)*100,
      category: 0,
      discription: Faker::Food.description
    }
  )
end

champanges = ["クリュッグ・グランド・キュヴェ","ビルカール・サルモン","モエ・エ・シャンドン","ドン・ペリニヨン"]
champanges.each_with_index do |b, i|
  Drink.create(
    {
      name: champanges[i],
      price: rand(15..63)*1000,
      category: 1,
      discription: Faker::Food.description
    }
  )
end

red_wines = ["シャトー・コス・デストゥルネル 2008",
  "シャトー・ブラネール・デュクリュ 2011",
  "メーヌ・ダヴィド・デュバン ニュイ・サン・ジョルジュ プルミエ・クリュ レ・プリュリエ 2017",
  "ドメーヌ・ジャン・マルク・ボワイヨ ポマール・プルミエ・クリュ・ジャロリエール 2014",
  "ドメーヌ・ジャン・マルク・ボワイヨ ヴォルネイ・ピチュール プルミエ・クリュ 2016",
  "マルケージ・アンティノリ・ティニャネロ 2015",
  "紫鈴（りんどう） 2016",
  "ルニア",
  "ジュヴレ･シャンベルタン ラ･ジュスティス ドメーヌ・アルベール・ビショー 2015",
  "アヴィニョネージ ヴィーノ・ノビレ・ディ・モンテプルチャーノ 2015",
  "アメイナ・シラー 2015",
  "ベッツ・ファミリー・ワイナリー ポッシビリティー2016",
  "ソラリス 信州千曲川産メルロー2016"]
red_wines.each_with_index do |b, i|
  Drink.create(
    {
      name: red_wines[i],
      price: rand(15..160)*1000,
      category: 2,
      discription: Faker::Food.description
    }
  )
end

white_wines = ["ブシャール・ペール・エ・フィス ボーヌ・デュ・シャトー プルミエ・クリュ 2017",
  "アクスティック・ブラン 2017",
  "テーラ・テール 2015",
  "ファン・フォルクセン・ロートシーファー・リースリング・カビネット 2016",
  "オーボン・クリマ ニュイ・ブランシュ・ オ・ブージュ 2014",
  "ボット・フレール リースリング・グラン・クリュ・オスターベルク 2017",
  "ノリア・シャルドネ・サンジャコモ・ヴィンヤード 2017",
  "アルガ・ブランカ・イセハラ 2017 "]
white_wines.each_with_index do |b, i|
  Drink.create(
    {
      name: white_wines[i],
      price: rand(15..180)*1000,
      category: 3,
      discription: Faker::Food.description
    }
  )
end

shochu = ["百年の孤独", "八幡 ろかせず", "三岳", "鳥飼", "伊佐美", "十四代", "佐藤 黒", "村尾", "魔王", "森伊蔵"]
shochu.each_with_index do |b, i|
  Drink.create(
    {
      name: shochu[i],
      price: rand(13..65)*100,
      category: 4,
      discription: Faker::Food.description
    }
  )
end

whisky = ["山崎12年,竹鶴17年","カナディアンクラブ20年","レッドブレスト21年","ブラントンゴールド","ブッカーズ2019","ジョニーウォーカー青ラベル","スプリングバンク18年","ロイヤルサルート21年ダイヤモンドジュビリー","ザ・マッカラン18年"]
whisky.each_with_index do |b, i|
  Drink.create(
    {
      name: whisky[i],
      price: rand(13..45)*100,
      category: 5,
      discription: Faker::Food.description
    }
  )
end

soft = ["烏龍茶","緑茶","コーラ","ジンジャエール","オレンジ","リンゴ","グレープフルーツ","ブドウ","トマト"]
soft.each_with_index do |b, i|
  Drink.create(
    {
      name: soft[i],
      price: rand(9..11)*100,
      category: 6,
      discription: Faker::Food.description
    }
  )
end

other = ["あらごし梅酒","マンハッタン","ダイキリ","ドライ・マティーニ","ウイスキーサワー","マルガリータ","サゼラック","モスコミュール","モヒート"]
other.each_with_index do |b, i|
  Drink.create(
    {
      name: other[i],
      price: rand(12..21)*100,
      category: 7,
      discription: Faker::Food.description
    }
  )
end

member_length = Member.all.length
grade3_member = []
Member.all.each do |m| 
  if m.grade == 3
    grade3_member << m.id
  end
end
grade3_member_length = grade3_member.length
room_length = Room.all.length
kaiseki_length = Kaiseki.all.length
minute = [0, 15, 30, 45]
addDeleted = [1,1,1,0]
addDeleted_length = addDeleted.length

# 今日
6.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Company.name,
      member_id: grade3_member[rand(grade3_member_length)],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today,
      status: rand(0..1),
      start_hour: rand(13..18),
      start_minute: minute[rand(0..2)]
    }
  )
end

# 期近の夜に企業名で
20.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Company.name,
      member_id: grade3_member[rand(grade3_member_length)],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..4) - rand(0..2),
      status: addDeleted[rand(addDeleted_length)],
      start_hour: rand(16..19),
      start_minute: minute[rand(0..2)]
    }
  )
end


# 期近の昼に個人名で
20.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Name.name,
      member_id: grade3_member[rand(grade3_member_length)],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..4) - rand(0..2),
      status: addDeleted[rand(addDeleted_length)],
      start_hour: rand(11..17),
      start_minute: minute[rand(0..3)]
    }
  )
end

# 個人名
45.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Name.name,
      member_id: grade3_member[rand(grade3_member_length)],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..20) - rand(0..10),
      status: addDeleted[rand(addDeleted_length)],
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

# ポケモン
14.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Games::Pokemon.name,
      member_id: grade3_member[rand(grade3_member_length)],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..20) - rand(0..10),
      # ポケモンは半分キャンセルでいい
      status: rand(0..1),
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

# クライアント
client_length = Client.all.length
55.times do
  Reservation.create(
    {
      client_id: rand(client_length),
      guest: nil,
      member_id: grade3_member[rand(grade3_member_length)],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..20) - rand(0..20),
      status: addDeleted[rand(addDeleted_length)],
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

def add_sale(reservations, mean)
  mean_length = mean.length
  grade2or3_members = Member.where(grade: [2,3])
  members_length = grade2or3_members.length 
  drink_length = Drink.all.length
  which = 0
  reservations.each do |r|
    # 会計中でないのも欲しい
    if mean[which] != 100
      sale = Sale.new(
        {
          reservation_id: r.id,
          member_id: grade2or3_members[rand(members_length)].id,
          mean: nil,
          from: nil
        }
      )
      # ドリンク追加
      rand(0..10).times do
        sale.sales_drinks.build(
          {
            drink_id: Drink.find(rand(1..drink_length)).id,
            number: rand(1..12)
          }
        )
      end
      sale.save!
      if mean[which] != nil
        sale.update(mean: mean[which], status: 2)
        if mean[which] == 1
          salesdrinks = SalesDrink.where(sale_id: sale.id)
          drink_total = 0
          salesdrinks.each do |d|
            drink_total += d.drink.price * d.number
          end
          sale.update(from: (r.kaiseki.price * r.number_of_guest + r.room.price + drink_total + rand(9999)))
        end
      end
    end
    which += 1
    which = 0 if which > mean_length-1
  end
end



today_reservations = Reservation.where(date: Date.today, status: 1)
# ランダムではなく一定の確率で仕分けしたいのでこの配列を循環させる。100は適当。nilが先に使われたので
mean = [100, nil, nil, 0, 1]
add_sale(today_reservations, mean)

past_reservations = Reservation.where("date<?", Date.today)
mean = [1, 0, nil, 0, 1, 1]
add_sale(past_reservations, mean)