let Helper = {};

export default Helper = {

    render : function() {

        var projects = Helper.getProjects();

        var squaresContainer = $('div.squares');
        var columns = 7;
        var rows = 5;
        var squaresCount = rows * columns;

        for(var i=0;i<squaresCount;i++) {

            var squareIdsForProjects = [16,17,18,24];
            var squareIdsForBottomLine = [29,30,31,32,33];

            if ($.inArray(i, $.merge(squareIdsForProjects, squareIdsForBottomLine)) != -1) {
                var square = $('<a/>').attr('href', '#desc');
            } else {
                var square = $('<div/>');
            }
            square.addClass('square').attr('id', 'square-' + i);

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

//          var openSourceId = squareIdsForBottomLine[0];
            var moreId = squareIdsForBottomLine[0];
            var contactId = squareIdsForBottomLine[1];
            var aboutId = squareIdsForBottomLine[2];
            var imprintId = squareIdsForBottomLine[3];
            var privacyId = squareIdsForBottomLine[4];

            if ($.inArray(i, squareIdsForBottomLine) != -1) {
                var newHeading = $('<div/>').addClass('heading');
                var directLink = false;
                var image = false;
                var marginTop = 22;
                switch(i) {
                    case moreId:
                        var nameEn = 'projects';
                        var nameDe = 'projekte';
                        break;
                    case contactId:
                        var nameEn = 'contact';
                        var nameDe = 'kontakt';
                        break;
                    case aboutId:
                        var nameEn = 'about';
                        var nameDe = 'über mich';
                        break;
                    case imprintId:
                        var nameEn = 'imprint';
                        var nameDe = 'impressum';
                        break;
                    case privacyId:
                        var nameEn = 'privacy';
                        var nameDe = 'datenschutz';
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

        var k = -1;
        for(var j=0;j<projects.length;j++) {

            var directLink = projects[j].directLink != undefined && projects[j].directLink;

            if (projects[j].more != undefined && projects[j].more == true && !directLink) {
                $('#projects').append('<div class="project">' + $('div#' + projects[j].id).html()) + '</div>';
                continue;
            }

            k++;
            var projectContainer = squaresContainer.find('#square-' + squareIdsForProjects[k]);
            projectContainer.addClass('notEmpty').addClass(projects[j].id);
            projectContainer.attr('title', projects[j].link);

            var newHeading = $('<div/>').addClass('heading');
            if (projects[j].heading != undefined) {
                var heading = projects[j].heading;
            } else {
                var heading = projects[j].link;
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
                var newImg = Helper.getThumbSmall(projects[j].img);
                projectContainer.append(newImg);
                projectContainer.addClass('hasImage');
            } else {
                projectContainer.addClass('hasNoImage');
            }
        }

        $('.desc').append('<a class="header-link" href="#wrapper"><span class="lang en"><< back</span><span class="lang de"><< zurück</span></a>');

        //elements in last row are predefined
        $('a.square.notEmpty').on('click', function() {
            var classes = $(this).attr('class');
            var splitClasses = classes.split(' ');
            var projectId = splitClasses[2];
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
            var heading = $(this).find('.heading');
            if (heading.html().toLowerCase().match('span')) {
                heading = heading.find('span.lang.en');
            }
            heading = heading.html().toLowerCase().replace(/\<br?>/i, '');
        });
        $('a.square.notEmpty').on('click', function() {
            var heading = $(this).find('.heading');
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
                var $target = $(this.hash);
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
                if ($target.length) {
                    var targetOffset = $target.offset().top;
                    $('html,body').animate({scrollTop: targetOffset}, 700);
                    return false;
                }
            }
        });

        this.initLocalisation();
        this.replaceEmailPlaceholder();

    }

    ,bindImageEvents : function() {
        $('a.square.hasImage').off('mouseenter');
        $('a.square.hasImage').off('mouseleave');
        $('a.square.hasImage:not(".selected")').on('mouseenter', Helper.bindImageMouseover);
        $('a.square.hasImage:not(".selected")').on('click', Helper.bindImageClick);
    }

    ,bindImageMouseover : function() {
        $(this).find('img').stop(true).animate({opacity:'toggle'}, {duration:1000});
        $(this).on('mouseleave', Helper.bindImageMouseover);
    }

    ,bindImageClick : function() {
        Helper.bindImageEvents();
    }

    ,smoothHideUnselectedImages : function() {
        $('a.square.hasImage:not(".selected") img').hide();
    }

    ,replaceEmailPlaceholder : function() {
        var emailContainers = $('#contact, #imprint, #privacy');
        var emailString = 'office' + '@' + 'rothaue' + 'r-it' + '.com';
        emailContainers.each(function() {
            $(this).html($(this).html().replace(/\[email\]/, '<a href="mailto:' + emailString + '">' + emailString + '</a>'));
        });
    }

    ,initLocalisation : function () {

        var userLang = navigator.language /* Mozilla */ || navigator.userLanguage /* IE */;

        var initLang = 'en';
        if (userLang.match(/de/) != -1) {
            initLang = 'de';
        }

        $('#lang-box a').css('opacity', 0.6);
        $('#lang-box .button-' + initLang).css('opacity', 1);
        $('#lang-box').show();

        $('#wrapper .lang').hide();
        $('#wrapper .lang.' + initLang).show();

        $('#lang-box a').hover(function () {
            opacityBefore = $(this).css('opacity');
            $(this).css('opacity', 0.99); //sic! sonst problem mit der kombination mouseout / click
          }, function () {
            if ($(this).css('opacity') != 1) {
                $(this).css('opacity', opacityBefore);
            }
          }
        );

        $('#lang-box a').click(function () {
            $('#lang-box a').css('opacity', 0.6);
            $(this).css('opacity', 1);
            var currentLang = $(this).attr('class').replace(/button-/, '');
            $('#wrapper .lang').hide();
            $('#wrapper .lang.' + currentLang).show();
        });

    }

    ,getThumbSmall : function(img) {
        return $('<img/>').attr('src', 'thumbs/small/' + img.name);
    }

    ,getProjects : function() {
        
        var projects = [];

        /* START SQUARES */
        var o = {
            heading : 'dorfladen-<br />online.at',
            directLink : 'https://dorfladen-online.at',
            img  : {name : 'dorfladen-online.png' }
        };
        projects.push(o);
        var o = {
            heading : 'foodcoop<br />shop.com',
            directLink : 'https://www.foodcoopshop.com',
            img  : {name : 'foodcoopshop.png' }
        };
        projects.push(o);
        var o = {
            heading : 'hofladen-<br />online.at',
            directLink : 'https://www.hofladen-online.at',
            img  : {name : 'hofladen-online.jpg' }
        };
        projects.push(o);
        var o = {
            heading : 'open source<br />github',
            directLink : 'https://github.com/mrothauer',
            img  : {name : 'github.png' }
        };
        projects.push(o);
        /* END SQUARES */

        /* START PROJECTS */
        var o = {
           link : 'www.dorfladen-online.at',
            img  : {name : 'dorfladen-online.png' },
            id : 'dorfladen-online',
            more: true
        };
        projects.push(o);
        var o = {
           link : 'www.foodcoopshop.com',
            img  : {name : 'foodcoopshop.png' },
            id : 'foodcoopshop',
            more: true
        };
        projects.push(o);
        var o = {
           link : 'www.hofladen-online.at',
            img  : {name : 'hofladen-online.png' },
            id : 'hofladen-online',
            more: true
        };
        projects.push(o);
        var o = {
            heading : 'www.reparatur-<br />initiativen.de',
            link : 'www.reparatur-initiativen.de',
            img  : {name : 'reparatur-initiativen.png' },
            id : 'reparatur-initiativen',
            more: true
        };
        projects.push(o);
        var o = {
            heading : 'www.offene-<br />werkstaetten.org',
            link : 'www.offene-werkstaetten.org',
            id : 'offene-werkstaetten',
            more: true
        };
        projects.push(o);
        var o = {
            heading : 'www.fairteiler-<br />scharnstein.at',
            link : 'www.fairteiler-scharnstein.at',
            img  : {name : 'fairteiler-scharnstein.png' },
            id : 'fairteiler-scharnstein',
            more: true
        };
        projects.push(o);
        var o = {
            link : 'www.wildniscamps.at',
            img  : {name : 'wildniscamps.png' },
            id : 'wildniscamps',
            more: true
        };
        projects.push(o);
        var o = {
             link : 'www.motorsagla.at',
             img  : {name : 'motorsagla.png' },
             id : 'motorsagla',
            more: true
        };
        projects.push(o);
        var o = {
             link : 'www.grabner-gmbh.at',
             img  : {name : 'grabner.png' },
             id : 'grabner',
             more : true
        };
        projects.push(o);
        /* END PROJECTS */

        return projects;

    }

};