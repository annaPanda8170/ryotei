require 'rails_helper'

RSpec.describe Reservation, type: :model do
  it "(clientがある ∧ guestがある ∧ memberがある ∧ roomがある ∧ kaisekiがある ∧ number_of_guestがある ∧ dateがある ∧ start_hourが開店時間内である ∧ start_minuteが開店時間内で15の倍数)→◯" do
    expect(FactoryBot.build(:reservation)).to be_valid
  end
  it "statusにはデフォルトで1が入る" do
    reservation = FactoryBot.create(:reservation)
    expect(reservation.status).to eq 1
  end
  it "guestがあればclientがなくても予約できる" do
    expect(FactoryBot.build(:reservation, client: nil)).to be_valid
  end
  it "clientがあればguestがなくても予約できる" do
    expect(FactoryBot.build(:reservation, guest: nil)).to be_valid
  end
  it "memberがないと予約できない" do
    reservation = FactoryBot.build(:reservation, member: nil)
    reservation.valid?
    expect(reservation.errors[:member]).to include("を入力してください")
  end
  it "roomがないと予約できない" do
    reservation = FactoryBot.build(:reservation, room: nil)
    reservation.valid?
    expect(reservation.errors[:room]).to include("を入力してください")
  end
  it "kaisekiがないと予約できない" do
    reservation = FactoryBot.build(:reservation, kaiseki: nil)
    reservation.valid?
    expect(reservation.errors[:kaiseki]).to include("を入力してください")
  end
  it "number_of_guestがないと予約できない" do
    reservation = FactoryBot.build(:reservation, number_of_guest: nil)
    reservation.valid?
    expect(reservation.errors[:number_of_guest]).to include("を入力してください")
  end
  it "start_hourが10である予約できない" do
    reservation = FactoryBot.build(:reservation, start_hour: 10)
    reservation.valid?
    expect(reservation.errors[:start_hour]).to include("時間外です")
  end
  it "start_hourが20である予約できない" do
    reservation = FactoryBot.build(:reservation, start_hour: 20)
    reservation.valid?
    expect(reservation.errors[:start_hour]).to include("時間外です")
  end
  it "予約時間が19:45であると予約できない" do
    reservation = FactoryBot.build(:reservation, start_hour: 19, start_minute: 45)
    reservation.valid?
    expect(reservation.errors[:start_hour]).to include("時間外です")
  end
  it "start_minuteが1であると予約できない" do
    reservation = FactoryBot.build(:reservation, start_minute: 1)
    reservation.valid?
    expect(reservation.errors[:start_minute]).to include("指定できない時間です")
  end
  it "他の予約と、同じ部屋、同じ日、同じ時間には予約できない" do
    room = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    reservation = FactoryBot.build(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    reservation.valid?
    expect(reservation.errors[:date]).to include("すでに予約があります")
  end
  it "他の予約と、同じ日、同じ時間でも、違う部屋であれば予約できる" do
    room1 = FactoryBot.create(:room)
    room2 = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room1, date: Date.today + 100, start_hour: 15, start_minute: 0)
    expect(FactoryBot.build(:reservation, room: room2, date: Date.today + 100, start_hour: 15, start_minute: 0)).to  be_valid
  end
  it "他の予約と、同じ部屋、同じ時間でも、違う日であれば予約できる" do
    room = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    expect(FactoryBot.build(:reservation, room: room, date: Date.today + 101, start_hour: 15, start_minute: 0)).to  be_valid
  end
  it "他の予約と、同じ部屋、同じ日でも、他の予約の2時間30分後であれば予約できる" do
    room = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    expect(FactoryBot.build(:reservation, room: room, date: Date.today + 100, start_hour: 17, start_minute: 30)).to  be_valid
  end
  it "他の予約と、同じ部屋、同じ日でも、他の予約の2時間30分前であれば予約できる" do
    room = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    expect(FactoryBot.build(:reservation, room: room, date: Date.today + 100, start_hour: 12, start_minute: 30)).to  be_valid
  end
  it "他の予約と、同じ部屋、同じ日で、他の予約の2時間15分後であれば予約できない" do
    room = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    reservation = FactoryBot.build(:reservation, room: room, date: Date.today + 100, start_hour: 17, start_minute: 15)
    reservation.valid?
    expect(reservation.errors[:date]).to include("すでに予約があります")
  end
  it "他の予約と、同じ部屋、同じ日で、他の予約の2時間15分前であれば予約できない" do
    room = FactoryBot.create(:room)
    FactoryBot.create(:reservation, room: room, date: Date.today + 100, start_hour: 15, start_minute: 0)
    reservation = FactoryBot.build(:reservation, room: room, date: Date.today + 100, start_hour: 12, start_minute: 45)
    reservation.valid?
    expect(reservation.errors[:date]).to include("すでに予約があります")
  end
end
