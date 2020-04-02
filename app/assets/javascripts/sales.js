$(function () {
  if (location.href.match("sales/new")) {
    let drinkIds =[]
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
    $(document).on("click", ".delete_drink", function () {
      $(`#drink-wrapper${$(this).data("deletedrinkid")}`).remove()
    })
    $(".sale_save").click(function (e) {
      $(".drink_number").each(function () {
        if ($(this).val() == 0) {
          $(`#drink-wrapper${$(this).data("drinkid")}`).remove()
        }
      })
    })
  }
})