Rails.application.routes.draw do
  resources :drinks
  # , only: []
  resources :clients, except: :destroy
  resources :reservations, only: [:index, :create, :update] do
    member do
      put "custumDelete"
      put "revival"
      # collectionにして,jsでURLのidを抜いてdataでidを送っても可
      get "takeReservation"
    end
  end
  resources :sales
  resources :sales_drinks, only: :destroy
  # シフト機能実装後用
  # resources :myinfos, only: :index
  devise_for :members, skip: :all
  devise_scope :member do
    get '/members/sign_in' => 'devise/sessions#new', as: :new_member_session
    post '/members/sign_in' => 'devise/sessions#create', as: :member_session
    delete '/members/sign_out' => 'devise/sessions#destroy', as: :destroy_member_session
    get '/members/sign_up' => 'devise/registrations#new', as: :new_member_registration
    post '/members' => 'devise/registrations#create', as: :member_registration
  end
  resources :members, only: [:index, :edit, :update] do
    member do
      put "custumDelete"
    end
    collection do
      get "wait"
    end
  end
  root 'reservations#index'
  # シフト機能実装後用
  # root 'myinfos#index'
end