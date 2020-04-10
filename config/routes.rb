Rails.application.routes.draw do
  resources :drinks
  # , only: []
  resources :clients
  resources :reservations, only: [:index, :create, :update] do
    member do
      put "custumDelete"
      put "revival"
    end
    collection do
      get "takeReservation"
    end
  end
  resources :sales
  resources :sales_drinks, only: :destroy
  # シフト機能実装後用
  # resources :myinfos, only: :index
  devise_for :members
  resources :members, only: [:index, :edit, :update] do
    member do
      put "custumDelete"
    end
  end
  root 'reservationss#index'
  # シフト機能実装後用
  # root 'myinfos#index'
end