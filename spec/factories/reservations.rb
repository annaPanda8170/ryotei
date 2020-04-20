FactoryBot.define do
  factory :reservation do
    association :client
    guest {"ぱんだ"}
    association :member
    association :room
    association :kaiseki
    number_of_guest {1}
    date {Date.today + 100}
    start_hour {11}
    start_minute {0}
    memo {nil}
  end
end
