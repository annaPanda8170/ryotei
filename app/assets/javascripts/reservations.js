function allTable(){
  $('.rsvTable__table').each(function () {
    $(this).droppable({
      hoverClass: 'dropHover',
      disabled: $(this).find('.reservationOne').length > 0
    });
  });
}

$(function () {
  allTable()
  $(".reservationOne").draggable({
    revert: "invalid",
    zIndex: "100"
  });
  $(".rsvTable__table").droppable({
    // ドロップ要素にドロップされた eがイベント自体?uiはドラッグしたことに関する情報
    drop: function (e, ui) {
      console.log(e)
      ui.draggable.prependTo(this).css({ top: '0', left: '0' });
      allTable()
    }
  })
})