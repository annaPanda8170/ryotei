class SalesDrinksController < ApplicationController
  def destroy
    @salesdrink = SalesDrink.find(params[:id])
    @salesdrink.delete
  end
end
