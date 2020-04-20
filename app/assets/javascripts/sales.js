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

function drinkCategory() {
  $(".saleNewEdit__drinkButtons__categorys__category.submits").click(function () {
    $(".saleNewEdit__drinkButtons__categorys__category.submits").css({backgroundColor: "#b9beba"})
    $(this).css({ backgroundColor: "#1c334c" })
    thisCategory = $(this).data("category")
    $(".sales__drink").css({ display: "block" })
    $(".sales__drink").each(function (i, e) {
      if ($(e).data("category") != thisCategory) {
        $(e).css({ display: "none" })
      }
    })
  })
}

// トータルを入れ込む関数。各イベント内に入れる
function saleTotal(timeIdSet) {
  console.log(timeIdSet)
  let roomPrice = Number($(".roomPrice").text());
  let kaisekiPrice = Number($(".kaisekiPrice").text());
  let kaisekiNumber = Number($(".kaisekiNumber").text());
  let drinkTotal = 0;
  for(var key in timeIdSet) {
    let drinkPrice = $(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).data("drinkprice")
    let drinkNumber1 = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).val())
    let drinkNumber2 = Number($(`#sale_sales_drinks_attributes_${timeIdSet[key]}_number`).text())
    drinkTotal = drinkTotal + (drinkPrice * (drinkNumber1 + drinkNumber2))
  }
  let subTotal = roomPrice + (kaisekiPrice * kaisekiNumber) + drinkTotal;
  $(".saleNewEdit__result__content__subTotal__price").text(subTotal)
  $(".saleNewEdit__result__content__tax__price").text(subTotal*.1)
  $(".saleNewEdit__result__content__total__price").text(Math.round(subTotal * 1.1))
  $("#sale_cash").attr("min", Math.round(subTotal * 1.1))
  $("#sale_cash").val(Math.round(subTotal * 1.1))
}

function saleFinish() {
  $("#sale_mean").change(function () {
    console.log($(this).val())
    $("#sale_finish").css({ display: "none" })
    $("#sale_cash").css({ display: "none" })
    $(".saleNewEdit__result__content__change").css({display: "none"})
    if ($(this).val() === "クレジット") {
      $("#sale_finish").css({display: "inline-block"})
    } else if ($(this).val() == "現金") {
      $("#sale_finish").css({ display: "inline-block" })
      $("#sale_cash").css({ display: "inline-block" })
      $(".saleNewEdit__result__content__change").css({display: "block"})
    } 
  })
}

function change() {
  $("#sale_cash").change(function () {
    let change = $(this).val() - $(".saleNewEdit__result__content__total__price").text()
    console.log($(this).val())
    console.log($(".saleNewEdit__result__content__total__price").text())
    $(".saleNewEdit__result__content__change__price").text(change)
  })
}

function keyup() {
  $("#sale_cash").keyup(function () {
    let change = $(this).val() - $(".saleNewEdit__result__content__total__price").text()
    $(".saleNewEdit__result__content__change__price").text(change)
  })
}

function saleDelete() {
  $(".sale_delete").click(function () {
    if (!confirm(`削除してよろしいですか？`)) {
      return false
    }
  })
}

function dontSaved() {
  $(".dont_saved").click(function () {
    if (!confirm(`保存されていません。\n戻ってよろしいですか？`)) {
      return false
    }
  })
}

