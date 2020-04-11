function dontSaved() {
  $(".dont_saved").click(function () {
    if (!confirm(`保存されていません。\n戻ってよろしいですか？`)) {
      return false
    }
  })
}