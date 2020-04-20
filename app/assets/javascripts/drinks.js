function drinkDelete() {
  $("#drink_delete").click(function () {
    if (!confirm(`削除してよろしいですか？`)) {
      return false
    }
  })
}

// 今選択されているカテゴリーの全てのドリンクから、今のページで表示すべきドリンク以外を選別
// この値を変えれば1ページでの項目数を変更できる
let onePageNumber = 16;
let page = 1;
function pagination(onePageNumber, page) {
  $(".nowCategory").each(function (i) {
    if (i < onePageNumber * (page-1) || onePageNumber * page <= i) {
      $(this).css({ display: "none" })
    }
  })
}

// 今のページの数字の色を赤くする関数
function pageColorChange(nowPage, nowTotalPage) {
  $(".pageLinks__link").css({color: "rgb(28,51,76)"})
  $(`.pageLinks__link`).eq(nowPage-1).css({color: "rgb(155, 59, 59)"})
  $(`.pageLinks__link`).eq(nowPage-1+nowTotalPage).css({color: "rgb(155, 59, 59)"})
}

// 「前」「次」出し入れ用関数
function check(nowPage, nowTotalPage, preved, nexted) {
  $(".nowCategory").css({ display: "block" })
  if (nowPage <= 1) {
    $(".pageLinks__prev").remove();
    $(".pageLinks").prepend(`<div class="pageLinks__prevNon">な</div>`)
    preved = false;
  }
  if (nowPage > 1 && !preved) {
    $(".pageLinks").prepend(`<div class="pageLinks__prev" data-page="prev">前</div>`)
    $(".pageLinks__prevNon").remove();
    preved = true;
  }
  if (nowPage < nowTotalPage && !nexted){
    $(".pageLinks").append(`<div class="pageLinks__next" data-page="next">次</div>`)
    nexted = true;
  }
  if (nowPage >= nowTotalPage) {
    $(".pageLinks__next").remove();
    nexted = false;
  }
  return [nowPage, nowTotalPage, preved, nexted]
}

// ##########以下実行部######################################################################

$(function () {
  drinkDelete();

  // #####以下index#############################################################
  // 最初のセッティング
  pagination(onePageNumber, page)
  let count = $(".drink").length;
  let nowTotalPage = Math.ceil(count / onePageNumber);
  let html = `<div class="pageLinks__prevNon">な</div>`;
  if (nowTotalPage != 1) {
    for (let i = 1; i <= nowTotalPage; i++){
      html += `<div class="pageLinks__link" data-page=${i}>${i}</div>`
    }
    html += `<div class="pageLinks__next" data-page="next">次</div>`;
  }
  $(".pageLinks").html(html);
  $(`.pageLinks__link`).eq(0).css({ color: "rgb(155, 59, 59)" })
  $(`.pageLinks__link`).eq(nowTotalPage).css({color: "rgb(155, 59, 59)"})
  
  let nowPage = 1;
  // 以下２つ「前」「次」が表示されているか記録用
  let preved = false;
  let nexted = true;
  $("#category").change(function () {
    $(".drink").css({ display: "block" }).addClass("nowCategory")
    let category = $(this).val()
    let count = $(".drink").length;
    $(".drink").each(function () {
      // 全カテゴリーは例外で何もしない
      if (category!="") {
        if ($(this).data("category") !== category) {
          $(this).css({ display: "none" }).removeClass("nowCategory")
          count--
        }
      }
    })
    $(".nowCategory:even").css({backgroundColor: "rgb(170, 197, 188)"})
    $(".nowCategory:odd").css({ backgroundColor: "rgb(245,243,242)" })
    // 初期化
    nowPage = 1
    preved = false;
    pagination(onePageNumber, page)
    let html = `<div class="pageLinks__prevNon">な</div>`;
    nowTotalPage = Math.ceil(count / onePageNumber)
    if (nowTotalPage != 1) {
      for (let i = 1; i <= nowTotalPage; i++){
        html += `<div class="pageLinks__link" data-page=${i}>${i}</div>`
      }
      html += `<div class="pageLinks__next" data-page="next">次</div>`;
    }
    $(".pageLinks").html(html);
    $(`.pageLinks__link`).eq(0).css({ color: "rgb(155, 59, 59)" })
    $(`.pageLinks__link`).eq(nowTotalPage).css({color: "rgb(155, 59, 59)"})
  })
  // ページ数クリックイベント 
  $(document).on("click", ".pageLinks__link", function () {
    $(".pageLinks__link").css({color: "rgb(28,51,76)"})
    nowPage = $(this).data("page")
    pageColorChange(nowPage, nowTotalPage)
    let checkReturns = check(nowPage, nowTotalPage, preved, nexted)
    // もう少し効率的な代入方法がありそう
    nowPage = checkReturns[0]
    nowTotalPage = checkReturns[1]
    preved = checkReturns[2]
    nexted = checkReturns[3]
    pagination(onePageNumber, nowPage)
  })
  // 「前」クリックイベント 
  $(document).on("click", ".pageLinks__prev", function () {
    nowPage--
    pageColorChange(nowPage, nowTotalPage)
    let checkReturns = check(nowPage, nowTotalPage, preved, nexted)
    nowPage = checkReturns[0]
    nowTotalPage = checkReturns[1]
    preved = checkReturns[2]
    nexted = checkReturns[3]
    pagination(onePageNumber, nowPage)
  })
  // 「次」クリックイベント 
  $(document).on("click", ".pageLinks__next", function () {
    nowPage++
    pageColorChange(nowPage, nowTotalPage)
    let checkReturns = check(nowPage, nowTotalPage, preved, nexted)
    nowPage = checkReturns[0]
    nowTotalPage = checkReturns[1]
    preved = checkReturns[2]
    nexted = checkReturns[3]
    pagination(onePageNumber, nowPage)
  })
})