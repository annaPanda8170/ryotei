Rails.application.routes.draw do
  resources :reservations, except: :delete
  resources :sales
  devise_for :members
  get 'myinfos/index'
  root 'myinfos#index'
end
