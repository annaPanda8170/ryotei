function allTable(aaaaaa){
  $('.rsvTableDroppable').each(function () {
    $(this).droppable({
      hoverClass: 'dropHover',
      disabled: $(this).find('.reservationOne').length > 0
    });
    // console.log(this)
  });
  // console.log(aaaaaa)
  
}
let aaaaaa;
$(function () {
  allTable()
  $(".reservationOne").draggable({
    revert: "invalid",
    drag: function () {
      console.log(aaaaaa)
      
    }
  });
  $(".rsvTableDroppable").droppable({
    drop: function (e, ui) {
      ui.draggable.prependTo(this).css({ top: '0', left: '0' });
      // console.log(e.target.dataset.set);
      aaaaaa = Number(e.target.dataset.set) + 1;
      allTable(aaaaaa)
    },
    classes: function () {
      $("[data-set=" + aaaaaa + "]").removeClass("rsvTableDroppable");
      $("[data-set=" + aaaaaa + "]").removeClass("ui-droppable");
      $("[data-set=" + aaaaaa + "]").removeClass("ui-droppable-hover");
      $("[data-set=" + aaaaaa + "]").removeClass("ui-droppable-active");
    }
    // over: function () {
      
    // }
  });
});