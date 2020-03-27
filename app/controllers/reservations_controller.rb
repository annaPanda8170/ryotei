class ReservationsController < ApplicationController
  def show
  end
  def new
    @reservation = Reservation.new
  end
  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      redirect_to root_path
    else
      render :new
    end
  end
  private
  def reservation_params
    params.require(:reservation).permit(:guest,:room_id, :kaiseki_id, :number_of_guest, :date, :start_time, :memo).merge(member_id: 1)
  end
end
