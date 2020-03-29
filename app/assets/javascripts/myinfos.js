// $(function() {
//   $(".draggable").draggable({ revert: "invalid", snap: ".table", snapMode: 'inner', }).droppable({});
//   $(".table").droppable({
//     drop: function (e, ui) {
//       let $srcObj = $(ui.draggable[0]);
//       $srcObj.offset($(this).offset());
//       return false;
//     },
//   });
// });

function modDroparea(){
  $('.table').each(function () {
    $(this).droppable({
      hoverClass: 'imgover',
      disabled: $(this).find('.draggable').length > 0
    });
  });
}


$(function(){
  $('.draggable').draggable({
    revert:'invalid',
    zIndex:'1000',
  });
  modDroparea();
  $('.table').droppable({
      drop: function(e, ui){
        ui.draggable.prependTo(this).css({top:'0',left:'0'});
        modDroparea();
      },
    });
});