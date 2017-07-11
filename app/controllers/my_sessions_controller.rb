class MySessionsController < Devise::SessionsController

  # def destroy

  #   @user = User.find(session[:user_id])

  #   if @user.email.end_with?("@guest.com")
  #     @user.destroy      
  #     session[:user_id] = nil
  #   end

  #   super
  # end
end

