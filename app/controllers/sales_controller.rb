class SalesController < ApplicationController
  before_action :signed_in?
  def index
    
  end
  def new
    redirect_to root_path if params[:format].nil?
    @reservation = Reservation.find(params[:format]) if params[:format].present?
    @sale = Sale.new
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
  end
  private
  def signed_in?
    redirect_to root_path unless member_signed_in?
  end
  def sale_params
    params.require(:sale).permit(:mean, :from, :reservation_id).merge(member_id: current_member.id)
  end
end