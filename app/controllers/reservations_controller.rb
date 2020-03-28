require 'date'

class ReservationsController < ApplicationController
  before_action :before_index, only: :index

  def index
    # フォームの日付を受け取っていればその日(2回目以降)、1回目は今日
    if params['date(1i)'].nil?
      @selected_date = Date.today.to_s
      @date = Date.today.strftime("%Y年%m月%d日")
    end
    @reservations = Reservation.where(date: @selected_date)
  end
  def show
    @reservation = Reservation.find(params[:id])
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
  def edit
    @reservation = Reservation.find(params[:id])
  end
  def update
    @reservation = Reservation.find(params[:id])
    if @reservation.update(reservation_params)
      redirect_to root_path
    else
      render :edit
    end
  end
  private
  def reservation_params
    params.require(:reservation).permit(:guest,:room_id, :kaiseki_id, :number_of_guest, :date, :start_time, :memo).merge(member_id: 1)
  end
  def before_index
    if params['date(1i)'].present?
      @selected_date = "#{params['date(1i)']}-#{params['date(2i)']}-#{params['date(3i)']}"
      @date = "#{params['date(1i)']}年#{params['date(2i)']}月#{params['date(3i)']}日"
    end
  end
end
