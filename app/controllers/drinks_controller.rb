class DrinksController < ApplicationController
  before_action :except_1member, except: [:index, :show]
  before_action :set_drink, except: [:new, :create, :index]
  def index
    @drinks = Drink.all
  end
  def show
    @drink = Drink.find(params[:id])
  end
  def new
    @drink = Drink.new
    @drink_price = 10
  end
  def create
    @drink = Drink.new(drink_params)
    if @drink.save
      redirect_to drinks_path
    else
      render :new
    end
  end
  def edit
    @drink_price = @drink.price/100
  end
  def update
    if @drink.update(drink_params)
      redirect_to drinks_path
    else
      render :edit
    end
  end
  def destroy
    if @drink.delete
      redirect_to drinks_path
    else
      render :index
    end
  end
  private
  def set_drink
    @drink = Drink.find(params[:id])
  end
  def except_1member
    if current_member.grade == 1
      redirect_to drinks_path
    end
  end
  def drink_params
    params[:drink][:price] = params[:drink][:price].to_i*100
    params.require(:drink).permit(:name, :price, :category, :discription, :memo)
  end
end
