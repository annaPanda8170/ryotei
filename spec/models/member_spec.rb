require 'rails_helper'

RSpec.describe Member, type: :model do
  it "(nameがある ∧ Emailに@が一つありその前後に@と空白以外が1文字以上ずつ ∧ passwordが6文字以上で確認と一致している)→◯" do
    expect(FactoryBot.build(:member)).to be_valid
  end
  it "nameがないと登録できない" do
    member = FactoryBot.build(:member, name: "")
    member.valid?
    expect(member.errors[:name]).to include("を入力してください")
  end
  it "Emailに@がないと登録できない" do
    member = FactoryBot.build(:member, email: "aaa")
    member.valid?
    expect(member.errors[:email]).to include("は不正な値です")
  end
  it "Emailに@が2つあると登録できない" do
    member = FactoryBot.build(:member, email: "a@@a")
    member.valid?
    expect(member.errors[:email]).to include("は不正な値です")
  end
  it "Emailの途中に空白があると登録できない" do
    member = FactoryBot.build(:member, email: "a @a")
    member.valid?
    expect(member.errors[:email]).to include("は不正な値です")
  end
  it "2人のユーザーについて、Emailがユニークであると登録できる" do
    FactoryBot.create(:member, email: "a@a")
    expect(FactoryBot.build(:member, email: "b@b")).to be_valid
  end
  it "2人のユーザーについて、Emailがユニークでないと登録できない" do
    FactoryBot.create(:member, email: "a@a")
    member = FactoryBot.build(:member, email: "a@a")
    member.valid?
    expect(member.errors[:email]).to include("はすでに存在します")
  end
  it "passwordが5文字であると登録できない" do
    member = FactoryBot.build(:member, password: "12345", password_confirmation: "12345")
    member.valid?
    expect(member.errors[:password]).to include("は6文字以上で入力してください")
  end
  it "passwordが確認と一致していないと登録できない" do
    member = FactoryBot.build(:member, password: "12346", password_confirmation: "654321")
    member.valid?
    expect(member.errors[:password_confirmation]).to include("とPasswordの入力が一致しません")
  end
end
