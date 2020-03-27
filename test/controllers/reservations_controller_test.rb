require 'test_helper'

class ReservationsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get reservations_show_url
    assert_response :success
  end

end
