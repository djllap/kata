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

  def self.public
    where("private == false")
  end

  def guest
    email = "GUEST" + rand(999999).to_s + "@guest.com"
    @u = User.new({:email => email, :password => "password", :password_confirmation => "password" })
    
    if @u.save
      sign_in(@u)
      set_user
      @n = @user.notebooks.create!({:name => "Test Notebook"})
      @l1 = @n.lists.create!({:name => "List 1"})
      @l2 = @n.lists.create!({:name => "List 2"})
      @l3 = @n.lists.create!({:name => "List 3"})
      @l4 = @n.lists.create!({:name => "List 4"})
      @l5 = @n.lists.create!({:name => "List 5"})
      @p1 = @n.pages.create!({:name => "Page 1", :content => "Technique 1 belongs only to List 1", :list_ids => [@l1.id]})
      @p2 = @n.pages.create!({:name => "Page 2", :content => "Technique 2 belongs to List 1 and List 2", :list_ids => [@l1.id, @l2.id]})
      @p3 = @n.pages.create!({:name => "Page 3", :content => "Technique 3 belongs only to List 2", :list_ids => [@l2.id]})
      @p4 = @n.pages.create!({:name => "Page 4", :content => "Technique 4 belongs only to List 1", :list_ids => [@l1.id]})
      @p5 = @n.pages.create!({:name => "Page 5", :content => "Technique 5 only belongs to List 5", :list_ids => [@l5.id]})
      @p6 = @n.pages.create!({:name => "Page 6", :content => "Technique 6 is in all 5 lists", :list_ids => [@l1.id, @l2.id, @l3.id, @l4.id, @l5.id]})
      @p7 = @n.pages.create!({:name => "Page 7", :content => "Technique 7 is in lists 3 - 5", :list_ids => [@l3.id, @l4.id, @l5.id]})
      @p8 = @n.pages.create!({:name => "Page 8", :content => "Technique 8 is in all odd number lists", :list_ids => [@l1.id, @l3.id, @l5.id]})
      @p9 = @n.pages.create!({:name => "Page 9", :content => "Technique 9 is in all even number lists", :list_ids => [@l2.id, @l4.id]})
      @p10 = @n.pages.create!({:name => "Page 10", :content => "Technique 10 is only in list 4", :list_ids => [@l4.id]})

    else 
      guest
    end

    redirect_to root_path
  end
end


private

  def set_user
    @user = current_user
  end

  def notebook_params
    params.permit(:name, :user_id, :private)
  end