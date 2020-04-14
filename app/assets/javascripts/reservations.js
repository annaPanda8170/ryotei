// ##########ホバーしている所に色付け関数#################################################

function hoverTable() {
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

// ##########最初に表内に四角一個一個を作る関数#########################################################

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

// ##########ドロップイベント定義##############################################################

function droppableEvent() {
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
        if (!confirm(`${drop.hour}時${dropMinute}分の${drop.roomname}に移動しますか？`)) {
          ui.draggable.css({ top: '0', left: '0' });
          // 間違ってずらした時用、イベント キャンセル。本当はしたいが、復活させ方がわからない
          // $(".reservationOne__showButton").off();
          return false
        }
      } else if (drag.hour != drop.hour || drag.minute != drop.minute) {
        if (!confirm(`${drop.hour}時${dropMinute}分に移動しますか？`)) {
          ui.draggable.css({ top: '0', left: '0' });
           // $(".reservationOne__showButton").off();
          return false
        }
      } else if (drag.room != drop.roomname) {
        if (!confirm(`${drop.roomname}に移動しますか？`)) {
          ui.draggable.css({ top: '0', left: '0' });
          // $(".reservationOne__showButton").off();
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
      hoverTable();
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

        // 以下三つデバック用あとで消す
        // $id.find(".tttttt").text(data.room);
        // $id.find(".uuuuuu").text(data.hour);
        // $id.find(".vvvvvv").text(data.minute);

      }).fail(function () {
      });
    }
  });
}

// ##########新規予約スライドウインドウが開くイベント ######################################################

function newOpen() {
  $(".rsvControllers__newButton").click(function () {
    $(".rsvNew").animate({ right: 0 }, 300);
    $(".rsvShow, .rsvEdit").animate({ right: "-100vw" }, 300);
    $(".reservationsDeleted").css({ marginBottom: "300px" })
  })
}

// ##########予約編集スライドウインドウが開くイベント ######################################################

function editOpen() {
  $(".rsvShow__edit").click(function () {
    $(".rsvEdit").animate({ right: 0 }, 300);
    $(".rsvNew").animate({ right: "-100vw" }, 300);
    $(".rsvShow").animate({ right: "-100vw" }, 300);
    $(".reservationsDeleted").css({ marginBottom: "300px" })
    $.ajax({
      url: "/reservations/takeReservation",
      type: "GET",
      data: { id: $(this)[0].dataset.id },
      dataType: 'json'
    }).done(function (data) {
      $("#rsvEdit_form").attr("action", `/reservations/${data.id}`)
      // 以下１行、今回は不要だが今後ヒントになるのでメモ
      // $("#rsvEdit_form").append(`<input type="hidden" name="_method" value="patch">`)
      if (data.clientid) {
        $("#rsvEdit_client").val(data.clientid)
      } else {
        $("#rsvEdit_client").prepend(`<option value="">クライアント</option>`)
        $("#rsvEdit_client").val("")
      }
      $("#rsvEdit_guest").val(data.guest)
      $("#rsvEdit_room").val(data.roomid)
      $("#rsvEdit_kaiseki").val(data.kaisekiid)
      $("#rsvEdit_number").val(data.number_of_guest)
      $("#rsvEdit_hour").val(data.start_hour)
      $("#rsvEdit_minute").val(data.minute)
      $("#rsvEdit_memo").val(data.memo)
    }).fail(function () {
    })
  })
}

// ##########SHOWスライドウインドウが開くイベント ######################################################

function showOpen() {
  $(".reservationOne__showButton").click(function () {
    $(".rsvNewEdit__errorMessages").empty();
    $(".rsvNew, .rsvEdit").animate({ right: "-100vw" }, 300);
    $(".rsvShow").animate({ right: 0 }, 300);
    
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
        $(".rsvShow__link").html(`<div class="reservation_revival" data-id=${data.id}>復活</div>`)
        revival()
      }
      $(".rsvShow__edit").attr("data-id", `${data.id}`)
    }).fail(function () {
    })
  })
}

// ##########復活ボタンクリック時のイベント######################################################

function revival() {
  $(".reservation_revival").click(function () {
    if (!confirm(`予約を復活してよろしいですか？`)) {
      return false
    }
    $.ajax({
      url: `/reservations/${$(this).data("id")}/revival`,
      type: "PUT",
      data: { id: $(this).data("id"), status: 1 },
      dataType: 'json'
    }).done(function (data) {
      $(`[data-roomid="${data.roomid}"]` + `[data-hour="${data.past_hour}"]` + `[data-minute="${data.past_minute}"]`).empty();
      if (data.same_date || data.message) {
        let grade = $("#current_member_info").data("grade");
        createSet(data, grade);
      }
      if (!data.message) {
        $(`div.rsvDeleted[data-id=${data.id}]`).remove();
      }
    })
  })
}

// ##########予約ホバー時、詳細ボタンと会計ボタンを出すイベント ######################################################

