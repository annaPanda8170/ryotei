function allTable(){
  $('.rsvTableDroppable').each(function () {
    $(this).droppable({
      hoverClass: 'dropHover',
      disabled: $(this).find('.reservationOne').length > 0
    });
  });
}
$(function () {
  // 予約を表に当てはめる
  $(".draggable").each(function (index, e) {
    // .draggableのテキストから置くべきtableを取得
    $table = $("[data-room="+$(e).find(".tttttt").text()+"]")[Number($(e).find(".uuuuuu").text())-11]
    $(e).prependTo($table).css({ top: '0', left: '0' });
  })
  allTable()
  $(".reservationOne").draggable({
    revert: "invalid",
  });
  $(".rsvTableDroppable").droppable({
    drop: function (e, ui) {
      ui.draggable.prependTo(this).css({ top: '0', left: '0' });
      // aaaaaa = Number(e.target.dataset.set) + 1;
      allTable()
    }
  });
});