class SalesController < ApplicationController
  before_action :except_1member, except: [:show, :index]
  before_action :submit_branch_create, only: :create
  before_action :submit_branch_update, only: :update
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
  def show
    @sale = Sale.find(params[:id])
    @reservation = Reservation.find(@sale.reservation.id)
    @drinks = Drink.all
    @sales_drinks = SalesDrink.where(sale_id: @sale.id)
  end
  def create
    @sale = Sale.new(sale_params)
    reservation_status = 2
    @reservation = Reservation.find(@sale.reservation.id)
    if @sale.save
      @sale.status == 2 ? reservation_status = 3 : reservation_status = 2
      if @reservation.update(status: reservation_status)
        redirect_to reservations_path
      end
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
    @reservation = Reservation.find(@sale.reservation.id)
    if @sale.update(edit_sale_params)
      @sale.status == 2 ? reservation_status = 3 : reservation_status = 2
      if @reservation.update(status: reservation_status)
        redirect_to reservations_path
      end
    else
      render :edit
    end
  end
  def destroy
    @sale = Sale.find(params[:id])
    @reservation = Reservation.find(@sale.reservation.id)
    @sale.delete
    @reservation.update(status: 1)
    redirect_to reservations_path
  end
  private
  def except_1member
    if current_member.grade == 1
      redirect_to drinks_path
    end
  end
  def submit_branch_create
    case params["ボタン"]
    when "保存" then
      params[:from] == nil
      def sale_params
        params.require(:sale).permit(:reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(member_id: current_member.id)
      end
    when "会計" then
      def sale_params
        params.require(:sale).permit(:mean, :from, :reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(status: 2, member_id: current_member.id)
      end
    end
  end
  def submit_branch_update
    case params["ボタン"]
    when "保存" then
      params[:from] == nil
      def edit_sale_params
        params.require(:sale).permit(:reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(member_id: current_member.id)
      end
    when "会計" then
      def edit_sale_params
        params.require(:sale).permit(:mean, :from, :reservation_id, sales_drinks_attributes: [:drink_id, :number]).merge(status: 2, member_id: current_member.id)
      end
    end
  end
end