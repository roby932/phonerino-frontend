class User < ActiveRecord::Base
  before_save :ensure_authentication_token

  has_many :addresses
  has_many :auctions

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :email
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  validates_uniqueness_of :email
  validates_presence_of :password
  validates_length_of :password, :minimum => 6

  def ensure_authentication_token
    if auth_token.blank?
      self.auth_token = SecureRandom.hex(3)
    end
  end


end
