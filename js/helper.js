let Helper = {

    render : function(projects) {

        let squaresContainer = $('div.squares');
        let columns = 7;
        let rows = 5;
        let squaresCount = rows * columns;
        let squareIdsForProjects = [16,17,18,24];
        let squareIdsForBottomLine = [29,30,31,32,33];

        for(let i=0;i<squaresCount;i++) {

            let square;

            if ($.inArray(i, $.merge(squareIdsForProjects, squareIdsForBottomLine)) != -1) {
                square = $('<a/>').attr('href', '#desc');
            } else {
                square = $('<div/>');
            }
            if (square) {
                square.addClass('square').attr('id', 'square-' + i);
            }

            if ((i + 1) % columns == 0) {
                square.addClass('last-column');
            }
            if (i % columns == 0) {
                square.addClass('first-column');
            }
            if (i > (squaresCount - columns - 1)) {
                square.addClass('last-row');
            }
            if (i < columns) {
                square.addClass('first-row');
            }

//          let openSourceId = squareIdsForBottomLine[0];
            let moreId = squareIdsForBottomLine[0];
            let contactId = squareIdsForBottomLine[1];
            let aboutId = squareIdsForBottomLine[2];
            let imprintId = squareIdsForBottomLine[3];
            let privacyId = squareIdsForBottomLine[4];

            if ($.inArray(i, squareIdsForBottomLine) != -1) {
                let newHeading = $('<div/>').addClass('heading');
                let directLink = false;
                let image = false;
                let marginTop = 22;
                let nameEn, nameDe;
                switch(i) {
                    case moreId:
                        nameEn = 'projects';
                        nameDe = 'projekte';
                        break;
                    case contactId:
                        nameEn = 'contact';
                        nameDe = 'kontakt';
                        break;
                    case aboutId:
                        nameEn = 'about';
                        nameDe = 'über mich';
                        break;
                    case imprintId:
                        nameEn = 'imprint';
                        nameDe = 'impressum';
                        break;
                    case privacyId:
                        nameEn = 'privacy';
                        nameDe = 'datenschutz';
                        break;
                }

                newHeading.css('margin-top', marginTop + 'px');
                newHeading.html('<span class="lang de">' + nameDe + '</span><span class="lang en">' + nameEn + '</span>');
                if (directLink !== false) {
                    square.attr('href', directLink);
                    square.attr('target', '_blank');
                }
                square.addClass(nameEn);
                square.addClass('notEmpty');
                if (image === false) {
                    square.addClass('hasNoImage');
                } else {
                    square.addClass('hasImage');
                    square.append($('<img />').attr('src', image));
                }
                square.append(newHeading);
            }
            squaresContainer.find('div.description').before(square);
        }

        let k = -1;
        for(let j=0;j<projects.length;j++) {

            let directLink = projects[j].directLink != undefined && projects[j].directLink;

            if (projects[j].more != undefined && projects[j].more == true && !directLink) {
                $('#projects').append('<div class="project">' + $('div#' + projects[j].id).html()) + '</div>';
                continue;
            }

            k++;
            let projectContainer = squaresContainer.find('#square-' + squareIdsForProjects[k]);
            projectContainer.addClass('notEmpty').addClass(projects[j].id);
            projectContainer.attr('title', projects[j].link);

            let newHeading = $('<div/>').addClass('heading');
            let heading;
            if (projects[j].heading != undefined) {
                heading = projects[j].heading;
            } else {
                heading = projects[j].link;
            }
            if (heading.match(/\<br/i)) {
                newHeading.addClass('heading-with-break');
            }
            heading = heading.replace(/www\./, '');
            newHeading.html(heading);
            projectContainer.append(newHeading);

            if (directLink) {
                projectContainer.attr('href', projects[j].directLink);
                projectContainer.attr('target', '_blank');
            }

            if (projects[j].img != undefined) {
                let newImg = Helper.getThumbSmall(projects[j].img);
                projectContainer.append(newImg);
                projectContainer.addClass('hasImage');
            } else {
                projectContainer.addClass('hasNoImage');
            }
        }

        $('.desc').append('<a class="header-link" href="#wrapper"><span class="lang en"><< back</span><span class="lang de"><< zurück</span></a>');

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
            Helper.smoothHideUnselectedImages();
            Helper.bindImageEvents();
        });

        this.bindImageEvents();

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

        this.initLocalisation();
        this.replaceEmailPlaceholder();

    },

    bindImageEvents : function() {
        $('a.square.hasImage').off('mouseenter');
        $('a.square.hasImage').off('mouseleave');
        $('a.square.hasImage:not(".selected")').on('mouseenter', Helper.bindImageMouseover);
        $('a.square.hasImage:not(".selected")').on('click', Helper.bindImageClick);
    },

    bindImageMouseover : function() {
        $(this).find('img').stop(true).animate({opacity:'toggle'}, {duration:1000});
        $(this).on('mouseleave', Helper.bindImageMouseover);
    },

    bindImageClick : function() {
        Helper.bindImageEvents();
    },

    smoothHideUnselectedImages : function() {
        $('a.square.hasImage:not(".selected") img').hide();
    },

    replaceEmailPlaceholder : function() {
        let emailContainers = $('#contact, #imprint, #privacy');
        let emailString = 'office' + '@' + 'rothaue' + 'r-it' + '.com';
        emailContainers.each(function() {
            $(this).html($(this).html().replace(/\[email\]/, '<a href="mailto:' + emailString + '">' + emailString + '</a>'));
        });
    },

    initLocalisation : function () {

        let userLang = navigator.language /* Mozilla */ || navigator.userLanguage /* IE */;

        let initLang = 'en';
        if (userLang.match(/de/) != -1) {
            initLang = 'de';
        }

        $('#wrapper .lang').hide();
        $('#wrapper .lang.' + initLang).show();

        $('#lang-box a').on('click', function () {
            let currentLang = $(this).attr('class').replace(/button-/, '');
            $('#wrapper .lang').hide();
            $('#wrapper .lang.' + currentLang).show();
        });

    },

    getThumbSmall : function(img) {
        return $('<img/>').attr('src', 'thumbs/small/' + img.name);
    },

};

export default Helper;