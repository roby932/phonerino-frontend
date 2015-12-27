class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

def authenticate
    if current_user.present?
        return @memo_user
    else
      render json: {error:"invalid token"}
    end
  end


  def current_user
    token = request.headers['Authorization']
    @memo_user ||= User.find_by(auth_token: token)
  end

end
