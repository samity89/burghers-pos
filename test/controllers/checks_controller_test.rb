require "test_helper"

class ChecksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @check = checks(:one)
  end

  test "should get index" do
    get checks_url, as: :json
    assert_response :success
  end

  test "should create check" do
    assert_difference("Check.count") do
      post checks_url, params: { check: { status: @check.status, user_id: @check.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show check" do
    get check_url(@check), as: :json
    assert_response :success
  end

  test "should update check" do
    patch check_url(@check), params: { check: { status: @check.status, user_id: @check.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy check" do
    assert_difference("Check.count", -1) do
      delete check_url(@check), as: :json
    end

    assert_response :no_content
  end
end
