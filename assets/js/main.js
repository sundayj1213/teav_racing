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
    $('#hero-text').animate({'padding-top':'20vw','opacity':'0'})
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }
    if( isMobile ) {
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
                    <div class="gallery">
                        <span class="closegal">&times;</span>
                        <div id="gallery-images">

                        </div>
                            
                        <a class="prev" onclick="plusSlides(-1)">&laquo;</a>
                        <a class="next" onclick="plusSlides(1)">&raquo;</a>

                        <div class="caption-container">
                            <p id="caption"></p>
                        </div>

                        <div class="row">
                            
                        </div>
                    </div>
                </div>
                `
            );
            var dir = "zgallery-images";
            $.ajax({
                //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                url: dir,
                success: function (data) {
                    var slides     = '',
                        demo       = '',
                        numbertext = 0,
                        total      = 0;
                        $(data).find("a").each(function () {
                            var filename = this.href.replace(window.location.host, "").replace("http:///", "").split("/")[1];
                            if( filename.indexOf('.') !== -1 ) {
                                total++;
                            }
                        });

                    $(data).find("a").each(function () {
                        var filename = this.href.replace(window.location.host, "").replace("http:///", "").split("/")[1];
                        if( filename.indexOf('.') !== -1 ) {
                            numbertext++;
                            slides += `<div class="mySlides">
                                            <div class="numbertext">` + numbertext + ` / ` + total + `</div>
                                            <img src="` + dir + `/` + filename + `" style="width:100%">
                                        </div><!-- .mySlides -->`;
                            demo   += `
                                        <div class="column">
                                            <img class="demo cursor" src="` + dir + `/` + filename + `" style="width:100%" onclick="currentSlide(`+numbertext+`)" alt="` + filename.split(".")[0] + `">
                                        </div>
                                      `;
                        }
                    });
                    $('#gallery-images').html( slides );
                    $('.row').html( demo );
                    showSlides(slideIndex);
                },
                error: function( err ) {
                    console.log( err )
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
    captionText.innerHTML = dots[slideIndex-1].alt;
}
