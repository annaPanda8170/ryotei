function allTable(){
  $('.rsvTableDroppable').each(function () {
    $(this).droppable({
      hoverClass: 'dropHover',
      disabled: $(this).find('.reservationOne').length > 0
    });
  });
}
$(function () {
  console.log("OK")
  // 予約を表に当てはめる
  $(".reservationOne").each(function (index, e) {
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
      $.ajax({
        url: `/reservations/${ui.draggable.context.dataset.id}`,
        type: 'PATCH',
        data: { reservation: { "room_id": e.target.dataset.roomid, "start_time(4i)": e.target.dataset.time } },
        dataType: 'json'
      }).done(function (data) {
        $id = $("[data-id=" + data.id + "]");
        $id.find(".reservationOne__clientGuest").text(data.clientGuest);
        $id.find(".reservationOne__numberOfGuest").text(data.numOfGuest);
        $id.find(".reservationOne__memo").text(data.memo);
        // 以下二つ確認用あとで消す
        $id.find(".tttttt").text(data.room);
        $id.find(".uuuuuu").text(data.time);
      });
    }
  });
});