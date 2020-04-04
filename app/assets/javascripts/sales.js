function deleteZero() {
  $(".sale_save").click(function (e) {
    $(".drink_number").each(function () {
      if ($(this).val() == 0) {
        $(`#drink-wrapper${$(this).data("drinkid")}`).remove()
      }
    })
  })
}

function eventSetet(drinkIds, editOnly) {
  let times = 0;
  let timeIdSet = {};
  if (editOnly){
    for (i = 0; i < $(".saledrink").length; i++) {
      drinkId = $(`#saledrink${i}`)[0].dataset.drinkid
      drinkNumber = $(`#saledrink${i}`)[0].dataset.number
      drinkName = $(`#saledrink${i}`)[0].dataset.name
      drinkPrice = $(`#saledrink${i}`)[0].dataset.price
      $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
        <div>${drinkName}</div><p>${drinkPrice}</p>
        <input type="hidden" name="sale[sales_drinks_attributes][${times}][drink_id]" id="sale_sales_drinks_attributes_${times}_drink_id" value="${drinkId}">
        <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${times}][number]" id="sale_sales_drinks_attributes_${times}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=${drinkNumber}>
        <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
      </div>`)
      drinkIds.push(Number(drinkId))
      timeIdSet[Number(drinkId)] = times;
      times++;
      console.log(timeIdSet);
      let roomPrice = Number($(".roomPrice").text());
      // console.log(roomPrice)
      let kaisekiPrice = Number($(".kaisekiPrice").text());
      // console.log(kaisekiPrice)
      let kaisekiNumber = Number($(".kaisekiNumber").text());
      // console.log(kaisekiNumber)
      let drinkTotal = 0;
      // for (let i = 0; i < drinkIds.length; i++){
      for(var key in timeIdSet) {
        let drinkPrice = $(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).data("drinkprice")
        let drinkNumber = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).val())
        console.log(drinkPrice)
        console.log(drinkNumber)
        console.log(timeIdSet[key])
        console.log(key)
        drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
      }
      console.log("------------------")
      let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
      $(".saleSubTotal").text(subTotal)
      $(".saleTax").text(subTotal*.1)
      $(".saleTotal").text(Math.round(subTotal * 1.1))
    }
  }
  $(".sales__drink").click(function () {
    length = drinkIds.length
    drinkId = $(this).data("id")
    drinkName = $(this).data("name")
    drinkPrice = $(this).data("price")
    if ($.inArray(Number(drinkId), drinkIds) < 0) {
      $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
          <div>${drinkName}</div><p>${drinkPrice}</p>
          <input type="hidden" name="sale[sales_drinks_attributes][${times}][drink_id]" id="sale_sales_drinks_attributes_${times}_drink_id" value="${drinkId}">
          <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${times}][number]" id="sale_sales_drinks_attributes_${times}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=1>
          <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
        </div>`)
      drinkIds.push(drinkId)
      timeIdSet[Number(drinkId)] = times;
      times++;
      console.log(timeIdSet);
    } else {
      $(`input[data-drinkid=${drinkId}]`).val(Number($(`input[data-drinkid=${drinkId}]`).val()) + 1)
    }
    // console.log(drinkIds)
    let roomPrice = Number($(".roomPrice").text());
    // console.log(roomPrice)
    let kaisekiPrice = Number($(".kaisekiPrice").text());
    // console.log(kaisekiPrice)
    let kaisekiNumber = Number($(".kaisekiNumber").text());
    // console.log(kaisekiNumber)
    let drinkTotal = 0;
    // for (let i = 0; i < drinkIds.length; i++){
    for(var key in timeIdSet) {
      let drinkPrice = $(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).data("drinkprice")
      let drinkNumber = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).val())
      console.log(drinkPrice)
      console.log(drinkNumber)
      console.log(timeIdSet[key])
      console.log(key)
      drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
    }
    console.log("------------------")
    let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
    $(".saleSubTotal").text(subTotal)
    $(".saleTax").text(subTotal*.1)
    $(".saleTotal").text(Math.round(subTotal * 1.1))
  })
  $(".drink_number").change(function(){
    let roomPrice = Number($(".roomPrice").text());
    // console.log(roomPrice)
    let kaisekiPrice = Number($(".kaisekiPrice").text());
    // console.log(kaisekiPrice)
    let kaisekiNumber = Number($(".kaisekiNumber").text());
    // console.log(kaisekiNumber)
    let drinkTotal = 0;
    // for (let i = 0; i < drinkIds.length; i++){
    for(var key in timeIdSet) {
      let drinkPrice = $(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).data("drinkprice")
      let drinkNumber = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).val())
      console.log(drinkPrice)
      console.log(drinkNumber)
      console.log(timeIdSet[key])
      console.log(key)
      drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
    }
    console.log("------------------")
    let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
    $(".saleSubTotal").text(subTotal)
    $(".saleTax").text(subTotal*.1)
    $(".saleTotal").text(Math.round(subTotal * 1.1))
  })
  $(document).on("click", ".delete_drink", function () {
    $(`#drink-wrapper${$(this).data("deletedrinkid")}`).remove()
    deleteDrinkId = Number($(this).data("deletedrinkid"))
    delete timeIdSet[deleteDrinkId];
    console.log(timeIdSet)
    drinkIds = drinkIds.filter(function (drinkId) {
      return drinkId !== deleteDrinkId;
    })
    // console.log(drinkIds)
    let roomPrice = Number($(".roomPrice").text());
    // console.log(roomPrice)
    let kaisekiPrice = Number($(".kaisekiPrice").text());
    // console.log(kaisekiPrice)
    let kaisekiNumber = Number($(".kaisekiNumber").text());
    // console.log(kaisekiNumber)
    let drinkTotal = 0;
    // for (let i = 0; i < drinkIds.length; i++){
    for(var key in timeIdSet) {
      let drinkPrice = $(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).data("drinkprice")
      let drinkNumber = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).val())
      console.log(drinkPrice)
      console.log(drinkNumber)
      console.log(timeIdSet[key])
      console.log(key)
      drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
    }
    console.log("------------------")
    let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
    $(".saleSubTotal").text(subTotal)
    $(".saleTax").text(subTotal*.1)
    $(".saleTotal").text(Math.round(subTotal * 1.1))
  })
  deleteZero();
}
$(function () {
  if (location.pathname.match("sales/new")) {
    let drinkIds = []
    let editOnly = false;
    eventSetet(drinkIds, editOnly);
  }

  if (location.pathname.match(/sales\/\d{1,3}\/edit/)) {
    let drinkIds = []
    let editOnly = true;
    eventSetet(drinkIds, editOnly);
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