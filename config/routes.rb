Rails.application.routes.draw do
  resources :orders, :checks, :products
  resources :users
  devise_for :users
end
