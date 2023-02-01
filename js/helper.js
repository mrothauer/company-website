export default function render(projects) {

    //elements in last row are predefined
    $('a.square.notEmpty').on('click', function() {
        let classes = $(this).attr('class');
        let splitClasses = classes.split(' ');
        let projectId = splitClasses[2];
        projectId = projectId.split('<br>'); // for imprint<br>disclaimer
        projectId = projectId[0];
        $('div.description').hide();
        $('a.square').removeClass('selected');
        $(this).addClass('selected');
        $('div.desc').hide();
        $('div.description').show();
        $('#' + projectId).show();
        smoothHideUnselectedImages();
        bindImageEvents();
    });

    bindImageEvents();

    $('a#head').on('click', function() {
        $('.square.contact').trigger('click');
    });

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

  function getThumbSmall(img) {
    return $('<img/>').attr('src', 'thumbs/small/' + img.name);
  }