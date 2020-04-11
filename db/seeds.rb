Member.create(
  {
    name: "annaPanda",
    email: "a@a",
    grade: 3,
    password: "123123123"
  }
)

grades = [nil, 1, 2, 3]

15.times do
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

15.times do
  Client.create(
    {
      name: Faker::Company.name,
      memo: Faker::Food.description,
    }
  )
end

5.times do
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

Drink.create(
  [
    {
      name: "アサヒスーパードライ",
      price: 1200,
      category: 0
    },{
      name: "エビス",
      price: 1300,
      category: 0
    },{
      name: "シャトーマルゴー",
      price: 120000,
      category: 1
    },{
      name: "オーパスワン",
      price: 35000,
      category: 1
    },{
      name: "シャブリ",
      price: 11500,
      category: 2
    },{
      name: "あさつゆ",
      price: 16000,
      category: 2
    },{
      name: "魔王",
      price: 2300,
      category: 3
    },{
      name: "森伊蔵",
      price: 6100,
      category: 3
    },{
      name: "山崎18年",
      price: 4100,
      category: 4
    },{
      name: "I.W.ハーパー",
      price: 2200,
      category: 4
    },{
      name: "烏龍茶",
      price: 900,
      category: 5
    },{
      name: "オレンジジュース",
      price: 900,
      category: 5
    },{
      name: "コーラ",
      price: 900,
      category: 5
    },{
      name: "あらごし梅酒",
      price: 1000,
      category: 6
    }
  ]
)



member_length = Member.all.length
grade3_member = []
Member.all.each do |m| 
  if m.grade == 3
    grade3_member << m.id
  end
end
room_length = Room.all.length
kaiseki_length = Kaiseki.all.length
minute = [0, 15, 30, 45]
addDeleted = [1,1,1,0]


20.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Company.name,
      member_id: grade3_member[rand(0..((grade3_member.length) -1))],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..4) - rand(0..2),
      status: addDeleted[rand(0..1)],
      start_hour: rand(16..19),
      start_minute: minute[rand(0..2)]
    }
  )
end

20.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Name.name,
      member_id: grade3_member[rand(0..((grade3_member.length) -1))],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..4) - rand(0..2),
      status: addDeleted[rand(0..1)],
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

45.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Name.name,
      member_id: grade3_member[rand(0..((grade3_member.length) -1))],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..20) - rand(0..10),
      status: addDeleted[rand(0..1)],
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

14.times do
  Reservation.create(
    {
      client_id: nil,
      guest: Faker::Games::Pokemon.name,
      member_id: grade3_member[rand(0..((grade3_member.length) -1))],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..20) - rand(0..10),
      status: rand(0..1),
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

client_length = Client.all.length

45.times do
  Reservation.create(
    {
      client_id: rand(client_length),
      guest: nil,
      member_id: grade3_member[rand(0..((grade3_member.length) -1))],
      room_id: rand(room_length),
      kaiseki_id: rand(kaiseki_length),
      number_of_guest: rand(2..10),
      memo: Faker::Food.description,
      date: Date.today + rand(0..20) - rand(0..10),
      status: addDeleted[rand(0..1)],
      start_hour: rand(11..18),
      start_minute: minute[rand(0..3)]
    }
  )
end

grade2or3_members = Member.where(grade: [2,3])
members_length = grade2or3_members.length
today_reservations = Reservation.where(date: Date.today)
today_reservations.each do |r|
  # 会計中でないのも欲しい
  if rand(0..2) > 0
    sale = Sale.new(
      {
        reservation_id: r.id,
        member_id: grade2or3_members[rand(0..(members_length-1))].id,
        mean: nil,
        from: nil
      }
    )
    # ドリンク追加
    rand(0..10).times do
      sale.sales_drinks.build(
        {
          drink_id: Drink.find(1).id,
          number: rand(1..12)
        }
      )
    end
    sale.save!
    # いくつか会計済みにする
    mean = [nil, 0, 1]
    which = rand(0..2)
    puts mean[which]
    if mean[which] != nil
      sale.update(mean: mean[which], status: 2)
      if mean[which] == 1
        salesdrinks = SalesDrink.where(sale_id: sale.id)
        drink_total = 0
        salesdrinks.each do |d|
          drink_total += d.drink.price
        end
        sale.update(from: (r.kaiseki.price * r.number_of_guest + r.room.price + drink_total + rand(9999)))
      end
    end
  end
end

# 過去会計データ。まだ表示出来ないのでコメントアウト

# past_reservations = Reservation.where("date<?", Date.today)
# grade2or3_members = Member.where(grade: [2,3])
# members_length = grade2or3_members.length
# past_reservations.each do |r|
#   # mean = rand(0..1)
#   # mean_from_set = []
#   # mean_from_set < mean
#   # if mean == 0
#   #   mean_from_set < nil
#   # else
#   #   mean_from_set < r.
#   # end
#   sale = Sale.new(
#     {
#       reservation_id: r.id,
#       member_id: grade2or3_members[rand(0..(members_length-1))].id,
#       # status: 1,
#       mean: nil,
#       from: nil
#     }
#   )
#   rand(0..10).times do
#     sale.sales_drinks.build(
#       {
#         drink_id: Drink.find(1).id,
#         number: rand(1..12)
#       }
#     )
#   end
#   sale.save!
# end