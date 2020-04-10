require 'selenium-webdriver'
require 'securerandom'

options = Selenium::WebDriver::Chrome::Options.new
# options.add_argument('--headless')
d = Selenium::WebDriver.for :chrome, options: options
wait = Selenium::WebDriver::Wait.new(:timeout => 15)

d.get("http://54.238.212.131")
puts "URL入れた"

wait.until { d.find_element(:id, "member_email").displayed? }
puts "入った"


d.find_element(:id, 'member_email').send_keys('a@a')
d.find_element(:id, 'member_password').send_keys('123123123')
d.find_element(:xpath, '//*[@id="new_member"]/div[4]/input').click
d.save_screenshot("/Users/handaryouhei/Desktop/#{SecureRandom.hex(16)}.png")

# d.save_screenshot("/Users/handaryouhei/Desktop/#{SecureRandom.hex(16)}.png")
# item_name = d.find_element(:class, "item_name").find_element(:tag_name, 'b').text.match(/\(/).pre_match
# image = d.find_element(:class, "rakutenLimitedId_ImageMain1-3").find_element(:tag_name, 'img').attribute("src")
# max_quantity = d.find_element(:class, 'rItemUnits').find_elements(:tag_name, 'option').length
# if expendable.name.blank?
#   expendable.name = item_name
#   puts "名前入れた"
# end
# expendable.image = image
# expendable.max_quantity = max_quantity
# expendable.save
# d.get("https://member.id.rakuten.co.jp/rms/nid/logout")
# puts "finishsh"
 




# d.save_screenshot("/Users/handaryouhei/Desktop/#{SecureRandom.hex(16)}.png")