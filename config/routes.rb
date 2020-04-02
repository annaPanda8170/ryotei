Rails.application.routes.draw do
  resources :reservations, except: :destroy do
    member do
      put "custumDelete"
      put "revival"
    end
  end
  resources :sales
  resources :sales_drinks, only: :destroy
  resources :myinfos, only: :index
  devise_for :members
  root 'myinfos#index'
end
