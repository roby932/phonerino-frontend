class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  def authenticate
    if current_user.present?
        return @memo_user
    else
      render json: {error:"invalid token"},status: 400
    end
  end


  def current_user
    token = request.headers['Authorization']
    @memo_user ||= exe_sql("select * from users where auth_token = '#{token}'")
  end

  def exe_sql(sql)
    results = ActiveRecord::Base.connection.execute(sql)
    if results.present?
      results.each(:as => :hash) do |row|
        row
      end
    else
      return nil
    end
  end

  # def nothing
  #   render text: '', content_type: 'text/plain'
  # end

end
