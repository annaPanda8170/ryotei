function allTable(){
  $('.rsvTableDroppable').each(function () {
    $(this).droppable({
      hoverClass: function () {
        $(".rsvTableDroppable").removeClass("dropHover")
        for (let i = 0; i < 10; i++) {
          $(`#${Number(this.id) + i}`).addClass("dropHover")
        }
      },
      deactivate: function () {
        $(".rsvTableDroppable").removeClass("dropHover")
      },
      // 一応残し
      // disabled: $(this).find('.reservationOne').length > 0 || $(this).find('.reservationOne__sub').length > 0,
    });
  });
}

let minutes = [00, 15, 30, 45]
function tables(thisDom, roomName, roomId) {
  // idを常に3桁にしたいので10から
  let serial = 10;
  for (i = 11; i <= 21; i++){
    for (j = 0; j < 4; j++) {
      // idはsub用。連番でなくてはならない
      thisDom.append(`<div id=${roomId}${serial} class="rsvTable__table rsvTable__table${i}${minutes[j]} rsvTableDroppable ui-droppable" data-hour="${i}" data-minute="${minutes[j]}" data-roomid="${roomId}" data-roomname="${roomName}" style=left:${100*(i-10)+(j*25)}px;></div>`)
      serial++;
    }
  }
}

$(function () {
  if (location.pathname.match("/reservations")) {
    for (let i = 0; i < $(".data--room").length; i++){
      $(".rsvTable").append(`<div class="rsvTable__tr"></div>`)
    }
    let i = 0;
    $(".rsvTable__tr").each(function () {
      let roomName = $(".data--room")[i].dataset.name
      let roomId = $(".data--room")[i].dataset.id
      $(this).append(`<div class="rsvTable__roomName">${roomName}</div>`)
      tables($(this), roomName, roomId)
      i++;
    })

    // 予約を表に当てはめる
    $(".reservationOne").each(function (index, e) {
      // .draggableのテキストから置くべきtableを取得
      $table = $(`[data-roomname="${$(this)[0].dataset.room}"]`+`[data-hour="${$(this)[0].dataset.hour}"]`+`[data-minute="${$(this)[0].dataset.minute}"]`);
      // console.log(Number($table[0].id) +1)
      // console.log(minutes00[0])
      $(e).prependTo($table).css({ top: '0', left: '0' });
      for (let i = 1; i < 10; i++){
        $tableSub = $(`#${Number($table[0].id) +i}`);
        $($tableSub).prepend(`<div class="reservationOne__sub" data-subid="${$(this)[0].dataset.id}"></div>`)
      }
    })
    allTable()
    $(".reservationOne").draggable({
      revert: "invalid",
    });
    $(".rsvTableDroppable").droppable({
      drop: function (e, ui) {
        let drag = ui.draggable.context.dataset
        let drop = e.target.dataset
        let dropMinute;
        if (drop.minute == 0) {
          dropMinute = "00" 
        } else {
          dropMinute = drop.minute
        }
        let overlap = false;
        // drag要素右から判定。10右まで。右だからreservationOneのみでsubはいらない
        for (let i = 1; i < 10; i++){
          reservation = $(`#${Number(e.target.id) + i}`).find('.reservationOne')
          if (reservation.length > 0 && reservation[0].dataset.id != drag.id) {
            overlap = true;
          }
        }
        // drag要素ピッタリ判定
        reservation = $(`#${Number(e.target.id)}`).find('.reservationOne')
        if (reservation.length > 0 && reservation[0].dataset.id != drag.id) {
          overlap = true;
        }
        // drag要素左から判定
        reservation = $(`#${Number(e.target.id)}`).find('.reservationOne__sub')
        if (reservation.length > 0 && reservation[0].dataset.subid != drag.id) {
          overlap = true;
        }
        $(".rsvTableDroppable").removeClass("dropHover");
        if (overlap) {
          ui.draggable.animate({ top: '0', left: '0' }, 400);
          return false
        } else
          if (drag.room != drop.roomname && (drag.hour != drop.hour || drag.minute != drop.minute)) {
          if (!confirm(`${drop.hour}時${dropMinute}分の${drop.roomname}に移動しますか？`)) {
            ui.draggable.css({ top: '0', left: '0' });
            return false
          }
        } else if (drag.hour != drop.hour || drag.minute != drop.minute){
          if (!confirm(`${drop.hour}時${dropMinute}分に移動しますか？`)) {
            ui.draggable.css({ top: '0', left: '0' });
            return false
          }
        } else if (drag.room != drop.roomname){
          if (!confirm(`${drop.roomname}に移動しますか？`)) {
            ui.draggable.css({ top: '0', left: '0' });
            return false
          }
        }
        ui.draggable.prependTo(this).css({ top: '0', left: '0' });
        // 前の場所のsubを消す
        $(`[data-subid=${drag.id}]`).remove();
        // 移動先にsubを置く
        for (let i = 1; i < 10; i++){
          $tableSub = $(`#${Number(e.target.id) +i}`);
          $($tableSub).prepend(`<div class="reservationOne__sub" data-subid="${ui.draggable[0].dataset.id}"></div>`)
        }
        allTable();
        $.ajax({
          url: `/reservations/${drag.id}`,
          type: 'PATCH',
          data: { reservation: { "room_id": drop.roomid, "start_hour": drop.hour , "start_minute": drop.minute } },
          dataType: 'json'
        }).done(function (data) {
          $id = $("[data-id=" + data.id + "]");
          $id.find(".reservationOne__clientGuest").text(`${data.clientGuest} 様`);
          $id.find(".reservationOne__numberOfGuest").text(`${data.numOfGuest} 名`);
          $id.find(".reservationOne__memo").text(data.memo);



          // 以下三つ確認用あとで消す
          $id.find(".tttttt").text(data.room);
          $id.find(".uuuuuu").text(data.hour);
          $id.find(".vvvvvv").text(data.minute);


          
        }).fail(function () {
          ui.draggable.css({ top: '0', left: '0' });
          return false
        });
      }
    });
  }
});