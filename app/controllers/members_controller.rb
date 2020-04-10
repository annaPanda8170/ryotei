class MembersController < ApplicationController
  before_action :set_member, except: :index
  before_action :change_grade, only: [:edit, :update, :destory]
  def index
    if params[:gradeless] || flash[:gradeless]
      @members = Member.where(grade: nil)
      @gradelessIndex = true
    else
      @members = Member.all
      @gradeLess = Member.where(grade: nil).length
    end
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
  def change_grade
    if current_member.grade != 3
      redirect_to members_path
    end
  end
end
