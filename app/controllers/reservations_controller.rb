class ReservationsController < ApplicationController
  def show
  end
  def new
    @reservation = Reservation.new
  end
  def create
    @reservation = Reservation.new
  end
end
