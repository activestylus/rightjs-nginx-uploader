class Upload < ActiveRecord::Base

  has_attached_file :file,
    :url => "/system/files/:id/:basename_:style.:extension",
    :path => ":rails_root/public/system/files/:id/:basename_:style.:extension",
    :styles => {:icon => "60x60>", :thumb => "120x120>", :large => "240x240>"}

end
