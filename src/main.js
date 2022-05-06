$(function() {
  $('#datetimepicker3').datetimepicker({
    inline:true,
    onSelectDate: function(dateText, inst) { console.log(inst.val()); }
  })
});