// 全イベントのセット
function eventSet(drinkIds, editShowOnly, showOnly) {
  let times = 0;
  let timeIdSet = {};
  // editに保存されてるドリンクをフォームに入れ込む
  if (editShowOnly){
    for (i = 0; i < $(".saledrink").length; i++) {
      drinkId = $(`#saledrink${i}`)[0].dataset.drinkid
      drinkNumber = $(`#saledrink${i}`)[0].dataset.number
      drinkName = $(`#saledrink${i}`)[0].dataset.name
      drinkPrice = $(`#saledrink${i}`)[0].dataset.price
      if (showOnly) {
        $(".saleNewEdit__result__content__drinks").append(`<div id="drink-wrapper${drinkId}">
        <div class="saleNewEdit__result__content__name">${drinkName}<dix class="saleNewEdit__result__content__name__mask"></dix></div> <div class="saleNewEdit__result__content__price">${drinkPrice}</div>
        <input type="hidden" name="sale[sales_drinks_attributes][${times}][drink_id]" id="sale_sales_drinks_attributes_${times}_drink_id" value="${drinkId}">
        <div" class="drink_number saleNewEdit__result__content__number" id="sale_sales_drinks_attributes_${times}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice}>${drinkNumber}</div>
        </div>`)
      } else {
        $(".saleNewEdit__result__content__drinks").append(`<div id="drink-wrapper${drinkId}">
        <div class="saleNewEdit__result__content__name">${drinkName}<dix class="saleNewEdit__result__content__name__mask"></dix></div> <div class="saleNewEdit__result__content__price">${drinkPrice}</div>
        <input type="hidden" name="sale[sales_drinks_attributes][${times}][drink_id]" id="sale_sales_drinks_attributes_${times}_drink_id" value="${drinkId}">
        <input type="number" class="drink_number saleNewEdit__result__content__number" name="sale[sales_drinks_attributes][${times}][number]" id="sale_sales_drinks_attributes_${times}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=${drinkNumber}>
        <div class="delete_drink" data-deletedrinkid=${drinkId}>削除</div>
        </div>`)
      }
      drinkIds.push(Number(drinkId))
      timeIdSet[Number(drinkId)] = times;
      times++;
      
    }
    saleTotal(timeIdSet)
  }
  drinkCategory();
  saleFinish();
  change();
  keyup();
  saleDelete();
  dontSaved()
  // ドリンクのボタンを押した時にフォーム増やすか数を増やすか判断
  $(".sales__drink").click(function () {
    length = drinkIds.length
    drinkId = $(this).data("id")
    drinkName = $(this).data("name")
    drinkPrice = $(this).data("price")
    if ($.inArray(Number(drinkId), drinkIds) < 0) {
      $(".saleNewEdit__result__content__drinks").append(`<div class="drink-wrapper" id="drink-wrapper${drinkId}">
          <div class="saleNewEdit__result__content__name">${drinkName}<dix class="saleNewEdit__result__content__name__mask"></dix></div><div class="saleNewEdit__result__content__price">${drinkPrice}</div>
          <input type="hidden" name="sale[sales_drinks_attributes][${times}][drink_id]" id="sale_sales_drinks_attributes_${times}_drink_id" value="${drinkId}">
          <input type="number" class="drink_number saleNewEdit__result__content__number" name="sale[sales_drinks_attributes][${times}][number]" id="sale_sales_drinks_attributes_${times}_number" data-drinkid=${drinkId} data-drinkprice=${drinkPrice} min=0 value=1>
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
    saleTotal(timeIdSet)
  })
  deleteZero();
}

function setFirstDrinkCategory() {
  category = $(".saleNewEdit__drinkButtons__categorys__category.submits:nth-of-type(1)").data("category")
  $(".sales__drink").each(function (i, e) {
    if ($(e).data("category") != category) {
      $(e).css({ display: "none" })
    }
  })
}

$(function () {
  if (location.pathname.match("sales/new")) {
    let drinkIds = []
    let editShowOnly = false;
    let showOnly = false;
    eventSet(drinkIds, editShowOnly, showOnly);
    setFirstDrinkCategory();
  }

  if (location.pathname.match(/sales\/\d{1,3}\/edit/)) {
    let drinkIds = []
    let editShowOnly = true;
    let showOnly = false;
    eventSet(drinkIds, editShowOnly, showOnly);
    setFirstDrinkCategory()
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

  if (location.pathname.match(/sales\/\d{1,3}/) && !(location.pathname.match(/sales\/\d{1,3}\/edit/))) {
    let drinkIds = []
    let editShowOnly = true;
    let showOnly = true;
    eventSet(drinkIds, editShowOnly, showOnly);
  }
})