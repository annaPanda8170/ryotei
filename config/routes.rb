Rails.application.routes.draw do
  resources :reservations, except: :delete do
    member do
      put "custumDelete"
      put "revival"
    end
  end
  resources :sales
  resources :myinfos, only: :index
  devise_for :members
  root 'myinfos#index'
end
