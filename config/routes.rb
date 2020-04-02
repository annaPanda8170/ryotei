Rails.application.routes.draw do
  resources :reservations, except: :delete
  resources :sales
  resources :myinfos, only: :index
  devise_for :members
  root 'myinfos#index'
end
