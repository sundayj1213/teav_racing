$(document).ready(function(){
    // Create anchor tag which will serve as button
    var scrollToTopButton = document.createElement('a');
    // Add an href attribute
    scrollToTopButton.href = '#';
    // Add class of "scrollToTop" to anchor tag
    scrollToTopButton.classList.add('scrollToTop');

    // Append element to page's body
    $('body').append( scrollToTopButton );
    
    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
    $('#hero-text').animate({'padding-top':'20vw','opacity':'0'});
    // Grab device width
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if( width < 768  ) {
        if( !iOS() ) {
            $('#hero-text').find('h1').css({'font-size':'4.2vw'}); 
        }
        $('#hero-text').delay(10).animate({'padding-top':'0','opacity':'1'},800);
    } else {
        $('#hero-text').delay(10).animate({'padding-top':'13vw','opacity':'1'},800); 
    }

    // Add event listener for images with overlay shadow
    $(document).on( 'click', '.text-overlay img', function(e) {
        /*$('.text-overlay').find('span').css({display:'none'});
        if( !$(e.target).is( $('.text-overlay').find('span') ) && !$(e.target).is( $('.text-overlay').find('img') ) ) {
            $('.text-overlay').find('span').css({display:'none'});
            return;
        }
        var ele = $(e.target);
            var overlay = ele.parent().find('span');
            overlay.css({display:'block'});*/
        if( !$('.container')[0] ) {
            $('body').prepend(
                `
                <div class="container">
                    <div id="gallery"></div>
                    <a class="prev" onclick="plusSlides(-1)">&laquo;</a>
                    <a class="next" onclick="plusSlides(1)">&raquo;</a>
                </div>
                `
            );
            
            var dir = "gallery-images";
            $.ajax({
                //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                url: dir,
                success:
                 function (data) {
                    var slides     = '',
                        demo       = '',
                        numbertext = 0,
                        total      = 0;
                        $(data).find("a").each(function () {
                            var filename = this.href.replace(window.location.host, "").replace("http:///", "").split("/")[1];
                            
                            if( ( filename.split(".")[1] == 'jpeg' )  || ( filename.split(".")[1] == 'jpg' ) || ( filename.split(".")[1] == 'png' ) || ( filename.split(".")[1] == 'gif' ) ) {
                                total++;
                            }
                        });

                    $(data).find("a").each(function () {
                        var filename = this.href.replace(window.location.host, "").replace("http:///", "").split("/")[1];
                        if( ( filename.split(".")[1] == 'jpeg' )  || ( filename.split(".")[1] == 'jpg' ) || ( filename.split(".")[1] == 'png' ) || ( filename.split(".")[1] == 'gif' ) ) {
                            numbertext++;
                            slides += `<div class="mySlides">
                                            <div class="numbertext">` + numbertext + ` / ` + total + `</div>
                                            <span class="closegal">&times;</span>
                                            <img src="` + dir + `/` + filename + `" style="width:100%">
                                        </div><!-- .mySlides -->`;
                            demo   += `
                                        <div class="column">
                                            <img class="demo cursor" src="` + dir + `/` + filename + `" style="width:100%" onclick="currentSlide(`+numbertext+`)" alt="` + filename.split(".")[0] + `">
                                        </div>
                                      `;
                        }
                    });
                    $('#gallery').html( slides );
                    $('#gallery').append( '<div class="row">'+demo+'</div>' );
                    showSlides(slideIndex);
                },
                error: function( err ) {
                    if( err.status == 0 && err.readyState == 0 || err.status == 404 ) {
                        jQuery
                        .ajax({
                            url: dir+'/gallery.json', 
                            type: 'GET',
                            dataType: 'json',
                            success: function( data ) {
                                var slides     = '',
                                    demo       = '',
                                    numbertext = 0,
                                    total      = 0;
                                $.each( data, function( key, val ) {
                                    total++;
                                });
                                $.each( data, function( key, val ) {
                                    numbertext++;
                                    slides += `<div class="mySlides">
                                                <div class="numbertext">` + numbertext + ` / ` + total + `</div>
                                                <span class="closegal">&times;</span>
                                                <img src="` + dir + `/` + val + `" style="width:100%">
                                            </div><!-- .mySlides -->`;
                                    demo   += `
                                            <div class="column">
                                                <img class="demo cursor" src="` + dir + `/` + val + `" style="width:100%" onclick="currentSlide(`+numbertext+`)" alt="` + val.split(".")[0] + `">
                                            </div>
                                        `;
                                });
                                $('#gallery').html( slides );
                                $('#gallery').append( '<div class="row">'+demo+'</div>' );
                                 
                                showSlides(slideIndex);
                            }
                        })
                    }
                }
            });
        }
    });
    $(document).on( 'click', '.closegal', function() {
        $('body').find('.container').remove();
    });
});
var slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
   // captionText.innerHTML = dots[slideIndex-1].alt;
}
function iOS() {

    var iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];
  
    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }
    }
  
    return false;
}
