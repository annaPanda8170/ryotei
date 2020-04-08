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

// 最初に表を作る関数
let minutes = [0, 15, 30, 45]
function tables(thisDom, roomName, roomId) {
  // idを常に3桁にしたいので10から
  let serial = 10;
  let tableChange = true;
  // 11時台から21時台
  for (i = 11; i <= 21; i++){
    // 00・15・30・45分
    for (j = 0; j < 4; j++) {
      // 19:45以降は予約取らない
      if (i == 19 && j == 3) {
        tableChange = false;
      }
      // 0分を00分にしたいif文分け
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
    $(".rsvShow").animate({ right: 0 }, 300);
    $(".rsvShow .rsvNew, .rsvEdit").animate({ right: "-100vw" }, 300);
    $(".reservationsDeleted").css({ marginBottom: "300px" })
    $.ajax({
      url: "/reservations/takeReservation",
      type: "GET",
      data: { id: $(this)[0].dataset.id },
      dataType: 'json'
    }).done(function (data) {
      for (let key in data) {
        $(`.rsvShow__${key}`).text(data[key])
      }
      if (data.which == "custumDelete") {
        $(".rsvShow__link").html(`<div class="reservation_delete" data-id=${data.id} >削除</div>`)
      } else if(data.which == "revival"){
        $(".rsvShow__link").html(`<a rel="nofollow" data-method="put" href="/reservations/${data.id}/revival">復活</a>`)
      }
      $(".rsvShow__edit").attr("data-id", `${data.id}`)
    }).fail(function () {
      
    })
  })
}

function createSet(data) {
  if (data.message) {
    $(".rsvNewEdit__errorMessages").text("")
    // $(".rsvEdit__errorMessages").text("")
    for (let key in data.message) {
      $(".rsvNewEdit__errorMessages").append(`<div>${data.message[key]}</div>`)
      // $(".rsvEdit__errorMessages").append(`<div>${data.message[key]}</div>`)
    }
    $('.form_submit').prop('disabled', false);
  } else {
    





    let html = `<div class="reservationOne ui-draggable ui-draggable-handle" data-hour=${data.hour} data-id=${data.id} data-minute=${data.minute} data-room=${data.room} style="top: 0px; left: 0px;">
    <div class="reservationOne__clientGuest">${data.clientGuest} 様</div>
    <div class="reservationOne__numberOfGuest">${data.numOfGuest} 名</div>
    <div class="reservationOne__memo">${data.memo}</div>
    <div class="reservationOne__showButton" data-id=${data.id}>詳細</div>
    <a class="reservationOne__sale" href="/sales/new.${data.id}">未会計</a>
    </div>`

    


    $table = $(`[data-roomname="${data.room}"]`+`[data-hour="${data.hour}"]`+`[data-minute="${data.minute}"]`);
    $table.prepend(html);
    
    for (let i = 1; i < 10; i++){
      $tableSub = $(`#${Number($table[0].id) +i}`);
      $tableSub.prepend(`<div class="reservationOne__sub" data-subid="${data.id}"></div>`)
    }
    

    $(".rsvNew__form__left > select:not(.rsvNew__form__left > select:nth-of-type(2)):not(.rsvNew__form__left > select:nth-of-type(3)):not(.rsvNew__form__left > select:nth-of-type(4))").val("");
    $(".rsvNew__form__left > select:nth-of-type(5)").val("11")
    $(".rsvNew__form__left > select:nth-of-type(6)").val("00")
    $(".rsvNew__form__right > select").val("");
    $(".rsvNew .rsvEdit").animate({ right: "-100vw" }, 300);
    $(".reservationsDeleted").animate({ marginBottom: "30" }, 500)
    $(".reservationOne").draggable({
      revert: "invalid",
    });
    $(".reservationOne").hover(function () {
      // if ($(this).find(".reservationOne__sale").css("display") == "block") {
      //   block = true;
      // } else {
      //   block = false;
      // }
      $(this).find(".reservationOne__showButton, .reservationOne__sale").fadeIn();
    }, function () {
      if (!$(this)[0].dataset.status) {
        $(this).find(".reservationOne__sale").fadeOut();
      }
      $(this).find(".reservationOne__showButton").fadeOut();
    })
    // リセットあとで実装!!!!!!!!!!!!!!!
    // $('.new_message')[0].reset();
    $('.form_submit').prop('disabled', false);

    show()
  }
}

