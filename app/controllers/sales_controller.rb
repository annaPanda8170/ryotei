class SalesController < ApplicationController
  def index
  end

  def new
    # binding.pry
    @reservation = Reservation.find(params[:format])
    @sale = Sale.new
    # binding.pry
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
  def sale_params
    params.require(:sale).permit(:mean, :from, :reservation_id).merge(member_id: current_member.id)
  end
end