function reservationOneHover() {
  $(".reservationOne").hover(function () {
    $(this).find(".reservationOne__showButton, .reservationOne__sale").stop().fadeIn();
  }, function () {
    if (!$(this)[0].dataset.status) {
      $(this).find(".reservationOne__sale").stop().fadeOut();
    }
    $(this).find(".reservationOne__showButton").stop().fadeOut();
  })
}

// ##########登録・変更・復活時の予約を表に当てはめるか、エラー文を出す関数######################################

function createSet(data, grade) {
  // エラーの場合
  if (data.message) {
    $(".rsvNewEdit__errorMessages").text("")
    for (let key in data.message) {
      $(".rsvNewEdit__errorMessages").append(`<div>${data.message[key]}</div>`)
    }
    $('.form_submit').prop('disabled', false);
  // エラーじゃない場合
  } else {
    let html1 = `<div class="reservationOne ui-draggable ui-draggable-handle" data-hour=${data.hour} data-id=${data.id} data-minute=${data.minute} data-room=${data.room} style="top: 0px; left: 0px;">
    <div class="reservationOne__clientGuest">${data.clientGuest} 様</div>
    <div class="reservationOne__numberOfGuest">${data.numOfGuest} 名</div>
    <div class="reservationOne__memo">${data.memo}</div>
    <div class="reservationOne__showButton" data-id=${data.id}>詳細</div>`
    let html2 = "";
    if (grade == 2 || grade == 3) {
      html2 = `<a class="reservationOne__sale" href="/sales/new.${data.id}">未会計</a></div>`
    } else {
      html2 = `</div>`
    }
    html = html1 + html2;
    $table = $(`[data-roomname="${data.room}"]`+`[data-hour="${data.hour}"]`+`[data-minute="${data.minute}"]`);
    $table.prepend(html);
    for (let i = 1; i < 10; i++){
      $tableSub = $(`#${Number($table[0].id) +i}`);
      $tableSub.prepend(`<div class="reservationOne__sub" data-subid="${data.id}"></div>`)
    }
    // 新規予約のフォームを初期化
    $(".rsvNew__form__left > select:not(.rsvNew__form__left > select:nth-of-type(2)):not(.rsvNew__form__left > select:nth-of-type(3)):not(.rsvNew__form__left > select:nth-of-type(4))").val("");
    $(".rsvNew__form__left > select:nth-of-type(5)").val("11")
    $(".rsvNew__form__left > select:nth-of-type(6)").val("00")
    $(".rsvNew__form__right > select").val("");
    // ウインドウを閉じる
    $(".rsvNew, .rsvEdit, .rsvShow").animate({ right: "-100vw" }, 300);
    $(".reservationsDeleted").animate({ marginBottom: "30" }, 500);
    // 当てはめた予約に対してそれぞれのイベントを適用
    $(".reservationOne").draggable({
      revert: "invalid",
    });
    reservationOneHover();
    showOpen();
    $('.form_submit').prop('disabled', false);
  }
}

// #####################################################################################################
// ##########以下実行部###################################################################################
// #####################################################################################################

$(function () {
  // ここをrootにしたので一時廃止
  // if (location.pathname.match("/reservations")) {
    // まず行を作る
    for (let i = 0; i < $(".data--room").length; i++){
      $(".rsvTable").append(`<div class="rsvTable__tr"></div>`)
    }
    // 行内を整形
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
      // 予約の入っている表の横9個分を埋める
      for (let i = 1; i < 10; i++){
        $tableSub = $(`#${Number($table[0].id) +i}`);
        $($tableSub).prepend(`<div class="reservationOne__sub" data-subid="${$(this)[0].dataset.id}"></div>`)
      }
    })

    // ドラッグ関連イベント 
    hoverTable()
    $(".reservationOne").draggable({
      revert: "invalid"
    });
    droppableEvent()

    // ウインドウオープン関連イベント 
    newOpen()
    showOpen()
    editOpen()

    // ウインドウクローズイベント 
    $(document).click(function (e) {
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
    })

    // その他イベント 
    reservationOneHover()
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

    // 登録処理
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
        let grade = $("#current_member_info").data("grade");
        createSet(data, grade);
      }).fail(function (data) {
      })
    })
    
    // 編集処理
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
          let grade = $("#current_member_info").data("grade");
          createSet(data, grade);
        }
      }).fail(function (data) {
      })
    })

    // 削除処理
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
        let minute = 0;
        if (data.minute == 0){
          minute = "00"
        } else {
          minute = data.minute
        }
        $(".reservationsDeleted>h2").after(`<div class="rsvDeleted" data-id=${data.id}>
        <div class="rsvDeleted__content">${data.clientGuest} 様</div>
        <div class="rsvDeleted__content">${data.numOfGuest} 名</div>
        <div class="rsvDeleted__content">${data.hour} : ${minute}</div>
        <div class="rsvDeleted__content">${data.memo}</div>
        <div class="reservationOne__showButton rsvDeleted__show" data-id=${data.id}>詳細</div>
        </div>`)
        showOpen()
        // デリート情報順序まだ!!!!!!!!!!!!!!!!!!
      })
    })
  // ここをrootにしたので一時廃止
  // }
});