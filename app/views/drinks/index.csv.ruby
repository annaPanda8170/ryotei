require 'csv'

CSV.generate do |csv|
  column_drinks = %w(name price)
  csv << column_drinks
  @drinks.each do |d|
    column_values = [
      d.name,
      d.price
    ]
    csv << column_values
  end
end