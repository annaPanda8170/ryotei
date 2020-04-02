function appendForm(drinkIds) {
  $(".sales__drink").click(function () {
    length = drinkIds.length
    drinkId = $(this).data("id")
    drinkName = $(this).data("name")
    if ($.inArray(Number(drinkId), drinkIds) < 0) {
      $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
          <div>${drinkName}</div>
          <input type="number" name="sale[sales_drinks_attributes][${length}][drink_id]" id="sale_sales_drinks_attributes_${length}_drink_id" value="${drinkId}">
          <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${length}][number]" id="sale_sales_drinks_attributes_${length}_number" data-drinkid=${drinkId} value=1>
          <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
        </div>`)
      drinkIds.push(drinkId)
    } else {
      $(`input[data-drinkid=${drinkId}]`).val(Number($(`input[data-drinkid=${drinkId}]`).val()) + 1)
    }
  })
}

function deleteForm() {
  $(document).on("click", ".delete_drink", function () {
    $(`#drink-wrapper${$(this).data("deletedrinkid")}`).remove()
  })
}

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
    let drinkIds =[]
    appendForm(drinkIds);
    deleteForm();
    deleteZero();
  }

  if (location.pathname.match(/sales\/\d{1,3}\/edit/)) {
    let drinkIds = []
    // 一度全て削除してフォームに値を入れ直してappend
    for (i = 0; i < $(".saledrink").length; i++){
      drinkId = $(`#saledrink${i}`)[0].dataset.drinkid
      drinkNumber = $(`#saledrink${i}`)[0].dataset.number
      drinkName = $(`#saledrink${i}`)[0].dataset.name
      $(".drink_forms").append(`<div id="drink-wrapper${drinkId}">
        <div>${drinkName}</div>
        <input type="number" name="sale[sales_drinks_attributes][${i}][drink_id]" id="sale_sales_drinks_attributes_${i}_drink_id" value="${drinkId}">
        <input type="number" class="drink_number" name="sale[sales_drinks_attributes][${i}][number]" id="sale_sales_drinks_attributes_${i}_number" data-drinkid=${drinkId} value=${drinkNumber}>
        <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
      </div>`)
      drinkIds.push(Number(drinkId))
    }
    appendForm(drinkIds);
    deleteForm();
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