<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" type="text/css" href="style.css?<?php echo filemtime('style.css'); ?>" />
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    
</head>

<body>

<!-- https://jsfiddle.net/MadLittleMods/LmYay/ -->
<button>Ausrichtung wechseln</button>
    
<script>
    $('document').ready(function() {
        $('button').on('click', function() {
            var flexbox = $('.flexbox-parent');
            var flexboxDirection = flexbox.css('flex-direction');
            var footerAndHeader = $('.flexbox-item.header, .flexbox-item.footer');
            if (flexboxDirection == 'column') {
            	newDirection = 'row';
            	footerAndHeader.css('height', 'auto');
            	footerAndHeader.css('width', '100px');
            	footerAndHeader.html('Fixe Breite');
            } else {
                var newDirection = 'column';
            	footerAndHeader.css('width', 'auto');
            	footerAndHeader.css('height', '100px');
            	footerAndHeader.html('Fixe Höhe');
            }                
            $('.flexbox-parent').css('flex-direction', newDirection);
        });
    });
</script>


<div class="flexbox-parent">
    <div class="flexbox-item header">
         Fixe Höhe
    </div>
    
    <div class="flexbox-item fill-area content flexbox-item-grow">
        <div class="fill-area-content flexbox-item-grow">
            Content - 100% vom restlichen Platz
        </div>
    </div>
    
    <div class="flexbox-item footer">
        Fixe Höhe
    </div>
</div>

  
</body>
</html>