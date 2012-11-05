/*! jQuery.ellipsify (c) 2011-2012, Rico Sta. Cruz. MIT License.
 *  Based on http://snipplr.com/view/46615
 *  https://github.com/rstacruz/jquery-stuff/tree/master/ellipsify */

// Usage:
//   $("article h2").ellipsify();

(function($) {
  $.fn.ellipsify = function() {
    var $this = $(this);

    if ($this.length > 1) {
      return $this.each(function() { $(this).ellipsify(); });
    }

    var $clone    = $this.clone();
    var text      = $this.html();
    var shortened = false;
    var offset    = 2;

    $clone.css({
      display: 'none',
      position: 'absolute',
      overflow: 'visible',
      width:  $this.width(),
      height: 'auto'});

    $this.after($clone);

    function tooBig() {
      return $clone.outerHeight() > ($this.outerHeight() + offset);
    }

    while (text.length > 0 && tooBig()) {
      shortened = true;
      text = text.substr(0, text.lastIndexOf(' '));
      $clone.html(text + '&hellip;');
    }

    // Tooltip
    if ((shortened) && (!$this.attr('title'))) {
      $this.attr('title', $this.text());
    }

    $this.html($clone.html());
    $clone.remove();

    return this;
  };
})(jQuery);
