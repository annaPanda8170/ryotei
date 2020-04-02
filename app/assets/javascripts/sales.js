$(function () {
  let drink_forms = "";
  let idLength = $(".aaa")[0].dataset.length
  for (i = 1; i < idLength; i++){
    drinkName = $(`#drink-${i}`)[0].dataset.name
    drink_forms = drink_forms + `<div class="sales__drink" data-num="${i}" id="sales__drink${i}">${drinkName}</div>
    <input type="hidden" class="bbb", name="sale[sales_drinks_attributes][${i}][drink_id]" id="sale_sales_drinks_attributes_${i}_drink_id", value="${i+1}">
    <input type="number" name="sale[sales_drinks_attributes][${i}][number]" id="sale_sales_drinks_attributes_${i}_number", value=0>`
  }
  $(".aaa").append(drink_forms)
  for (i = 0; i < idLength; i++) {
    $(`#sales__drink${i}`).click(function () {
      dataNum = $(this)[0].dataset.num
      $(`#sale_sales_drinks_attributes_${dataNum}_number`)[0].value = Number($(`#sale_sales_drinks_attributes_${dataNum}_number`)[0].value) + 1
      
    })
  }
})