# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151227151334) do

  create_table "addresses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "phone"
    t.string   "address"
    t.string   "country"
    t.string   "city"
    t.string   "zipcode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "addresses", ["user_id"], name: "index_addresses_on_user_id"

  create_table "auctions", force: :cascade do |t|
    t.integer  "phone_id"
    t.integer  "user_id"
    t.integer  "offered_price"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "auctions", ["phone_id"], name: "index_auctions_on_phone_id"
  add_index "auctions", ["user_id"], name: "index_auctions_on_user_id"

  create_table "details", force: :cascade do |t|
    t.integer  "phone_id"
    t.string   "brand"
    t.string   "model"
    t.integer  "camera"
    t.integer  "screen_size"
    t.string   "additonal_info"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "details", ["phone_id"], name: "index_details_on_phone_id"

  create_table "phones", force: :cascade do |t|
    t.string   "name"
    t.string   "status"
    t.string   "state"
    t.integer  "startPrice"
    t.integer  "buyoutPrice"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "auth_token"
    t.string   "email"
    t.string   "password"
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
