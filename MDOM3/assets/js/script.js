document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".service-card");
    const megaPanel = document.querySelector(".mega-panel");

    const megaImage = document.getElementById("megaImage");
    const megaTitle = document.getElementById("megaTitle");
    const megaDesc = document.getElementById("megaDesc");
    const megaMenu = document.getElementById("megaMenu");

    let closeTimer = null;

    // ----------------------------
    // Show Mega Menu
    // ----------------------------

    function showMega(card){

        // Stop close timer
        clearTimeout(closeTimer);

        // Active Card
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        // Change Content
        megaTitle.innerHTML = card.dataset.title;
        megaDesc.innerHTML = card.dataset.desc;
        megaImage.src = card.dataset.image;

        // Change Menu
        megaMenu.innerHTML = card.dataset.menu;

        // Show Panel
        megaPanel.classList.add("show");

    }

    // ----------------------------
    // Hide Mega Menu
    // ----------------------------

    function hideMega(){

        closeTimer = setTimeout(function(){

            megaPanel.classList.remove("show");

            cards.forEach(c => c.classList.remove("active"));

        },150);

    }

    // ----------------------------
    // Card Hover
    // ----------------------------

    cards.forEach(card=>{

        card.addEventListener("mouseenter",function(){

            showMega(this);

        });

    });

    // ----------------------------
    // Keep Panel Open
    // ----------------------------

    megaPanel.addEventListener("mouseenter",function(){

        clearTimeout(closeTimer);

    });

    // ----------------------------
    // Leave Panel
    // ----------------------------

    megaPanel.addEventListener("mouseleave",function(){

        hideMega();

    });

    // ----------------------------
    // Leave Cards Area
    // ----------------------------

    document.querySelector(".services-section")
    .addEventListener("mouseleave",function(){

        hideMega();

    });

});