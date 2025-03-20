// Properly align the search button in the nav bar.
$(() => {
    var $navBarContainer = $(".index-nav");
    var $searchButton = $(".search-box");
    var $navBarCollapse = $(".navbar-collapse");
    var $slideshowDummyDiv = $(".dummy");
    var $searchField = $(".search-banner-row input[type=text]");
    var $submitSearch = $(".search-banner-row button");
    var $projectTitles = $(".masonry-grid-image--overlay");
    var $masonryItems = $(".masonry-grid-item");
    var $pagesDropdownMenu = $(".pages-dropdown-menu");

    window.onscroll = () => {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            $navBarContainer.css("padding-top", 2);
            $navBarContainer.css("padding-bottom", 2);
            $navBarContainer.css("height", 50);
            $searchButton.css("height", 50);
            $searchButton.css("width", 55);
            $navBarCollapse.css("top", 50);
        } else {
            $navBarContainer.css("padding-top", 20);
            $navBarContainer.css("padding-bottom", 20);
            $navBarContainer.css("height", 100);
            $searchButton.css("height", 100);
            $searchButton.css("width", 110);
            $navBarCollapse.css("top", 75);
        }
    }

    // Start the Masonry Grid
    $('.masonry-grid').masonry({
        // options
        itemSelector: '.masonry-grid-item',
        columnWidth: 120,
        gutter: 1,
        fitWidth: true,
    });

    // Use student project's as images in slideshow:
    $(".masonry-grid-image").each(function () {
        var imageSrc = $(this).attr("src");

        // Create Slide and add to slideshow container:
        var $newSlide = $(`<div class="slideshow-slide fade">
            <div class="slide-centerer"></div>
            <img src="${imageSrc}">
        </div>`);

        $newSlide.insertAfter($slideshowDummyDiv);
    });

    // Got from W3Schools: https://www.w3schools.com/howto/howto_js_slideshow.asp
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("slideshow-slide");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 20000); // Change image every 2 seconds
    }

    // Search functionality
    $searchField.on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $masonryItems.filter(function () {
            $(this).toggle($(this).find(".masonry-grid-image--overlay").text().toLowerCase().indexOf(value) > -1);
            $('.masonry-grid').masonry({
                // options
                itemSelector: '.masonry-grid-item',
                columnWidth: 120,
                gutter: 1,
                fitWidth: true,
            });
        });
    });

    // Get current year.
    $(".current-year").text(new Date().getFullYear());

    // Create links in navbar per each student navbar.  Links are under the 'Pages' dropdown
    $masonryItems.each(function() {
        var link = $(this).find('a').attr("href");
        var text = $(this).find(".masonry-grid-image--overlay").text();
        var $newDropdownItem = $(`<a class="dropdown-item" href="${link}">${text}</a>`);
        console.log($newDropdownItem);
        $pagesDropdownMenu.append($newDropdownItem);

        console.log($pagesDropdownMenu);
    });
});

