function drinkDelete() {
  $("#drink_delete").click(function () {
    if (!confirm(`削除してよろしいですか？`)) {
      return false
    }
  })
}

let onePageNumber = 16;
let page = 1;
function pagination(onePageNumber, page) {
  $(".nowCategory").each(function (i) {
    if (i < onePageNumber * (page-1) || onePageNumber * page <= i) {
      $(this).css({ display: "none" })
    }
  })
}

function pageColorChange(nowPage, nowTotalPage) {
  $(".pageLinks__link").css({color: "rgb(28,51,76)"})
  $(`.pageLinks__link`).eq(nowPage-1).css({color: "rgb(155, 59, 59)"})
  $(`.pageLinks__link`).eq(nowPage-1+nowTotalPage).css({color: "rgb(155, 59, 59)"})
}

$(function () {
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
  drinkDelete();

  
  
  


  let nowPage = 1;
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

  $(document).on("click", ".pageLinks__link", function () {
    $(".pageLinks__link").css({color: "rgb(28,51,76)"})
    $(".nowCategory").css({ display: "block" })
    nowPage = $(this).data("page")
    pageColorChange(nowPage, nowTotalPage)
    // 以下が何度も使うので切り出したいが変数の値を共有出来ない
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
    pagination(onePageNumber, nowPage)
  })
  $(document).on("click", ".pageLinks__prev", function () {
    
    $(".nowCategory").css({ display: "block" })
    nowPage--
    pageColorChange(nowPage, nowTotalPage)
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
    pagination(onePageNumber, nowPage)
  })
  $(document).on("click", ".pageLinks__next", function () {
    $(".nowCategory").css({ display: "block" })
    nowPage++
    pageColorChange(nowPage, nowTotalPage)
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
    pagination(onePageNumber, nowPage)
    console.log(nowPage)
    console.log(nowTotalPage)
    console.log(preved)
    console.log(nexted)
    console.log("=----------------")
  })
})