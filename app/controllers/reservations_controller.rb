require 'date'

class ReservationsController < ApplicationController
  before_action :before_index, only: :index

  def index
    # フォームの日付を受け取っていればその日(2回目以降)、1回目は今日
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
      redirect_to reservations_path
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
      respond_to do |format|
        format.json {render json: {room: @reservation.room.name, time:@reservation.start_time.strftime("%H") }}
        format.html {redirect_to root_path}
      end
      
    else
      render :edit
    end
  end
  private
  def reservation_params
    
    params.require(:reservation).permit(:guest,:room_id, :kaiseki_id, :number_of_guest, :date, :start_time, :memo).merge(member_id: 1)
  end
  def before_index
    case params['ボタン']
    when "検索" then
      @selected_date = "#{params['date(1i)']}-#{params['date(2i)']}-#{params['date(3i)']}"
      @this_date = @selected_date.to_date
      @date = "#{params['date(1i)']}年#{params['date(2i)']}月#{params['date(3i)']}日"
    when "明後日" then
      @this_date = Date.today+1
    when "一週間後" then
      @this_date = Date.today+7
    when "前の日" then
      @this_date = params["this_date"].to_date-1
    when "次の日" then
      @this_date = params["this_date"].to_date+1
    else
      @this_date = Date.today
    end
    @selected_date = @this_date.to_s if @selected_date.nil?
    @date = @this_date.strftime("%Y年%m月%d日") if @date.nil?
  end
end
