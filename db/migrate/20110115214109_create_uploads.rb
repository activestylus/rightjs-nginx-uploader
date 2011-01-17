class CreateUploads < ActiveRecord::Migration
  def self.up
    create_table :uploads do |t|
      t.string :file_file_name
      t.integer :file_file_size
      t.string :file_content_type
      t.timestamps
    end
  end

  def self.down
    drop_table :uploads
  end
end
