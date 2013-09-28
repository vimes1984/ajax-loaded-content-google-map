jQuery(document).ready(function ($) {
	    /********************************************************smooth ajax after load************************************/
    function scrollToAnchor(AnId){
    var aTag = $("#"+ AnId);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}
    function initialize() {
        google.maps.visualRefresh = true;
        var myLatlng = new google.maps.LatLng(51.201465, -0.30244);
        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            mapTypeControl: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

        var kmlLayer = new google.maps.KmlLayer({
            url: 'https://developers.google.com/kml/documentation/KML_Samples.kml?rand=' + (new Date()).valueOf(),
            suppressInfoWindows: true,
            map: map
        });


        function showInContentWindow(position, title, text) {
            var content = "<div class='info_win'><h3>"+ title +"</h3><p>" + text + "</p></div>";
   				 infowindow = new InfoBox({
                content: content,
                disableAutoPan: false,
                maxWidth: 0,
                position: position,
                pixelOffset: new google.maps.Size(-140, 0),
                zIndex: null,
                boxStyle: {
                    background: "#FBFBFB",
                    opacity: 0.90,
                    width: "40em"
                },
                closeBoxMargin: "10px 2px 2px 2px",
                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            });
       google.maps.event.addListener(infowindow, 'domready', function() {
			    /******AJAX MAP ****/
			    siteURL = 'http://' + top.location.host.toString();
			    coachesLinks = jQuery('.info_win a');
			    coachesLinks.click(function (e) {
			        e.preventDefault();
			    });
			    coachesLinks.click(function (e) {
			        $el = jQuery(this);
			        URL = $el.attr('href');
			        shareurl = $el.attr('href');
			        URL = URL + " .main";
			        jQuery('#content_two').show('slow').load(URL, function () {
			            scrollToAnchor('content_two');
			            $('.main').css('overflow', 'visible');
			            $('#content_two').css('overflow', 'visible');
			            jQuery('#content_two .back').on('click', function () {
			                jQuery(this).hide('slow');
			                var contentTwo = jQuery('#content_two');
			                if (contentTwo.is(':hidden')) {
			                    jQuery('#content_two .back').hide();
			                } else {
			                    contentTwo.hide('slow');
			                    jQuery('#content > .main').show('slow');
			                    jQuery('#content > .main').css('overflow', 'visible');
			                    scrollToAnchor('access');
			                }
			            });

			        });
			        $('#content > .main').hide('slow');
			    });

		}); 
infowindow.open(map); 

        }
        google.maps.event.addListener(kmlLayer, 'click', function (kmlEvent) {
            showInContentWindow(kmlEvent.latLng, kmlEvent.featureData.name, kmlEvent.featureData.description);
        });

    }

    google.maps.event.addDomListener(window, 'load', initialize);
});
