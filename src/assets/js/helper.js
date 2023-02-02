export default function init() {

    bindImageEvents();

    $('a.square.notEmpty').on('mouseover', function() {
        let heading = $(this).find('.heading');
        if (heading.html().toLowerCase().match('span')) {
            heading = heading.find('span.lang.en');
        }
        heading = heading.html().toLowerCase().replace(/\<br?>/i, '');
    });
    $('a.square.notEmpty').on('click', function() {
        let heading = $(this).find('.heading');
        if (heading.html().toLowerCase().match('span')) {
            heading = heading.find('span.lang.en');
        }
        heading = heading.html().toLowerCase().replace(/\<br?>/i, '');
    });

    $('.square.about').trigger('click');

    // Smooth Scroll to Top
    // http://www.elmastudio.de/wordpress/back-to-top-buttons-mit-smooth-scroll-und-fading-in-wordpress/
    $('a.square[href*=\\#], a.header-link').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            let $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
            if ($target.length) {
                let targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 700);
                return false;
            }
        }
    });

    replaceEmailPlaceholder();

  }

  function bindImageEvents() {
    $('a.square.hasImage').off('mouseenter');
    $('a.square.hasImage').off('mouseleave');
    $('a.square.hasImage:not(".selected")').on('mouseenter', bindImageMouseover);
    $('a.square.hasImage:not(".selected")').on('click', bindImageClick);
  }

  function bindImageMouseover() {
    $(this).find('img').stop(true).animate({opacity:'toggle'}, {duration:1000});
    $(this).on('mouseleave', bindImageMouseover);
  }

  function bindImageClick() {
    bindImageEvents();
  }

  function smoothHideUnselectedImages() {
    $('a.square.hasImage:not(".selected") img').hide();
  }

  function replaceEmailPlaceholder() {
    let emailContainers = $('#contact, #imprint, #privacy');
    let emailString = 'office' + '@' + 'rothaue' + 'r-it' + '.com';
    emailContainers.each(function() {
        $(this).html($(this).html().replace(/\[email\]/, '<a href="mailto:' + emailString + '">' + emailString + '</a>'));
    });
  }
 