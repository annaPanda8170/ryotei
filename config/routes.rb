Rails.application.routes.draw do
  resources :drinks
  # , only: []
  resources :clients
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
  resources :members, except: [:new, :create, :destory] do
    member do
      put "custumDelete"
    end
  end
  root 'myinfos#index'
end
