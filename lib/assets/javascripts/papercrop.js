(function ($) {
  window.jcrop_api = null;

  window.init_papercrop = function() {
    $("div[id$=_cropbox]").each(function() {

      var attachment = $(this).attr("id").replace("_cropbox", "");
      var preview    = !!$("#" + attachment + "_crop_preview").length;
      var aspect     = $("input#" + attachment + "_aspect").val();
      var width      = $(this).width();

      update_crop = function(coords) {
        var preview_width, rx, ry;

        if (preview) {
          preview_width = $("#" + attachment + "_crop_preview_wrapper").width();

          rx = preview_width / coords.w;
          ry = preview_width / coords.h;

          $("img#" + attachment + "_crop_preview").css({
            width      : Math.round(rx * $("input[id$='_" + attachment + "_original_w']").val()) + "px",
            height     : Math.round((ry * $("input[id$='_" + attachment + "_original_h']").val()) / aspect) + "px",
            marginLeft : "-" + Math.round(rx * coords.x) + "px",
            marginTop  : "-" + Math.round((ry * coords.y) / aspect) + "px"
          });
        }

        var x = Math.round(coords.x);
        var y = Math.round(coords.y);
        var w = Math.round(coords.w);
        var h = Math.round(coords.h);

        if (x != 0 || y != 0 || w != 0 || h != 0) {
          $("#" + attachment + "_crop_x").val(x);
          $("#" + attachment + "_crop_y").val(y);
          $("#" + attachment + "_crop_w").val(w);
          $("#" + attachment + "_crop_h").val(h);
        }
      };

      $(this).find("img").Jcrop({
        onChange    : update_crop,
        onSelect    : update_crop,
        setSelect   : [0, 0, 0, 0],
        aspectRatio : aspect,
        boxWidth    : $("input[id$='_" + attachment + "_box_w']").val()
      }, function() {
        jcrop_api = this;
      });

      // somewhere, Jcrop sets these to 0, so if a user never intends to crop, it crops anyway
      var initialX = $("#" + attachment + "_crop_x").val("");
      var initialY = $("#" + attachment + "_crop_y").val("");
      var initialW = $("#" + attachment + "_crop_w").val("");
      var initialH = $("#" + attachment + "_crop_h").val("");
    });
  };

  $(document).ready(function() {
    init_papercrop();
  });

}(jQuery));