$(function () {
  if (location.pathname.match("/reservations")) {
    
    // let resultWidth = $(".reservation").innerWidth() - $(".reservation")[0].clientWidth;

    // console.log(resultWidth)
    // $(".rsvNew, .rsvShow, .rsvEdit, .reservation").css({width: resultWidth})
    
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
      // 会計の状態によって表示を変える
      if ($(this)[0].dataset.status == 1) {
        $(e).find(".reservationOne__sale").css({ display: "block" , backgroundColor: "#b3304d", color: "#cda0c5"})
      } else if ($(this)[0].dataset.status == 2) {
        $(e).find(".reservationOne__sale").css({ display: "block", backgroundColor: "#b3304d", color: "#cda0c5", borderRadius: "0px", height: "80px", width: "120px", transform: "rotate(-45deg)", bottom: "-32px", right: "-50px" })
        $(e).find(".reservationOne__sale span").css({ display: "inline-block", color: "#cda0c5", transform: "rotate(45deg)" })
        $(this).css({backgroundColor: "#686d71", color: "#b9beba"})
      }
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
        // console.log(drag)
        // console.log(drag.id)
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
    $(".reservationOne").hover(function () {
      // if ($(this).find(".reservationOne__sale").css("display") == "block") {
      //   block = true;
      // } else {
      //   block = false;
      // }
      $(this).find(".reservationOne__showButton, .reservationOne__sale").fadeIn();
    }, function () {
      if (!$(this)[0].dataset.status) {
        $(this).find(".reservationOne__sale").fadeOut();
      }
      $(this).find(".reservationOne__showButton").fadeOut();
    })


    $(".rsvControllers__newButton").click(function () {
      $(".rsvNew").animate({ right: 0 }, 300);
      $(".rsvShow, .rsvEdit").animate({ right: "-100vw" }, 300);
      $(".reservationsDeleted").css({ marginBottom: "300px" })
    })
    show()


    $(document).click(function (e) {
      // console.log($(e.target))
      // console.log($(e.target)[0].classList[0])
      if ($(e.target).closest('.rsvNew').length == 0
        && $(e.target).closest('.rsvShow').length == 0
        && $(e.target).closest('.rsvEdit').length == 0
        && $(e.target)[0].className != "reservationOne__showButton"
        && $(e.target)[0].classList[0] != "reservationOne__showButton"
        && $(e.target)[0].classList[0] != "rsvControllers__newButton"
        && $(e.target)[0].classList[0] != "rsvShow__edit") {
        $(".rsvNew, .rsvShow, .rsvEdit").animate({ right: "-100vw" }, 300);
        $(".reservationsDeleted").animate({ marginBottom: "30" }, 500)
        $(".rsvNewEdit__errorMessages").html("");
      }
      console.log($(e.target))
    })


    $(".rsvNewEdit__form__right__clear").click(function () {
      $(".rsvNew__form__left > select:not(.rsvNew__form__left > select:nth-of-type(2)):not(.rsvNew__form__left > select:nth-of-type(3)):not(.rsvNew__form__left > select:nth-of-type(4))").val("");
      $("#reservation_date_1i").val($("#_date_1i").val())
      $("#reservation_date_2i").val($("#_date_2i").val())
      $("#reservation_date_3i").val($("#_date_3i").val())
      $(".rsvNew__form__left > select:nth-of-type(5)").val("11")
      $(".rsvNew__form__left > select:nth-of-type(6)").val("00")
      $(".rsvNew__form__left > input").val("")
      $(".rsvNew__form__right > textarea").val("")
      $(".rsvNew__form__right > select").val("");
    })

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
        console.log($(".rsvNew"))
        
        






        
      }).fail(function (data) {
        
      })
    })

    $(".rsvShow__edit").click(function () {
      $(".rsvEdit").animate({ right: 0 }, 300);
      $(".rsvNew, .rsvShow").animate({ right: "-100vw" }, 300);
      $(".reservationsDeleted").css({ marginBottom: "300px" })
      $.ajax({
        url: "/reservations/takeReservation",
        type: "GET",
        data: { id: $(this)[0].dataset.id },
        dataType: 'json'
      }).done(function (data) {
        // $("#rsvEdit_form").addClass("iiiiiiiiii")
        $("#rsvEdit_form").attr("action", `/reservations/${data.id}`)
        // 以下１行、今回は不要だが今後ヒントになるのでメモ
        // $("#rsvEdit_form").append(`<input type="hidden" name="_method" value="patch">`)
        // console.log($(".rsvEdit_aa").prompt())

        
        // console.log(data.clientid)
        if (data.clientid) {
          $("#rsvEdit_client").val(data.clientid)
          // console.log("あり")
        } else {
          $("#rsvEdit_client").prepend(`<option value="">クライアント</option>`)
          $("#rsvEdit_client").val("")
        }
          
        $("#rsvEdit_guest").val(data.guest)
        
        $("#rsvEdit_room").val(data.roomid)
        $("#rsvEdit_kaiseki").val(data.kaisekiid)
        $("#rsvEdit_number").val(data.number_of_guest)
        // console.log(data.minute)
        $("#rsvEdit_hour").val(data.start_hour)
        $("#rsvEdit_minute").val(data.minute)
        $("#rsvEdit_memo").val(data.memo)
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

    
    $("#rsvEdit_form").on("submit", function (e) {
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
        if (data.same_date || data.message) {
          createSet(data);
        }
        // $(".rsvEdit").animate({ right: "-100vw" }, 300);
        // $(".reservationsDeleted").animate({ marginBottom: "30" }, 500)
        
        
        





        
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
        $(".rsvShow").animate({ right: "-100vw" }, 300);
        $(".reservationsDeleted").animate({ marginBottom: "30" }, 500)
        // デリート情報のアペンドまだ
      })
    })

  }
});