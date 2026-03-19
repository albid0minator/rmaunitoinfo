const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const backTop = document.getElementById("back-top");
const copyLinkBtn = document.getElementById("copy-link-btn");

if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", () => {
        const open = menuLinks.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(open));
    });

    menuLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            menuLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu = menuLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            menuLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}

if (backTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 360) {
            backTop.classList.add("is-visible");
        } else {
            backTop.classList.remove("is-visible");
        }
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", async () => {
        const pageUrl = window.location.href;

        try {
            await navigator.clipboard.writeText(pageUrl);
            copyLinkBtn.textContent = "Link copiato";
        } catch (error) {
            copyLinkBtn.textContent = "Copia non riuscita";
        }

        window.setTimeout(() => {
            copyLinkBtn.textContent = "Condividi questa pagina";
        }, 1600);
    });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-inview");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.17,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-inview"));
}
