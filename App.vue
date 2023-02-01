<script setup lang="ts">

  import { onMounted } from 'vue'
  import projects from './js/projects.js'

  import $ from 'jquery';
  window.$ = $;
  
  function render(projects) {

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

        //  let openSourceId = squareIdsForBottomLine[0];
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
            let newImg = getThumbSmall(projects[j].img);
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

  const message = 'FoodCoopShop'
  
  onMounted(() => {
    render(projects)
  })

</script>

<template>

  <a id="head" href="javascript:void(0);"></a>
  <LanguageToggle />

  <div class="squares">
    <div id="desc" class="description square">

      <div class="desc" id="foodcoopshop">

        <div class="left">
          <b>{{ message }}</b>
          <ul>
            <li class="lang de">Software für Foodcoops</li>
            <li class="lang en">Software for food-coops</li>
            <li class="lang de">Entwickler: Mag. (FH) Mario Rothauer</li>
            <li class="lang en">Developed by: Mag. (FH) Mario Rothauer</li>
            <li><span class="lang de">Seit</span><span class="lang en">Since</span> 2016 <a href="https://github.com/foodcoopshop/foodcoopshop" target="_blank">Open Source</a></li>
            <li class="lang de"><a href="https://www.foodcoopshop.com/2019/01/foodcoopshop-im-extra-blick/" target="_blank">Bericht über FoodCoopShop im extra-blick (31.01.2019)</a></li>
            <li class="lang de"><a href="https://www.tips.at/news/scharnstein/wirtschaft-politik/419922-digitalisierung-unterstuetzt-die-nahversorgung-im-almtal" target="_blank">Bericht über FoodCoopShop in der Tips (14.03.2018)</a></li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.foodcoopshop.com" class="external">
            <img src="/thumbs/big/foodcoopshop.png" />
          </a>
          <a target="_blank" href="https://www.foodcoopshop.com" class="project-link external">www.foodcoopshop.com</a>
        </div>

      </div>

      <div class="desc" id="dorfladen-online">

        <div class="left">
          <b>Dorfladen Online</b>
          <ul>
            <li class="lang de">Software zum Betreiben von regionalen Lebensmittelgeschäften</li>
            <li class="lang en">Online shop for small grocery stores</li>
            <li class="lang de">Entwickler: Mag. (FH) Mario Rothauer</li>
            <li class="lang en">Developed by: Mag. (FH) Mario Rothauer</li>
            <li><span class="lang de">Seit</span><span class="lang en">Since</span> 2021 <a href="https://foodcoopshop.github.io/de/dorfladen-online.html" target="_blank">Open Source</a></li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.dorfladen-online.at" class="external">
            <img src="/thumbs/big/dorfladen-online-neu.png" />
          </a>
          <a target="_blank" href="https://www.dorfladen-online.at" class="project-link external">www.dorfladen-online.at</a>
        </div>

      </div>

      <div class="desc" id="hofladen-online">

        <div class="left">
          <b>Hofladen Online</b>
          <ul>
            <li class="lang de">Online-Shop für Direktvermarkter</li>
            <li class="lang en">Online shop for direct sellers</li>
            <li class="lang de">Entwickler: Mag. (FH) Mario Rothauer</li>
            <li class="lang en">Developed by: Mag. (FH) Mario Rothauer</li>
            <li><span class="lang de">Seit</span><span class="lang en">Since</span> 2020 <a href="https://foodcoopshop.github.io/de/hofladen-online.html" target="_blank">Open Source</a></li>
            <li class="lang de"><a href="https://www.foodcoopshop.com/2018/06/leitartikel-vom-markt-platz-zum-online-markt/" target="_blank">Leitartikel für "Leben in Stadt und Land" (2018)</a></li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.hofladen-online.at" class="external">
            <img src="/thumbs/big/hofladen-online.png" />
          </a>
          <a target="_blank" href="https://www.hofladen-online.at" class="project-link external">www.hofladen-online.at</a>
        </div>

      </div>

      <div class="desc" id="reparatur-initiativen">

        <div class="left">
          <b>Netzwerk Reparatur-Initiativen</b>
          <ul>
            <li class="lang de">Wartung und Weiterentwicklung des Portals</li>
            <li class="lang de"><a href="https://www.nachhaltigkeitspreis.de/design/sieger/" target="_blank">Dezember 2020: Sieger des Deutschen Nachhaltigkeitspreises Design in der Kategorie Vorreiter</a></li>
            <li class="lang en">Maintainance and development</li>
            <li><span class="lang de">Seit</span><span class="lang en">Since</span> 2019 <a href="https://github.com/anstiftung/mapped-repair-events" target="_blank">Open Source</a></li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.reparatur-initiativen.de" class="external">
            <img src="/thumbs/big/reparatur-initiativen.png" />
          </a>
          <a target="_blank" href="https://www.reparatur-initiativen.de" class="project-link external">www.reparatur-initiativen.de</a>
        </div>

      </div>

      <div class="desc" id="wildniscamps">

        <div class="left">
          <b>Wildnischule Wildniscamps, Viechtwang</b>
          <ul>
            <li class="lang de">Die Wildnisschule eures Vertrauens</li>
            <li class="lang en">Wilderness school, Upper Austria</li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.wildniscamps.at" class="external">
            <img src="/thumbs/big/wildniscamps.png" />
          </a>
          <a target="_blank" href="https://www.wildniscamps.at" class="project-link external">www.wildniscamps.at</a>
        </div>

      </div>

      <div class="desc" id="fairteiler-scharnstein">

        <div class="left">
          <b>Fairteiler Scharnstein, Almtal</b>
          <ul>
            <li class="lang de">Foodcoop in Scharnstein, Oberösterreich</li>
            <li class="lang en">Foodcoop in Scharnstein, Upper Austria</li>
            <li class="lang de">basierend auf <a href="https://www.foodcoopshop.com">FoodCoopShop</a></li>
            <li class="lang en">based on <a href="https://www.foodcoopshop.com">FoodCoopShop</a> </li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.fairteiler-scharnstein.at" class="external">
            <img src="/thumbs/big/fairteiler-scharnstein.png" />
          </a>
          <a target="_blank" href="https://www.fairteiler-scharnstein.at" class="project-link external">www.fairteiler-scharnstein.at</a>
        </div>

      </div>

      <div class="desc" id="grabner">

        <div class="left">
          <b class="lang de">Grabner GmbH, Tischlerei, Grünau</b>
          <b class="lang en">Grabner Ltd., Carpenter, Upper Austria</b>
          <ul>
            <li>Layout by cread.at</li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="http://www.grabner-gmbh.at" class="external">
            <img src="/thumbs/big/grabner.png" />
          </a>
          <a target="_blank" href="http://www.grabner-gmbh.at" class="project-link external">www.grabner-gmbh.at</a>
        </div>

      </div>

      <div class="desc" id="offene-werkstaetten">

        <div class="left">
          <b class="lang de">Portal der Offene Werkstätten</b>
          <b class="lang en">Portal of open workshops</b>
          <ul>
            <li class="lang de">Wartung und Weiterentwicklung des Portals</li>
            <li class="lang en">Maintainance and development</li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.offene-werkstaetten.org" class="external">
            <img src="/thumbs/big/offene-werkstaetten.png" />
          </a>
          <a target="_blank" href="https://www.offene-werkstaetten.org" class="project-link external">www.offene-werkstaetten.org</a>
        </div>

      </div>

      <div class="desc" id="motorsagla">

        <div class="left">
          <b class="lang de">Motorsägenschnitzer Herbert Danzer, Kirchham, Oberösterreich</b>
          <b class="lang en">Chainsaw carving, Upper Austria</b>
          <ul>
            <li class="lang de">User-freundliche Implementierung der Software <a target="_blank" href="http://www.twospy.com/galleriffic/">galleriffic</a></li>
            <li class="lang en">User-friendly implementation of <a target="_blank" href="http://www.twospy.com/galleriffic/">galleriffic image gallery</a></li>
          </ul>
        </div>

        <div class="right">
          <a target="_blank" href="https://www.motorsagla.at" class="external">
            <img src="/thumbs/big/motorsagla.png" />
          </a>
          <a target="_blank" href="https://www.motorsagla.at" class="project-link external">www.motorsagla.at</a>
        </div>

      </div>

      <div class="desc" id="projects"></div>

      <div class="desc" id="about">

        <div>

          <img alt="Mario Rothauer" width="200" height="200" src="/img/profilbild-netidee.jpg" />

          <b>
            <span><a style="text-decoration: underline" href="https://www.foodcoopshop.com/2019/01/foodcoopshop-im-extra-blick/" target="_blank"><span style="float: none;">Bericht über FoodCoopShop im extra-blick (31.01.2019)</span></a></span>
          </b>
          <br /><br />

          <b>
            <span class="lang de">Bericht über FoodCoopShop in der Tips (14.03.2018)</span>
            <span class="lang en">Article about FoodCoopShop in Tips (in German)</span>
          </b><br />

          <p>
            <a style="text-decoration: underline" href="https://www.tips.at/news/scharnstein/wirtschaft-politik/419922-digitalisierung-unterstuetzt-die-nahversorgung-im-almtal" target="_blank"><span style="float: none;" class="lang de">Online-Version</span><span style="float: none;" class="lang en">online version</span></a>
            / <a style="text-decoration: underline" target="_blank" href="https://www.tips.at/zeitung-epaper/?ausgabe=tips-gmunden&id=31669#/22"><span style="float: none;" class="lang de">Print-Ausgabe</span><span style="float: none;" class="lang en">print version</span></a>
          </p>

          <br />

          <p class="lang en">
            <b>About me</b>:
            Mario works as a freelance web-developer since 2009. His favorite projects are open source projects with a social impact, he lives with his family in Upper Austria.
          </p>
          <p class="lang de">
            <b>Über mich</b>:
            Mario ist seit 2009 als Webentwickler selbstständig. Er arbeitet am liebsten an Open-Source-Projekten,
            die zu einer Verbesserung der Gesellschaft beitragen und lebt mit seiner Familie im Almtal / Oberösterreich.
          </p>

          <p>
            <b>
              <span class="lang en">Qualifications</span>
              <span class="lang de">Qualifikationen</span>
              :</b> Docker, CakePHP, MySQL, Unit Testing, Integration Testing, Wordpress, LeafletJS, Git, Github, Open Source, CI/CD, VSCode, HTML, CSS, JavaScript, jQuery
          </p>

          <p class="lang en"><b>Additional</b>: Several years of experience with food ordering workflow.</p>
          <p class="lang de"><b>Sonstiges</b>: Mehrjährige Erfahrung in der Online-Vorbestellung von Lebensmitteln / Erstellen von <i>stabiler</i> Software / Langfristige Wartung und Betreuung von Software-Projekten</p>

          <p class="lang en"><b>Languages</b>: German, Spanish, English</p>
          <p class="lang de"><b>Sprachen</b>: Deutsch, Spanisch, Englisch</p>

        </div>

      </div>

      <div class="desc" id="contact">
        <div style="width:411px;float: left;">
          <p>Mag. (FH) Mario Rothauer<br />
            Am Birkenweg 3<br />
            A-4644 Scharnstein / <span class="lang en">Austria</span><span class="lang de">Österreich</span>
          </p>
          <p>
            <b>Büro-Adresse:</b><br />
            Grubbachstraße 14<br />
            A-4644 Scharnstein
          </p>
          <p>+43 680 217 89 39<br />
            [email]<br />
            UID-Nr. ATU71726279<br />
          </p>
          <p>
            <b>Geschäftszeiten:</b><br />
            Montag bis Mittwoch 08:30 bis 17:30 Uhr, Donnerstag 08:30 bis 12:00
          </p>
          <p>
            <a target="_blank" class="img" title="xing" href="https://www.xing.com/profile/Mario_Rothauer">
              <img src="/img/xing_icon_16x16.png" />
            </a>
            <a target="_blank" class="img" title="linkedin" href="https://at.linkedin.com/in/mrothauer">
              <img src="/img/linkedin_icon_16x16.png" />
            </a>
          </p>
        </div>
        <div style="width:250px;float:left;">
          <a target="_blank" style="float:right;" title="Klimabündnis" href="https://www.klimabuendnis.at/betriebe-mitglieder/rothauerwebsites">
            <img style="float:right;" width="250" src="/img/klimabuendnislogo.jpg" />
          </a>
        </div>
      </div>

      <div class="desc" id="imprint">
        <div>
          <p>Mag. (FH) Mario Rothauer<br />
            Am Birkenweg 3<br />
            A-4644 Scharnstein / <span class="lang en">Austria</span><span class="lang de">Österreich</span>
          </p>
          <p>
            <b>Büro-Adresse:</b><br />
            Grubbachstraße 14<br />
            A-4644 Scharnstein
          </p>
          <p>+43 680 217 89 39<br />
            [email]<br />
            UID-Nr. ATU71726279<br />
          </p>
          <p>
            <b>Geschäftszeiten:</b><br />
            Montag bis Mittwoch 08:30 bis 17:30 Uhr, Donnerstag 08:30 bis 12:00
          </p>
          <p style="margin-top:30px;">
            <b class="lang de">Haftungsausschluss</b>
            <b class="lang en">Liability of links</b>
          </p>
          <p class="lang en small">
            Despite careful monitoring rothauer IT assumes no liability for the content of external links. The operating companies of the linked pages are solely responsible for their own content. If illegal websites are accessible via hyperlinks, please inform us so that the links could be examined and possibly removed.
          </p>
          <p class="lang de small">
            Dieser Internetauftritt beinhaltet Links zu externen Internetauftritten Dritter, auf deren Inhalt der Medieninhaber keinen Einfluss hat. Dementsprechend kann der Medieninhaber trotz sorgfältiger Prüfung für die Inhalte der entsprechenden Seiten keine Verantwortung übernehmen. Für diese Inhalte ist der Betreiber der jeweiligen Website verantwortlich. Sollten dennoch Rechtsverletzungen in Verbindung mit einer der verlinkten Seiten erkennbar werden, wird der Link selbstverständlich umgehend entfernt.
          </p>

        </div>
      </div>

      <div class="desc" id="privacy">
        <div>
          <h2>Datenschutzerklärung</h2>


          <p>Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>

          <p>Mag. (FH) Mario Rothauer<br />
            Am Birkenweg 3<br />
            A-4644 Scharnstein<br />
            E-Mail: <a href="mailto:office@rothauer-it.com">office@rothauer-it.com</a><br />
            Tel: +43 680 217 89 39
          </p>

          <h3>Ihre Betroffenenrechte</h3>

          <p>Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten k&ouml;nnen Sie jederzeit folgende Rechte aus&uuml;ben:</p>

          <ul>
            <li>Auskunft &uuml;ber Ihre bei uns gespeicherten Daten und deren Verarbeitung,</li>
            <li>Berichtigung unrichtiger personenbezogener Daten,</li>
            <li>L&ouml;schung Ihrer bei uns gespeicherten Daten,</li>
            <li>Einschr&auml;nkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht l&ouml;schen d&uuml;rfen,</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns und</li>
            <li>Daten&uuml;bertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben.</li>
          </ul>

          <p>Sofern Sie uns eine Einwilligung erteilt haben, k&ouml;nnen Sie diese jederzeit mit Wirkung f&uuml;r die Zukunft widerrufen.</p>

          <h3>Zwecke der Datenverarbeitung durch die verantwortliche Stelle und Dritte</h3>

          <p>Wir verarbeiten Ihre personenbezogenen Daten nur zu den in dieser Datenschutzerkl&auml;rung genannten Zwecken. Eine &Uuml;bermittlung Ihrer pers&ouml;nlichen Daten an Dritte zu anderen als den genannten Zwecken findet nicht statt. Wir geben Ihre pers&ouml;nlichen Daten nur an Dritte weiter, wenn:</p>

          <ul>
            <li>Sie Ihre ausdr&uuml;ckliche Einwilligung dazu erteilt haben,</li>
            <li>die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich ist,</li>
            <li>die Verarbeitung zur Erf&uuml;llung einer rechtlichen Verpflichtung erforderlich ist,</li>
          </ul>

          <p>die Verarbeitung zur Wahrung berechtigter Interessen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein &uuml;berwiegendes schutzw&uuml;rdiges Interesse an der Nichtweitergabe Ihrer Daten haben.</p>

          <h3>L&ouml;schung bzw. Sperrung der Daten</h3>

          <p>Wir halten uns an die Grunds&auml;tze der Datenvermeidung und Datensparsamkeit. Wir speichern Ihre personenbezogenen Daten daher nur so lange, wie dies zur Erreichung der hier genannten Zwecke erforderlich ist oder wie es die vom Gesetzgeber vorgesehenen vielf&auml;ltigen Speicherfristen vorsehen. Nach Fortfall des jeweiligen Zweckes bzw. Ablauf dieser Fristen werden die entsprechenden Daten routinem&auml;&szlig;ig und entsprechend den gesetzlichen Vorschriften gesperrt oder gel&ouml;scht.</p>

          <h3>Erfassung allgemeiner Informationen beim Besuch unserer Website</h3>

          <p>Wenn Sie auf unsere Website zugreifen, werden automatisch mittels eines Cookies Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und &auml;hnliches. Hierbei handelt es sich ausschlie&szlig;lich um Informationen, welche keine R&uuml;ckschl&uuml;sse auf Ihre Person zulassen.</p>

          <p>Diese Informationen sind technisch notwendig, um von Ihnen angeforderte Inhalte von Webseiten korrekt auszuliefern und fallen bei Nutzung des Internets zwingend an. Sie werden insbesondere zu folgenden Zwecken verarbeitet:</p>

          <ul>
            <li>Sicherstellung eines problemlosen Verbindungsaufbaus der Website,</li>
            <li>Sicherstellung einer reibungslosen Nutzung unserer Website,</li>
            <li>Auswertung der Systemsicherheit und -stabilit&auml;t sowie</li>
            <li>zu weiteren administrativen Zwecken.</li>
          </ul>

          <p>Die Verarbeitung Ihrer personenbezogenen Daten basiert auf unserem berechtigten Interesse aus den vorgenannten Zwecken zur Datenerhebung. Wir verwenden Ihre Daten nicht, um R&uuml;ckschl&uuml;sse auf Ihre Person zu ziehen. Empf&auml;nger der Daten sind nur die verantwortliche Stelle und ggf. Auftragsverarbeiter.</p>

          <p>Anonyme Informationen dieser Art werden von uns ggfs. statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.</p>

          <h3>Cookies</h3>

          <p>Wie viele andere Webseiten verwenden wir auch so genannte &bdquo;Cookies&ldquo;. Cookies sind kleine Textdateien, die von einem Websiteserver auf Ihre Festplatte &uuml;bertragen werden. Hierdurch erhalten wir automatisch bestimmte Daten wie z. B. IP-Adresse, verwendeter Browser, Betriebssystem und Ihre Verbindung zum Internet.</p>

          <p>Cookies k&ouml;nnen nicht verwendet werden, um Programme zu starten oder Viren auf einen Computer zu &uuml;bertragen. Anhand der in Cookies enthaltenen Informationen k&ouml;nnen wir Ihnen die Navigation erleichtern und die korrekte Anzeige unserer Webseiten erm&ouml;glichen.</p>

          <p>In keinem Fall werden die von uns erfassten Daten an Dritte weitergegeben oder ohne Ihre Einwilligung eine Verkn&uuml;pfung mit personenbezogenen Daten hergestellt.</p>

          <p>Nat&uuml;rlich k&ouml;nnen Sie unsere Website grunds&auml;tzlich auch ohne Cookies betrachten. Internet-Browser sind regelm&auml;&szlig;ig so eingestellt, dass sie Cookies akzeptieren. Im Allgemeinen k&ouml;nnen Sie die Verwendung von Cookies jederzeit &uuml;ber die Einstellungen Ihres Browsers deaktivieren. Bitte verwenden Sie die Hilfefunktionen Ihres Internetbrowsers, um zu erfahren, wie Sie diese Einstellungen &auml;ndern k&ouml;nnen. Bitte beachten Sie, dass einzelne Funktionen unserer Website m&ouml;glicherweise nicht funktionieren, wenn Sie die Verwendung von Cookies deaktiviert haben.</p>

          <h3>Kontaktformular</h3>

          <p>Treten Sie bzgl. Fragen jeglicher Art per E-Mail oder Kontaktformular mit uns in Kontakt, erteilen Sie uns zum Zwecke der Kontaktaufnahme Ihre freiwillige Einwilligung. Hierf&uuml;r ist die Angabe einer validen E-Mail-Adresse erforderlich. Diese dient der Zuordnung der Anfrage und der anschlie&szlig;enden Beantwortung derselben. Die Angabe weiterer Daten ist optional. Die von Ihnen gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie f&uuml;r m&ouml;gliche Anschlussfragen gespeichert. Nach Erledigung der von Ihnen gestellten Anfrage werden personenbezogene Daten automatisch gel&ouml;scht.</p>

          <h3>&Auml;nderung unserer Datenschutzbestimmungen</h3>

          <p>Wir behalten uns vor, diese Datenschutzerkl&auml;rung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um &Auml;nderungen unserer Leistungen in der Datenschutzerkl&auml;rung umzusetzen, z.B. bei der Einf&uuml;hrung neuer Services. F&uuml;r Ihren erneuten Besuch gilt dann die neue Datenschutzerkl&auml;rung.</p>

          <p><em>Die Datenschutzerkl&auml;rung wurde mit dem </em><a href="https://www.activemind.de/datenschutz/datenschutzhinweis-generator/" rel="noopener" target="_blank"><em>Datenschutzerkl&auml;rungs-Generator der activeMind AG erstellt</em></a><em>.</em></p>

        </div>
      </div>

    </div>

  </div>

</template>