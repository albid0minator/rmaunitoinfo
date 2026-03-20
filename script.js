const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const backTop = document.getElementById("back-top");
const copyLinkBtn = document.getElementById("copy-link-btn");

if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", () => {
        const open = menuLinks.classList.toggle("is-open");
        // Simple toggle for mobile menu
        if (open) {
            menuLinks.style.display = "flex";
            menuLinks.style.flexDirection = "column";
            menuLinks.style.position = "absolute";
            menuLinks.style.top = "100%";
            menuLinks.style.left = "0";
            menuLinks.style.right = "0";
            menuLinks.style.background = "#161b22";
            menuLinks.style.padding = "1rem";
            menuLinks.style.borderBottom = "1px solid #30363d";
        } else {
            menuLinks.style.display = "none";
        }
        menuToggle.setAttribute("aria-expanded", String(open));
    });
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", async () => {
        const pageUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(pageUrl);
            copyLinkBtn.textContent = "Link copiato";
        } catch (error) {
            copyLinkBtn.textContent = "Errore";
        }
        window.setTimeout(() => {
            copyLinkBtn.textContent = "Condividi questa pagina";
        }, 1600);
    });
}

// Reveal Observer
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
        { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
}
