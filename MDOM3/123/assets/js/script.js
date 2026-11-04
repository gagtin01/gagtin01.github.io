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

    if (megaPanel) {
        megaPanel.addEventListener("mouseenter",function(){
            clearTimeout(closeTimer);
        });

        megaPanel.addEventListener("mouseleave",function(){
            hideMega();
        });
    }

    // ----------------------------
    // Leave Cards Area
    // ----------------------------

    const servicesSection = document.querySelector(".services-section");
    if (servicesSection) {
        servicesSection.addEventListener("mouseleave",function(){
            hideMega();
        });
    }

    // =====================================================
    // Pricing: Expand selected plan, hide the other two
    // =====================================================

    const planData = {
        email: {
            title: "Email Accounts",
            logo: "assets/img/mdom-tab.jpg",
            subtitle: "Plan Starting from",
            amount: "1.79",
            amountUnit: "/year",
            className: "plan-email"
        },
        fax: {
            title: "Secure Fax",
            logo: "assets/img/faxtonetab.png",
            subtitle: "Plan Starting from",
            amount: "4.50",
            amountUnit: "/year",
            className: "plan-fax"
        },
        forms: {
            title: "Secure Forms",
            logo: "assets/img/securetab.png",
            subtitle: "Plan Starting from",
            amount: "10.80",
            amountUnit: "/year",
            className: "plan-forms"
        }
    };

    const pricingCardsRow = document.getElementById("pricingCardsRow");
    const pricingExpanded = document.getElementById("pricingExpanded");
    const expandedLeft = document.getElementById("expandedLeft");
    const expandedInner = document.querySelector(".pricing-expanded-inner");

    function showTableForPlan(planKey) {
        document.querySelectorAll(".plan-table").forEach(function (el) {
            el.style.display = "none";
        });
        const table = document.getElementById("table-" + planKey);
        if (table) table.style.display = "block";
    }

    function renderExpandedLeft(planKey) {
        const data = planData[planKey];
        if (!data) return;

        expandedLeft.className = "pricing-expanded-left " + data.className;
        if (expandedInner) {
            expandedInner.className = "pricing-expanded-inner " + data.className;
        }

        var unit = data.amountUnit || "/mo";
        expandedLeft.innerHTML =
            '<div class="pricing-logo-wrap">' +
                '<img src="' + data.logo + '" alt="' + (data.title || '') + '" class="pricing-logo">' +
            '</div>' +
            '<div class="pricing-subtitle">' + (data.subtitle || '') + '</div>' +
            '<div class="price-circle">' +
                '<div class="price">' +
                    '<span class="currency">$</span>' +
                    '<span class="amount">' + (data.amount || '') + '</span>' +
                    '<span class="month">' + unit + '</span>' +
                '</div>' +
            '</div>' +
            '<a href="https://mdofficemail.com/subscriptions/orderservices.aspx" target="_blank" rel="noopener noreferrer" class="pricing-btn" data-pricing-signup>Sign Up</a>';
    }

    function expandPlan(planKey) {
        renderExpandedLeft(planKey);
        showTableForPlan(planKey);

        // 1) Fade out the three cards
        if (pricingCardsRow) {
            pricingCardsRow.classList.add("fade-out");
        }

        // 2) After cards are faded, hide them and fade in expanded
        setTimeout(function () {
            if (pricingCardsRow) {
                pricingCardsRow.style.display = "none";
            }
            if (pricingExpanded) {
                pricingExpanded.classList.remove("hiding");
                pricingExpanded.style.display = "block";
                void pricingExpanded.offsetWidth; // reflow for transition
                pricingExpanded.classList.add("show");
            }
        }, 350);
        // no scroll — stay exactly where the user is
    }

    function collapsePlan() {
        // 1) Fade out expanded panel
        if (pricingExpanded) {
            pricingExpanded.classList.remove("show");
            pricingExpanded.classList.add("hiding");
        }

        // 2) After faded, hide expanded and fade cards back in
        setTimeout(function () {
            if (pricingExpanded) {
                pricingExpanded.classList.remove("hiding");
                pricingExpanded.style.display = "none";
            }
            if (pricingCardsRow) {
                pricingCardsRow.style.display = "";
                pricingCardsRow.classList.add("fade-out"); // start invisible
                void pricingCardsRow.offsetWidth;
                pricingCardsRow.classList.remove("fade-out"); // fade in
            }
        }, 400);
        // no scroll — stay exactly where the user is
    }

    // Make the entire pricing card clickable (no separate Get Started button).
    document.querySelectorAll(".pricing-col[data-plan]").forEach(function (card) {
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.addEventListener("click", function () {
            const plan = this.getAttribute("data-plan");
            if (plan) expandPlan(plan);
        });
        card.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const plan = this.getAttribute("data-plan");
                if (plan) expandPlan(plan);
            }
        });
    });

    // Clicking the selected plan card on the left returns to the three plan cards.
    if (expandedLeft) {
        expandedLeft.addEventListener("click", function (e) {
            if (e.target.closest("[data-pricing-signup]")) return;
            collapsePlan();
        });
        expandedLeft.setAttribute("role", "button");
        expandedLeft.setAttribute("tabindex", "0");
        expandedLeft.setAttribute("aria-label", "Return to pricing plans");
        expandedLeft.addEventListener("keydown", function (e) {
            if (e.target.closest("[data-pricing-signup]")) return;
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                collapsePlan();
            }
        });
    }

});