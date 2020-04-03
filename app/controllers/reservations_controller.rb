require 'date'

class ReservationsController < ApplicationController
  before_action :signed_in?
  before_action :before_index, only: :index

  def index
    @reservations = Reservation.where(date: @selected_date).where.not(status: 0)
    @deleted_reservations = Reservation.where(date: @selected_date, status: 0)
    @rooms = Room.all
    # 今日か判定してsaleへのリンクを表示
    @today = @this_date.to_date == Date.today
    flash[:this_date_for_new] = @this_date
  end
  def show
    @reservation = Reservation.find(params[:id])
    flash[:this_date] = @reservation.date
  end
  def new
    @reservation = Reservation.new
    flash[:this_date_for_new].present? ? @date = flash[:this_date_for_new] : @date = Date.today + 1
    flash[:this_date] = flash[:this_date_for_new] if flash[:this_date_for_new].present?
  end
  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      flash[:this_date] = @reservation.date
      redirect_to reservations_path
    else
      flash[:this_date].present? ? @date = flash[:this_date] : @date = Date.today + 1
      render :new
    end
  end
  def edit
    @reservation = Reservation.find(params[:id])
    @date = @reservation.date
    flash[:this_date] = @reservation.date
  end
  def update
    @reservation = Reservation.find(params[:id])
    if @reservation.update(reservation_params)
      @reservation.client.nil? ? clientGuest = @reservation.guest : clientGuest = @reservation.client.name
      flash[:this_date] = @reservation.date
      respond_to do |format|
        format.json {render json: 
          {id: @reservation.id, 
          clientGuest: clientGuest,
          numOfGuest: @reservation.number_of_guest,
          memo: @reservation.memo,
          room: @reservation.room.name, 
          hour:@reservation.start_hour,
          minute:@reservation.start_minute
          }}
        format.html {redirect_to reservations_path}
      end 
    else
      flash[:this_date].present? ? @date = flash[:this_date] : @date = Date.today + 1
      render :edit
    end
  end
  def custumDelete
    @reservation = Reservation.find(params[:id])
    if @reservation.update!(status: 0)
      flash[:this_date] = @reservation.date
      redirect_to reservations_path
    else
      render :edit
    end
  end
  def revival
    @reservation = Reservation.find(params[:id])
    if @reservation.update!(status: 1)
      flash[:this_date] = @reservation.date
      redirect_to reservations_path
    else
      render :edit
    end
  end
  private
  def reservation_params
    params.require(:reservation).permit(:client_id, :guest,:room_id, :kaiseki_id, :number_of_guest, :date, :start_hour, :start_minute, :memo).merge(member_id: current_member.id)
  end
  def signed_in?
    redirect_to new_member_session_path unless member_signed_in?
  end
  def before_index
    # createやupdate直後にはその日がflash[:this_date]に入っているのでそれ優先で表示する
    @this_date = flash[:this_date].to_time if flash[:this_date].present?
    # flash[:this_date]に値がなければindexの日指定リンクか直打ちなので分岐する
    # @this_dateは純粋な日情報
    # @selected_dateはwhereデータベース検索用
    # @dateはビュー表示用
    if @this_date.nil?
      case params['ボタン']
      when "検索" then
        @selected_date = "#{params['date(1i)']}-#{params['date(2i)']}-#{params['date(3i)']}"
        @this_date = @selected_date.to_date
        @date = "#{params['date(1i)']}年#{params['date(2i)']}月#{params['date(3i)']}日"
      when "明日" then
        @this_date = Date.today+1
      when "明後日" then
        @this_date = Date.today+2
      when "一週間後" then
        @this_date = Date.today+7
      when "前の日" then
        @this_date = params["this_date"].to_date-1
      when "次の日" then
        @this_date = params["this_date"].to_date+1
      else
        @this_date = Date.today
      end
    end
    @selected_date = @this_date.to_s if @selected_date.nil?
    @date = @this_date.strftime("%Y年%m月%d日") if @date.nil?
  end
end
