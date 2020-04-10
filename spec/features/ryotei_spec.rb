require 'rails_helper'

RSpec.feature "Ryoteis", type: :feature do
  # jsが動かないのとボタンやリンク以外をクリックする方法がわからないので未完成
  scenario "", js: true do
    member = FactoryBot.create(:member)
    login_as(member, scope: :member)
    visit reservations_path
    click_on "新規予約"
    expect(page).to have_content '登録'
  end
end
