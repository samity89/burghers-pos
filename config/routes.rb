Rails.application.routes.draw do
  resources :orders, :checks, :products
  resources :users
  devise_for :users

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
