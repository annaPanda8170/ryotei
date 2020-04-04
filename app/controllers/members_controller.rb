class MembersController < ApplicationController
  before_action :signed_in?
  before_action :set_member, except: :index
  before_action :change_grade, only: [:edit, :update, :destory]
  def index
    # binding.pry
    if params[:gradeless] || flash[:gradeless]
      @members = Member.where(grade: nil)
      @rrr = true
    else
      @members = Member.all
    end
  end
  def show
  end
  def edit
  end
  def update
    if @member.update(member_params)
      redirect_to members_path
    else
      render :edit
    end
  end
  def custumDelete
    if @member.update(grade: 0)
      flash[:gradeless] = 1
      redirect_to members_path
    else
      render :show
    end
  end
  private
  def set_member
    @member = Member.find(params[:id])
  end
  def member_params
    params.require(:member).permit(:grade)
  end
  def signed_in?
    redirect_to new_member_session_path unless member_signed_in?
  end
  def change_grade
    if current_member.grade != 3
      redirect_to members_path
    end
  end
end
