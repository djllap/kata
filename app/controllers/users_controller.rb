class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @notebooks = @user.notebooks.all
    @nav = {notebook: nil, list: nil, page: nil}
  end
end
