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
      allTable();
      console.log(e.target.dataset.roomid)
      console.log(e.target.dataset.time)
      console.log(ui.draggable.context.dataset.id)
      console.log(`reservations/${ui.draggable.context.dataset.id}`)
      $.ajax({
        url: `/reservations/${ui.draggable.context.dataset.id}`,
        type: 'PATCH',
        data: { reservation: { "room_id": e.target.dataset.roomid, "start_time(4i)": e.target.dataset.time } },
        dataType: 'json'
      }).done(function (data) {
        $(".tttttt").text(data.room);
        $(".uuuuuu").text(data.time);
      });
    }
  });
});