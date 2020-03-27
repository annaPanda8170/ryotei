Rails.application.routes.draw do
  resources :reservations
  devise_for :members
  get 'myinfos/index'
  root 'myinfos#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
