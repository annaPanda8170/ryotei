require 'test_helper'

class MyinfosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get myinfos_index_url
    assert_response :success
  end

end
