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
  $(".reservationOne").each(function (index, e) {
    // .draggableのテキストから置くべきtableを取得
    $table = $("[data-room=" + $(this)[0].dataset.room + "]")[Number($(this)[0].dataset.time) - 11];
    $(e).prependTo($table).css({ top: '0', left: '0' });
  })
  allTable()
  $(".reservationOne").draggable({
    revert: "invalid",
  });
  $(".rsvTableDroppable").droppable({
    drop: function (e, ui) {
      drag = ui.draggable.context.dataset
      drop = e.target.dataset
      overlap = false;
      $(".rsvTableDroppable").has("div").each(function () {
        if ($(this)[0].dataset.room == drop.room && Number($(this)[0].dataset.time) + 1 == drop.time) {
          overlap = true;
        }
      })
      if (overlap) {
        ui.draggable.animate({ top: '0', left: '0' }, 400);
        return false
      }else if (drag.room != drop.room && drag.time != drop.time){
        if (!confirm(`${drop.time}時の${drop.room}に移動しますか？`)) {
          ui.draggable.css({ top: '0', left: '0' });
          return false
        }
      } else if (drag.time != drop.time){
        if (!confirm(`${drop.time}時に移動しますか？`)) {
          ui.draggable.css({ top: '0', left: '0' });
          return false
        }
      } else if (drag.room != drop.room){
        if (!confirm(`${drop.room}に移動しますか？`)) {
          ui.draggable.css({ top: '0', left: '0' });
          return false
        }
      }
      ui.draggable.prependTo(this).css({ top: '0', left: '0' });
      allTable();
      $.ajax({
        url: `/reservations/${drag.id}`,
        type: 'PATCH',
        data: { reservation: { "room_id": drop.roomid, "start_time": drop.time } },
        dataType: 'json'
      }).done(function (data) {
        $id = $("[data-id=" + data.id + "]");
        $id.find(".reservationOne__clientGuest").text(`${data.clientGuest} 様`);
        $id.find(".reservationOne__numberOfGuest").text(`${data.numOfGuest} 名`);
        $id.find(".reservationOne__memo").text(data.memo);
        // 以下二つ確認用あとで消す
        $id.find(".tttttt").text(data.room);
        $id.find(".uuuuuu").text(data.time);
      });
    }
  });
});