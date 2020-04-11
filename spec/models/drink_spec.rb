require 'rails_helper'

RSpec.describe Drink, type: :model do
  it "名前と値段とカテゴリーがあれば登録できる" do
    expect(FactoryBot.build(:drink)).to be_valid 
  end
  it "説明があっても登録できる" do
    expect(FactoryBot.build(:drink, discription: "五大シャトーです。")).to be_valid 
  end
  it "メモがあっても登録できる" do
    expect(FactoryBot.build(:drink, memo: "五大シャトーです。")).to be_valid 
  end
  it "名前がないと登録できない" do
    drink = FactoryBot.build(:drink, name: nil)
    drink.valid?
    expect(drink.errors[:name]).to include("を入力してください")
  end
  it "値段がないと登録できない" do
    drink = FactoryBot.build(:drink, price: nil)
    drink.valid?
    expect(drink.errors[:price]).to include("を入力してください")
  end
  it "カテゴリーがないと登録できない" do
    drink = FactoryBot.build(:drink, category: nil)
    drink.valid?
    expect(drink.errors[:category]).to include("を入力してください")
  end
end
