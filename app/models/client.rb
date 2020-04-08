class Client < ApplicationRecord
    validates :name, presence: true
    has_many :reservations
    def self.dates_set(clients)
        c_d = {}
        clients.each do |c|
            dates = []
            if c.reservations
                c.reservations.each do |r|
                    dates << r.date
                end
            end
            sorted_dates = dates.sort.reverse
            c_d[c.id] = sorted_dates
        end
        return c_d
    end
end
