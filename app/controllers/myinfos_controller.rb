class MyinfosController < ApplicationController
  before_action :signed_in?
  def index
  end
  private
  def signed_in?
    redirect_to new_member_session_path unless member_signed_in?
  end
end
