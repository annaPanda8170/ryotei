require 'rails_helper'

RSpec.describe Client, type: :model do
  it "名前があれば登録できる" do
    expect(FactoryBot.build(:client)).to be_valid 
  end
  it "メモがあっても登録できる" do
    expect(FactoryBot.build(:client, memo: "1番のお得様です。")).to be_valid
  end
  it "名前がないと登録できない" do
    client = FactoryBot.build(:client, name: nil)
    client.valid?
    expect(client.errors[:name]).to include("を入力してください")
  end
end
