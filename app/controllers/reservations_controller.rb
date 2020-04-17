require 'date'

class ReservationsController < ApplicationController
  before_action :before_index, only: :index

  def index
    @reservations = Reservation.where(date: @selected_date).where.not(status: 0).includes(:room, :client, :sale)
    @deleted_reservations = Reservation.where(date: @selected_date, status: 0).includes(:client)
    @rooms = Room.all
    # 今日か判定してsaleへのリンクを表示
    @today = @this_date.to_date == Date.today
    @past = @this_date.to_date < Date.today
    flash[:this_date_for_new] = @this_date

    # new
    @reservation_new = Reservation.new
  end
  def takeReservation
    @reservation_show = Reservation.find(params[:id])
    if @reservation_show.client.present?
      client = @reservation_show.client.name
      clientid = @reservation_show.client.id
    else
      client = ""
      clientid = ""
    end
    if
      guest = @reservation_show.guest
    else
      guest = ""
    end
    if @reservation_show.date >= Date.today
      if @reservation_show.status == 0
        which = "revival"
      elsif @reservation_show.status != 0
        which = "custumDelete"
      end
    end
    if @reservation_show.start_minute == 0
      minute = "00"
    else
      minute = @reservation_show.start_minute
    end
    start_minute = ""
    if @reservation_show.start_minute == 0
      start_minute = "00"
    else
      start_minute = @reservation_show.start_minute
    end
    # binding.pry
    render json: {
      id: @reservation_show.id,
      client: client,
      guest: guest,
      room: @reservation_show.room.name,
      kaiseki: @reservation_show.kaiseki.name,
      number_of_guest: @reservation_show.number_of_guest,
      date: @reservation_show.date.strftime("%Y年%m月%d日"),
      start_hour: @reservation_show.start_hour,
      start_minute: start_minute,
      memo: @reservation_show.memo,
      which: which,
      clientid: clientid,
      roomid: @reservation_show.room.id,
      kaisekiid: @reservation_show.kaiseki.id,
      minute: minute
    }
  end
  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      flash[:this_date] = @reservation.date
      @reservation.client.nil? ? clientGuest = @reservation.guest : clientGuest = @reservation.client.name
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
      respond_to do |format|
        format.json {render json: 
          {message: @reservation.errors.full_messages, 
          }}
        # format.html {redirect_to reservations_path}
      end 
    end
  end
  def edit
    @reservation = Reservation.find(params[:id])
    @date = @reservation.date
    flash[:this_date] = @reservation.date
  end
  def update
    # binding.pry
    if params[:id].nil?
      params_id = params[:reservation][:id]
    else
      params_id = params[:id]
    end
    @reservation = Reservation.find(params_id)
    past_date = @reservation.date
    past_room_id = @reservation.room.id
    past_hour = @reservation.start_hour
    past_minute = @reservation.start_minute
    if @reservation.update(reservation_params)
      now_date = @reservation.date
      same_date = nil
      if past_date == now_date
        same_date = 1
      end
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
          minute:@reservation.start_minute,
          roomid: past_room_id,
          past_hour: past_hour,
          past_minute: past_minute,
          same_date: same_date
          }}
        format.html {redirect_to reservations_path}
      end 
    else

      flash[:this_date].present? ? @date = flash[:this_date] : @date = Date.today + 1
      respond_to do |format|
        format.json {render json: 
          {message: @reservation.errors.full_messages, 
          }}
        # format.html {redirect_to reservations_path}
      end 
    end
  end
  def custumDelete
    @reservation = Reservation.find(params[:id])
    if @reservation.update!(status: 0)
      @reservation.client.nil? ? clientGuest = @reservation.guest : clientGuest = @reservation.client.name
      flash[:this_date] = @reservation.date
      respond_to do |format|
        format.json {render json: 
          {id: @reservation.id, 
          clientGuest: clientGuest,
          numOfGuest: @reservation.number_of_guest,
          roomid: @reservation.room.id, 
          hour:@reservation.start_hour,
          minute:@reservation.start_minute,
          memo: @reservation.memo
          }}
        format.html {redirect_to reservations_path}
      end 
    else
      render :edit
    end
  end
  def revival
    @reservation = Reservation.find(params[:id])
    past_date = @reservation.date
    past_room_id = @reservation.room.id
    past_hour = @reservation.start_hour
    past_minute = @reservation.start_minute
    if @reservation.update(status: 1)
      flash[:this_date] = @reservation.date
      now_date = @reservation.date
      same_date = nil
      if past_date == now_date
        same_date = 1
      end
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
          minute:@reservation.start_minute,
          roomid: past_room_id,
          past_hour: past_hour,
          past_minute: past_minute,
          same_date: same_date
          }}
        format.html {redirect_to reservations_path}
      end 
    else
      flash[:this_date].present? ? @date = flash[:this_date] : @date = Date.today + 1
      respond_to do |format|
        format.json {render json: 
          {message: @reservation.errors.full_messages, 
          }}
        # format.html {redirect_to reservations_path}
      end 
    end
  end
  private
  def reservation_params
    params.require(:reservation).permit(:client_id, :guest,:room_id, :kaiseki_id, :number_of_guest, :date, :start_hour, :start_minute, :memo).merge(member_id: current_member.id)
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
