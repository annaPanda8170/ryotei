
$(function () {
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  let w = now.getDay();
  let wd = ['日', '月', '火', '水', '木', '金', '土'];
  let h = now.getHours();
  let mi = now.getMinutes();
  $(".header__clock").text(y + '年' + m + '月' + d + '日' + h + '時' + mi + '分' + '(' + wd[w] + ')')
  setInterval(function () {
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    let w = now.getDay();
    let wd = ['日', '月', '火', '水', '木', '金', '土'];
    let h = now.getHours();
    let mi = now.getMinutes();
    $(".header__clock").text(y + '年' + m + '月' + d + '日' + h + '時' + mi + '分' + '(' + wd[w] + ')')
  }, 1000)
})