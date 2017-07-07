class NotebooksController < ApplicationController
  before_action :set_user

  def index
    if @user
      @notebooks = @user.notebooks.all
      @nav = {notebook: nil, list: nil, page: nil}
    end
    

    if request.xhr?
      render :json => @notebooks
    end
  end

  def show
    @notebook = Notebook.find(params[:id])
    @lists = @notebook.lists.all
    @pages = @notebook.pages.all

    if request.xhr?
      render :json => {lists: @lists, pages: @pages}
    end
  end

  def create
    @notebook = @user.notebooks.new(notebook_params)
    @notebook.save

    if request.xhr?
      render :json => @notebook
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy

    if request.xhr?
      render :json => @user.notebooks.all
    end
  end

  def update
    @notebook = Notebook.find(params[:id])

    if @notebook.update(notebook_params)
      if request.xhr?
        render :json => @user.notebooks.all
      end
    end
  end

  # def guest
  #   email = "GUEST" + rand(999999).to_s + "@guest.com"
  #   @u = User.new({:email => email, :password => "password", :password_confirmation => "password" })
    
  #   if @u.save
  #     sign_in(@u)
  #     set_user
  #     @user.notebooks.create(:name => "Jujitsu")
      
  #   end

  #   redirect_to root_path
  # end
end


private

  def set_user
    @user = current_user
  end

  def notebook_params
    params.permit(:name, :user_id)
  end