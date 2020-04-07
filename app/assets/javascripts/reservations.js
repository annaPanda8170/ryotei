function allTable(){
  $('.rsvTableDroppable').each(function () {
    $(this).droppable({
      hoverClass: function () {
        $(".rsvTableDroppableRemove").removeClass("dropHover")
        for (let i = 0; i < 10; i++) {
          $(`#${Number(this.id) + i}`).addClass("dropHover")
        }
      },
      deactivate: function () {
        $(".rsvTableDroppableRemove").removeClass("dropHover")
      },
      // 一応残し
      // disabled: $(this).find('.reservationOne').length > 0 || $(this).find('.reservationOne__sub').length > 0,
    });
  });
  $('.rsvTableDroppableHoverRemove').each(function () {
    $(this).droppable({
      hoverClass: function () {
        $(".rsvTableDroppableRemove").removeClass("dropHover")
      },
    });
  });
}

let minutes = [0, 15, 30, 45]
function tables(thisDom, roomName, roomId) {
  // idを常に3桁にしたいので10から
  let serial = 10;
  let tableChange = true;
  for (i = 11; i <= 21; i++){
    for (j = 0; j < 4; j++) {
      if (i == 19 && j == 3) {
        tableChange = false;
      }
      if (j == 0) {
        if (tableChange) {
          // idはsub用。連番でなくてはならない
          thisDom.append(`<div id=${roomId}${serial} class="rsvTable__table rsvTable__table${i}${minutes[j]}${minutes[j]} rsvTableDroppable rsvTableDroppableRemove ui-droppable" data-hour="${i}" data-minute="${minutes[j]}" data-roomid="${roomId}" data-roomname="${roomName}" style=left:${100 * (i - 10) + (j * 25)}px;></div>`)
        }else{
          thisDom.append(`<div id=${roomId}${serial} class="rsvTable__table rsvTable__table${i}${minutes[j]}${minutes[j]} rsvTableDroppableHoverRemove rsvTableDroppableRemove ui-droppable" data-hour="${i}" data-minute="${minutes[j]}" data-roomid="${roomId}" data-roomname="${roomName}" style=left:${100*(i-10)+(j*25)}px;></div>`)
        }
      } else {
        if (tableChange) {
          // idはsub用。連番でなくてはならない
          thisDom.append(`<div id=${roomId}${serial} class="rsvTable__table rsvTable__table${i}${minutes[j]} rsvTableDroppable rsvTableDroppableRemove ui-droppable" data-hour="${i}" data-minute="${minutes[j]}" data-roomid="${roomId}" data-roomname="${roomName}" style=left:${100 * (i - 10) + (j * 25)}px;></div>`)
        }else{
          thisDom.append(`<div id=${roomId}${serial} class="rsvTable__table rsvTable__table${i}${minutes[j]} rsvTableDroppableRemove ui-droppable" data-hour="${i}" data-minute="${minutes[j]}" data-roomid="${roomId}" data-roomname="${roomName}" style=left:${100*(i-10)+(j*25)}px;></div>`)
        }
      }
      serial++;
    }
  }
}

function show() {
  $(".reservationOne__showButton").click(function () {
    $(".reservation_show_window").animate({ right: 0 }, 300);
    $(".reservation_new_window, .reservation_edit_window").animate({ right: -450 }, 300);
    $.ajax({
      url: "/reservations/takeReservation",
      type: "GET",
      data: { id: $(this)[0].dataset.id },
      dataType: 'json'
    }).done(function (data) {
      for (let key in data) {
        $(`.reservation_show_${key}`).text(data[key])
      }
      if (data.which == "custumDelete") {
        $(".reservation_show_link").html(`<div class="reservation_delete" data-id=${data.id} >削除</div>`)
      } else if(data.which == "revival"){
        $(".reservation_show_link").html(`<a rel="nofollow" data-method="put" href="/reservations/${data.id}/revival">復活</a>`)
      }
      $(".reservation_show_edit").attr("data-id", `${data.id}`)
    }).fail(function () {
      
    })
  })
}

