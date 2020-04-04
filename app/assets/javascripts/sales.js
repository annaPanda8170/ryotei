// 保存前に個数が0のドリンクのフォームを消去する
function deleteZero() {
  $(".sale_save").click(function (e) {
    $(".drink_number").each(function () {
      if ($(this).val() == 0) {
        $(`#drink-wrapper${$(this).data("drinkid")}`).remove()
      }
    })
  })
}

// トータルを入れ込む関数。各イベント内に入れる
function saleTotal(timeIdSet) {
  let roomPrice = Number($(".roomPrice").text());
  let kaisekiPrice = Number($(".kaisekiPrice").text());
  let kaisekiNumber = Number($(".kaisekiNumber").text());
  let drinkTotal = 0;
  for(var key in timeIdSet) {
    let drinkPrice = $(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).data("drinkprice")
    let drinkNumber = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).val())
    drinkTotal = drinkTotal + (drinkPrice * drinkNumber)
  }
  let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
  $(".saleSubTotal").text(subTotal)
  $(".saleTax").text(subTotal*.1)
  $(".saleTotal").text(Math.round(subTotal * 1.1))
}

// 全イベントのセット
function eventSet(drinkIds, editOnly) {
  let times = 0;
  let timeIdSet = {};
  // editに保存されてるドリンクをフォームに入れ込む
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
      saleTotal(timeIdSet)
    }
  }
  // ドリンクのボタンを押した時にフォーム増やすか数を増やすか判断
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
    } else {
      $(`input[data-drinkid=${drinkId}]`).val(Number($(`input[data-drinkid=${drinkId}]`).val()) + 1)
    }
    saleTotal(timeIdSet)
  })
  // ドリンク数直接数変え用
  $(document).on("change", ".drink_number", function () {
    saleTotal(timeIdSet)
  })
  // ドリンクフォーム削除
  $(document).on("click", ".delete_drink", function () {
    $(`#drink-wrapper${$(this).data("deletedrinkid")}`).remove()
    deleteDrinkId = Number($(this).data("deletedrinkid"))
    delete timeIdSet[deleteDrinkId];
    drinkIds = drinkIds.filter(function (drinkId) {
      return drinkId !== deleteDrinkId;
    })
    console.log("OKOKOKOK")
    saleTotal(timeIdSet)
  })
  deleteZero();
}

$(function () {
  if (location.pathname.match("sales/new")) {
    let drinkIds = []
    let editOnly = false;
    eventSet(drinkIds, editOnly);
  }

  if (location.pathname.match(/sales\/\d{1,3}\/edit/)) {
    let drinkIds = []
    let editOnly = true;
    eventSet(drinkIds, editOnly);
    // もともと保存されていたものは全て削除
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