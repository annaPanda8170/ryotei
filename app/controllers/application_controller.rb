class ApplicationController < ActionController::Base
  before_action :authenticate_member!
  before_action :have_grade?
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :grade])
  end
  private
  def have_grade?
    path = request.path
    # ログイン・サインイン・ログアウトは無条件で通す。それ以外の場合に対して制限
    if path != "/members/sign_in" && path != "/members/sign_up" && path != "/members/sign_out"
      if  current_member
        if path != "/members/wait" && current_member.grade == nil
          redirect_to wait_members_path
        end
      else
        redirect_to new_member_session_path
      end
    end
  end
end