function clientDelete() {
  $("#client_delete").click(function () {
    if (!confirm(`削除してよろしいですか？`)) {
      return false
    }
  })
}

$(function (){
  clientDelete();
})