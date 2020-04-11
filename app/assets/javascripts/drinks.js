function drinkDelete() {
  $("#drink_delete").click(function () {
    if (!confirm(`削除してよろしいですか？`)) {
      return false
    }
  })
}

$(function (){
  drinkDelete();
})