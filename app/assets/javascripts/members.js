function memberSave() {
  $("#member_save").click(function () {
    if (!confirm(`保存してよろしいですか？`)) {
      return false
    }
  })
}

$(function () {
  memberSave()
})