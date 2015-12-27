class Phone < ActiveRecord::Base
  has_one :brand
  has_many :auctions
end
