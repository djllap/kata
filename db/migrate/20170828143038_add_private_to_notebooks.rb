class AddPrivateToNotebooks < ActiveRecord::Migration[5.0]
  def change
    add_column :notebooks, :private, :boolean
  end
end
