function deleteZero() {
  $(".sale_save").click(function (e) {
    $(".drink_number").each(function () {
      if ($(this).val() == 0) {
        $(`#drink-wrapper${$(this).data("drinkid")}`).remove()
      }
    })
  })
}

$(function () {
  if (location.pathname.match("sales/new")) {
    let drinkIds = []

    $(".sales__drink").click(function () {
      length = drinkIds.length
      drinkId = $(this).data("id")
      drinkName = $(this).data("name")
      drinkPrice = $(this).data("price")
      if ($.inArray(Number(drinkId), drinkIds) < 0) {
        $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
            <div>${drinkName}</div><p>${drinkPrice}</p>
            <input type="hidden" name="sale[sales_drinks_attributes][${length}][drink_id]" id="sale_sales_drinks_attributes_${length}_drink_id" value="${drinkId}">
            <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${length}][number]" id="sale_sales_drinks_attributes_${length}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=1>
            <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
          </div>`)
        drinkIds.push(drinkId)
      } else {
        $(`input[data-drinkid=${drinkId}]`).val(Number($(`input[data-drinkid=${drinkId}]`).val()) + 1)
      }
      let roomPrice = Number($(".roomPrice").text());
      let kaisekiPrice = Number($(".kaisekiPrice").text());
      let kaisekiNumber = Number($(".kaisekiNumber").text());
      let drinkTotal = 0;
      for (let i = 0; i < drinkIds.length; i++){
        let drinkPrice = $(`#sale_sales_drinks_attributes_${i}_number`).data("drinkprice")
        let drinkNumber = Number($(`#sale_sales_drinks_attributes_${i}_number`).val())
        drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
      }
      let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
      $(".saleSubTotal").text(subTotal)
      $(".saleTax").text(subTotal*.1)
      $(".saleTotal").text(Math.round(subTotal * 1.1))
    })

    $(document).on("click", ".delete_drink", function () {
      $(`#drink-wrapper${$(this).data("deletedrinkid")}`).remove()
      deleteDrinkId = Number($(this).data("deletedrinkid"))
      drinkIds = drinkIds.filter(function (drinkId) {
        return drinkId !== deleteDrinkId;
      })
    })
    
    deleteZero();
  }

  if (location.pathname.match(/sales\/\d{1,3}\/edit/)) {
    let drinkIds = []
    // 一度全て削除してフォームに値を入れ直してappend
    for (i = 0; i < $(".saledrink").length; i++){
      drinkId = $(`#saledrink${i}`)[0].dataset.drinkid
      drinkNumber = $(`#saledrink${i}`)[0].dataset.number
      drinkName = $(`#saledrink${i}`)[0].dataset.name
      drinkPrice = $(`#saledrink${i}`)[0].dataset.price
      $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
        <div>${drinkName}</div><p>${drinkPrice}</p>
        <input type="hidden" name="sale[sales_drinks_attributes][${i}][drink_id]" id="sale_sales_drinks_attributes_${i}_drink_id" value="${drinkId}">
        <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${i}][number]" id="sale_sales_drinks_attributes_${i}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=${drinkNumber}>
        <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
      </div>`)
      drinkIds.push(Number(drinkId))
    }
    $(".sales__drink").click(function () {
      length = drinkIds.length
      drinkId = $(this).data("id")
      drinkName = $(this).data("name")
      drinkPrice = $(this).data("price")
      if ($.inArray(Number(drinkId), drinkIds) < 0) {
        $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
            <div>${drinkName}</div><p>${drinkPrice}</p>
            <input type="hidden" name="sale[sales_drinks_attributes][${length}][drink_id]" id="sale_sales_drinks_attributes_${length}_drink_id" value="${drinkId}">
            <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${length}][number]" id="sale_sales_drinks_attributes_${length}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=1>
            <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
          </div>`)
        drinkIds.push(drinkId)
      } else {
        $(`input[data-drinkid=${drinkId}]`).val(Number($(`input[data-drinkid=${drinkId}]`).val()) + 1)
      }
      let roomPrice = Number($(".roomPrice").text());
      let kaisekiPrice = Number($(".kaisekiPrice").text());
      let kaisekiNumber = Number($(".kaisekiNumber").text());
      let drinkTotal = 0;
      for (let i = 0; i < drinkIds.length; i++){
        let drinkPrice = $(`#sale_sales_drinks_attributes_${i}_number`).data("drinkprice")
        let drinkNumber = Number($(`#sale_sales_drinks_attributes_${i}_number`).val())
        drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
      }
      let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
      $(".saleSubTotal").text(subTotal)
      $(".saleTax").text(subTotal*.1)
      $(".saleTotal").text(Math.round(subTotal * 1.1))
    })
    $(document).on("click", ".delete_drink", function () {
      $(`#drink-wrapper${$(this).data("deletedrinkid")}`).remove()
      deleteDrinkId = Number($(this).data("deletedrinkid"))
      drinkIds = drinkIds.filter(function (drinkId) {
        return drinkId !== deleteDrinkId;
      })
    })
    deleteZero();
    $(".sale_save").click(function (e) {
      for (i = 0; i < $(".saledrink").length; i++){
        salesDrinksId = $(`#saledrink${i}`)[0].dataset.id
        $.ajax({
          url: `/sales_drinks/${salesDrinksId}`,
          type: "DELETE",
          data: { sales_drinks: { "id": salesDrinksId } }
        })
      }
    })
  }
})