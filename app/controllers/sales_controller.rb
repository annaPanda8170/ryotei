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
    @sale.sales_drinks.build
    @drinks = Drink.all
  end
  def create
    @sale = Sale.new(sale_params)
    if @sale.save!
      redirect_to reservations_path
    else
      render :new
    end
  end
  def edit
    @sale = Sale.find(params[:id])
    @sale.sales_drinks.build
    @reservation = Reservation.find(@sale.reservation_id)
    @drinks = Drink.all
    @sales_drinks = SalesDrink.where(sale_id: @sale.id)
  end
  def update
    @sale = Sale.find(params[:id])
    if @sale.update!(edit_sale_params)
      redirect_to reservations_path
    else
      render :edit
    end
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
        params.require(:sale).permit(:mean, :from, :reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(member_id: current_member.id)
      end
    when "会計" then
      params[:status] == 2
      def sale_params
        params.require(:sale).permit(:mean, :from, :reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(status: 2, member_id: current_member.id)
      end
    end
  end
  def edit_sale_params
    params.require(:sale).permit(:mean, :from, :reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(member_id: current_member.id)
  end
end