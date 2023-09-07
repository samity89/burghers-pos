class CreateChecks < ActiveRecord::Migration[7.0]
  def change
    create_table :checks do |t|
      t.integer :user_id
      t.boolean :open

      t.timestamps
    end
  end
end