function createSet(data) {
  if (data.message) {
    $(".error_messages").text("")
    for (let key in data.message) {
      $(".error_messages").append(`<div>${data.message[key]}</div>`)
    }
    $('.form_submit').prop('disabled', false);
  } else {
    





    let html = `<div class="reservationOne ui-draggable ui-draggable-handle" data-hour=${data.hour} data-id=${data.id} data-minute=${data.minute} data-room=${data.room} style="top: 0px; left: 0px;">
    <div class="reservationOne__clientGuest">${data.clientGuest} 様</div>
    <div class="reservationOne__numberOfGuest">${data.numOfGuest} 名</div>
    <div class="reservationOne__memo">${data.memo}</div>
    <div class="reservationOne__showButton" data-id=${data.id}>詳細</div>
    <a class="reservationOne__sale" href="/sales/new.${data.id}">会計(新)</a>
    <div class="tttttt">${data.room}</div>
    <div class="uuuuuu">${data.hour}</div>
    <div class="vvvvvv">${data.minute}</div>
    </div>`

    


    $table = $(`[data-roomname="${data.room}"]`+`[data-hour="${data.hour}"]`+`[data-minute="${data.minute}"]`);
    $table.prepend(html);
    
    for (let i = 1; i < 10; i++){
      $tableSub = $(`#${Number($table[0].id) +i}`);
      $tableSub.prepend(`<div class="reservationOne__sub" data-subid="${data.id}"></div>`)
    }
    


    $(".reservationOne").draggable({
      revert: "invalid",
    });

    // リセットあとで実装!!!!!!!!!!!!!!!
    // $('.new_message')[0].reset();
    $('.form_submit').prop('disabled', false);

    show()
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
      $(e).prependTo($table).css({ top: '0', left: '0' });
      for (let i = 1; i < 10; i++){
        $tableSub = $(`#${Number($table[0].id) +i}`);
        $($tableSub).prepend(`<div class="reservationOne__sub" data-subid="${$(this)[0].dataset.id}"></div>`)
      }
    })
    allTable()
    $(".reservationOne").draggable({
      revert: "invalid"
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
        // drag要素左から判定。10右まで。右だからreservationOneのみでsubはいらない
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
        // drag要素右から判定
        reservation = $(`#${Number(e.target.id)}`).find('.reservationOne__sub')
        if (reservation.length > 0 && reservation[0].dataset.subid != drag.id) {
          overlap = true;
        }
        $(".rsvTableDroppableRemove").removeClass("dropHover");
        if (overlap) {
          ui.draggable.animate({ top: '0', left: '0' }, 400);
          return false
        } else if (drag.room != drop.roomname && (drag.hour != drop.hour || drag.minute != drop.minute)) {
          console.log(drag.room);
          console.log(drop.roomname);
          console.log(drag.hour);
          console.log(drop.hour);
          console.log(drag.minute);
          console.log(drop.minute);
          console.log("--------------")
          if (!confirm(`${drop.hour}時${dropMinute}分の${drop.roomname}に移動しますか？`)) {
            ui.draggable.css({ top: '0', left: '0' });
            return false
          }
        } else if (drag.hour != drop.hour || drag.minute != drop.minute) {
          console.log(drag.room);
          console.log(drop.roomname);
          console.log(drag.hour);
          console.log(drop.hour);
          console.log(drag.minute);
          console.log(drop.minute);
          console.log("--------------")
          if (!confirm(`${drop.hour}時${dropMinute}分に移動しますか？`)) {
            ui.draggable.css({ top: '0', left: '0' });
            return false
          }
        } else if (drag.room != drop.roomname) {
          console.log(drag.room);
          console.log(drop.roomname);
          console.log(drag.hour);
          console.log(drop.hour);
          console.log(drag.minute);
          console.log(drop.minute);
          console.log("--------------")
          if (!confirm(`${drop.roomname}に移動しますか？`)) {
            ui.draggable.css({ top: '0', left: '0' });
            return false
          }
        }
        thisTable = this;
        ui.draggable.prependTo(thisTable).css({ top: '0', left: '0' });
        // 前の場所のsubを消す
        $(`[data-subid=${drag.id}]`).remove();
        // 移動先にsubを置く
        for (let i = 1; i < 10; i++){
          $tableSub = $(`#${Number(e.target.id) +i}`);
          $($tableSub).prepend(`<div class="reservationOne__sub" data-subid="${ui.draggable[0].dataset.id}"></div>`)
        }
        allTable();
        console.log(drag)
        console.log(drag.id)
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
          $id.attr("data-room", `${data.room}`);
          $id.attr("data-hour", `${data.hour}`);
          $id.attr("data-minute", `${data.minute}`);


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



    $(".reservation_new_button").click(function () {
      $(".reservation_new_window").animate({ right: 0 }, 300);
      $(".reservation_show_window, .reservation_edit_window").animate({ right: -450 }, 300);
    })
    show()





    

    $("#reservation_new_form").on("submit", function (e) {
      e.preventDefault();
      if (!confirm(`登録してよろしいですか？`)) {
        return false
      }
      let formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      }).done(function (data) {
        createSet(data);
        






        
      }).fail(function (data) {
        
      })
    })

    $(".reservation_show_edit").click(function () {
      $(".reservation_edit_window").animate({ right: 0 }, 300);
      $(".reservation_new_window, .reservation_show_window").animate({ right: -450 }, 300);
      $.ajax({
        url: "/reservations/takeReservation",
        type: "GET",
        data: { id: $(this)[0].dataset.id },
        dataType: 'json'
      }).done(function (data) {
        // $("#reservation_edit_form").addClass("iiiiiiiiii")
        $("#reservation_edit_form").attr("action", `/reservations/${data.id}`)
        // 以下１行、今回は不要だが今後ヒントになるのでメモ
        // $("#reservation_edit_form").append(`<input type="hidden" name="_method" value="patch">`)
        // console.log($(".reservation_edit_window_aa").prompt())

        
        console.log(data.clientid)
        if (data.clientid) {
          $(".reservation_edit_window_aa").val(data.clientid)
          console.log("あり")
        } else {
          $(".reservation_edit_window_aa").prepend(`<option value="">クライアント</option>`)
          $(".reservation_edit_window_aa").val("")
        }
          
        $(".reservation_edit_window_bb").val(data.guest)
        
        $(".reservation_edit_window_cc").val(data.roomid)
        $(".reservation_edit_window_dd").val(data.kaisekiid)
        $(".reservation_edit_window_ee").val(data.number_of_guest)
        // console.log(data.minute)
        $(".reservation_edit_window_gg").val(data.start_hour)
        $(".reservation_edit_window_hh").val(data.minute)
        $(".reservation_edit_window_ii").val(data.memo)
        // createSet();
        // $("#reservation_new_form").attr("action", "/fjfjfjf/")
        // $("#reservation_new_form").on("submit", function (e) {
        //   e.preventDefault();
          // let formData = new FormData(this);
          // var url = $(this).attr('action');
          // $.ajax({
          //   url: url,
          //   type: "POST",
          //   data: formData,
          //   dataType: 'json',
          //   processData: false,
          //   contentType: false
          // }).done(function (data) {
          //   createSet(data);
            






            
          // }).fail(function (data) {
            
          // })
        // })
      }).fail(function () {
        
      })
    })

    
    $("#reservation_edit_form").on("submit", function (e) {
      e.preventDefault();
      if (!confirm(`変更してよろしいですか？`)) {
        return false
      }
      let formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "PATCH",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      }).done(function (data) {
        $(`[data-roomid="${data.roomid}"]` + `[data-hour="${data.past_hour}"]` + `[data-minute="${data.past_minute}"]`).empty();
        createSet(data);
        
        





        
      }).fail(function (data) {
        
      })
    })

    $(document).on("click", ".reservation_delete", function () {
      if (!confirm(`予約を削除してよろしいですか？`)) {
        return false
      }
      $.ajax({
        url: `/reservations/${$(this).data("id")}/custumDelete`,
        type: "PUT",
        data: { id: $(this).data("id"), status: 0 },
        dataType: 'json'
      }).done(function (data) {
        $(`[data-roomid="${data.roomid}"]` + `[data-hour="${data.hour}"]` + `[data-minute="${data.minute}"]`).empty();
        // デリート情報のアペンドまだ
      })
    })

  }
});