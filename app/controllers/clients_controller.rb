class ClientsController < ApplicationController
  def index
    @clients = Client.all
    # 各クライアントに対する予約の日々を新しい順に並べ替えしたものとidのセット
    @clients_dates = Client.dates_set(@clients)
  end
  def show
    @client = Client.find(params[:id])
    @reservation = Reservation.where(client_id: @client.id)
  end
  def new
    @client = Client.new
  end
  def create
    @client = Client.new(client_params)
    if @client.save
      redirect_to clients_path
    else
      render :new
    end
  end
  def edit
    @client = Client.find(params[:id])
  end
  def update
    @client = Client.find(params[:id])
    if @client.update(client_params)
      redirect_to clients_path
    else
      render :edit
    end
  end
  def destroy
    @client = Client.find(params[:id])
    @client.delete
    redirect_to clients_path
  end
  private
  def client_params
    params.require(:client).permit(:name, :memo)
  end
end