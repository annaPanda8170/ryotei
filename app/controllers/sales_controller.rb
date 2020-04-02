class SalesController < ApplicationController
  before_action :signed_in?
  before_action :submit_branch, only: :create
  def index
    
  end
  def new
    # リンクからのみこれるように
    redirect_to reservations_path if params[:format].nil?
    @reservation = Reservation.find(params[:format]) if params[:format].present?
    @sale = Sale.new
  end
  def create
    # binding.pry
    @sale = Sale.new(sale_params)
    if @sale.save!
      redirect_to reservations_path
    else
      render :new
    end
  end
  def edit
  end
  private
  def signed_in?
    redirect_to new_member_session_path unless member_signed_in?
  end
  def submit_branch
    case params["ボタン"]
    when "保存" then
      params[:from] == nil
      def sale_params
        params.require(:sale).permit(:mean, :from, :reservation_id).merge(member_id: current_member.id)
      end
    when "会計" then
      params[:status] == 2
      def sale_params
        params.require(:sale).permit(:mean, :from, :reservation_id).merge(status: 2, member_id: current_member.id)
      end
    end
  end
end