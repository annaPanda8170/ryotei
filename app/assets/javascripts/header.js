
$(function () {
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  let w = now.getDay();
  let wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let h = now.getHours();
  let mi = now.getMinutes();
  if (mi >= 0 && mi <= 9) {
    mi = "0" + mi;
  }
  $(".header__account__clock").text(y + '/' + m + '/' + d + '\n' + h + ':' + mi + ' (' + wd[w] + ')')
  setInterval(function () {
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    let w = now.getDay();
    let wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let h = now.getHours();
    let mi = now.getMinutes();
    if (mi >= 0 && mi <= 9) {
      mi = "0" + mi;
    }
    $(".header__account__clock").text(y + '/' + m + '/' + d + '\n' + h + ':' + mi + ' (' + wd[w] + ')')
  }, 1000)

  $(".header__account").hover(function () {
    $(".header__account__hover").fadeIn();
    $(".header__account__hover").css({display: "inline-block"});
  }, function(){
    $(".header__account__hover").fadeOut();
  })

  $(".header__nav").hover(function () {
    $(".header__nav__hover").fadeIn();
    // $(".header__nav__hover__li").animate({top: "0px"})
  }, function(){
    $(".header__nav__hover").fadeOut();
  })
})