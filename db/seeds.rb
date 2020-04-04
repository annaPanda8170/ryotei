Member.create(
  [
    {
      name: "manager",
      email: "a@a",
      grade: 3,
      password: "123123123"
    },{
      name: "newer",
      email: "b@b",
      grade: nil,
      password: "123123123"
    }
  ]
)

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

Client.create(
  [
    {
      name: "田中",
      memo: "アレルギー：甲殻類
      せっかち"
    },{
      name: "鈴木",
      memo: "毎年正月のみご利用"
    },{
      name: "佐藤",
    }
  ]
)

Room.create(
  [
    {
      name: "春日",
      price: 10000
    },{
      name: "音羽",
      price: 20000
    },{
      name: "羽衣",
      price: 20000
    },{
      name: "浮舟",
      price: 25000
    },{
      name: "折鶴",
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

Reservation.create(
  {
    client_id: 1,
    guest: nil,
    member_id: 1,
    room_id: 1,
    kaiseki_id: 1,
    number_of_guest: 1,
    memo: nil,
    date: Date.today,
    status: 1,
    start_hour: 11,
    start_minute: 00
  }
)