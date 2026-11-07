const portfolioConfig = window.portfolioConfig ?? {};

const parseUrl = (value, { allowRelative = false } = {}) => {
    if (typeof value !== "string" || value.trim() === "") {
        return null;
    }

    try {
        const url = new URL(value, window.location.href);
        const isHttps = url.protocol === "https:";
        const isRelativeValue = !/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value.trim());
        const isSafeRelative = allowRelative
            && isRelativeValue
            && url.protocol === window.location.protocol
            && url.origin === window.location.origin
            && !value.trim().startsWith("//");

        return isHttps || isSafeRelative ? url : null;
    } catch (error) {
        console.warn("Uma URL opcional do site-config.js é inválida.", error);
        return null;
    }
};

const sectionRoutes = new Map([
    ["/", "inicio"],
    ["/inicio", "inicio"],
    ["/conteudo", "conteudo"],
    ["/sobre", "sobre"],
    ["/experiencia", "experiencia"],
    ["/projetos", "projetos"],
    ["/contato", "contato"]
]);

const normalizePath = (path) => path.length > 1 ? path.replace(/\/+$/, "") : path;

window.history.scrollRestoration = "manual";

const getSectionForPath = (path) => {
    const sectionId = sectionRoutes.get(normalizePath(path));
    return sectionId ? document.getElementById(sectionId) : null;
};

const setMetaContent = (selector, content) => {
    if (!content) {
        return;
    }

    const meta = document.querySelector(selector);
    if (meta) {
        meta.setAttribute("content", content);
    }
};

const siteUrl = parseUrl(portfolioConfig.siteUrl);
const socialImageUrl = parseUrl(portfolioConfig.socialImageUrl)
    ?? (siteUrl ? new URL("assets/images/Nata.png", siteUrl) : null);

const updateRouteMetadata = (path) => {
    if (!siteUrl) {
        return;
    }

    const canonicalUrl = new URL(normalizePath(path), siteUrl);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
    }
    canonical.href = canonicalUrl.href;
    setMetaContent('meta[property="og:url"]', canonicalUrl.href);
};

const initialPath = normalizePath(window.location.pathname);
if (sectionRoutes.has(initialPath)) {
    if (window.location.pathname !== initialPath) {
        window.history.replaceState(null, "", initialPath);
    }
    if (initialPath !== "/") {
        getSectionForPath(initialPath)?.scrollIntoView({ behavior: "instant", block: "start" });
    }
    updateRouteMetadata(initialPath);
}

const navigateToPath = (path, { focus = false, behavior = "instant" } = {}) => {
    const normalizedPath = normalizePath(path);
    const target = getSectionForPath(normalizedPath);
    if (!target) {
        return false;
    }

    if (window.location.protocol !== "file:" && window.location.pathname !== normalizedPath) {
        window.history.pushState(null, "", normalizedPath);
    }
    updateRouteMetadata(normalizedPath);
    if (focus) {
        target.focus({ preventScroll: true });
    }
    target.scrollIntoView({ behavior, block: "start" });
    return true;
};

document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }
    const link = event.target.closest("a[href]");
    if (
        !link
        || event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
        || (link.target && link.target !== "_self")
        || link.hasAttribute("download")
    ) {
        return;
    }

    const url = new URL(link.href, window.location.href);
    const path = normalizePath(url.pathname);
    if (url.origin !== window.location.origin || !sectionRoutes.has(path)) {
        return;
    }

    event.preventDefault();
    navigateToPath(path, { focus: link.classList.contains("skip-link") });
});

window.addEventListener("popstate", () => {
    const path = normalizePath(window.location.pathname);
    getSectionForPath(path)?.scrollIntoView({ behavior: "instant", block: "start" });
    updateRouteMetadata(path);
});

if (socialImageUrl) {
    setMetaContent('meta[property="og:image"]', socialImageUrl.href);
    setMetaContent('meta[name="twitter:image"]', socialImageUrl.href);
    setMetaContent('meta[name="twitter:card"]', "summary_large_image");
}

const resumeLink = document.querySelector(".contact-resume");
const resumeUrl = parseUrl(portfolioConfig.resumeUrl, { allowRelative: true });

if (resumeLink && resumeUrl) {
    resumeLink.href = resumeUrl.href;
    resumeLink.download = "Curriculo_Nata_Pires.pdf";
    resumeLink.hidden = false;
}

const whatsappLink = document.querySelector(".contact-whatsapp");
const whatsappNumber = typeof portfolioConfig.whatsappNumber === "string"
    ? portfolioConfig.whatsappNumber.replace(/\D/g, "")
    : "";

if (whatsappLink && /^\d{10,15}$/.test(whatsappNumber)) {
    const message = encodeURIComponent("Olá, Natã! Vi seu portfólio e gostaria de conversar sobre um projeto.");
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${message}`;
    whatsappLink.hidden = false;
}

const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const storedThemeKey = "portfolio-theme";
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let savedTheme = null;

try {
    savedTheme = window.localStorage.getItem(storedThemeKey);
} catch (error) {
    console.warn("Não foi possível acessar a preferência de tema salva.", error);
}

const initialTheme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : systemPrefersLight ? "light" : "dark";

const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;

    if (themeToggle) {
        const nextTheme = theme === "dark" ? "claro" : "escuro";
        themeToggle.setAttribute("aria-label", `Ativar tema ${nextTheme}`);
        themeToggle.setAttribute("title", `Ativar tema ${nextTheme}`);
    }

    if (themeColor) {
        themeColor.setAttribute("content", theme === "dark" ? "#111210" : "#f7f8fb");
    }
};

applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);

        try {
            window.localStorage.setItem(storedThemeKey, nextTheme);
        } catch (error) {
            console.warn("Não foi possível salvar a preferência de tema.", error);
        }
    });
}

const projectsCarousel = document.querySelector("#projects-carousel");

if (projectsCarousel) {
    const carouselTrack = projectsCarousel.querySelector(".carousel-track");
    const pagination = projectsCarousel.querySelector(".carousel-pagination");
    const totalSlidesLabel = projectsCarousel.querySelector(".carousel-status-total");
    const currentSlideLabel = projectsCarousel.querySelector(".carousel-status-current");
    const sabrina = portfolioConfig.projects?.sabrina;
    let activeSlide = 0;
    let slides = [];
    let paginationButtons = [];

    const createTextElement = (tagName, className, text) => {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        element.textContent = text;
        return element;
    };

    const appendProjectDetails = (definitionList, items) => {
        items.forEach(([label, text]) => {
            if (typeof text !== "string" || text.trim() === "") {
                return;
            }

            const row = document.createElement("div");
            row.append(
                createTextElement("dt", "", label),
                createTextElement("dd", "", text)
            );
            definitionList.append(row);
        });
    };

    const appendSabrinaProject = () => {
        const projectUrl = parseUrl(sabrina?.url);
        const imageUrl = parseUrl(sabrina?.image, { allowRelative: true });
        const repositoryUrl = parseUrl(sabrina?.repositoryUrl);

        if (
            !projectUrl
            || !imageUrl
            || !["title", "description", "role", "challenge"].every(
                (key) => typeof sabrina[key] === "string" && sabrina[key].trim() !== ""
            )
        ) {
            return;
        }

        const slide = document.createElement("article");
        slide.className = "project-card project-slide";
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "slide");
        slide.setAttribute("aria-hidden", "true");
        slide.inert = true;

        const imageLink = document.createElement("a");
        imageLink.className = "project-image project-image-sabrina";
        imageLink.href = projectUrl.href;
        imageLink.target = "_blank";
        imageLink.rel = "noreferrer";
        imageLink.setAttribute("aria-label", `Visitar ${sabrina.title}`);

        const image = document.createElement("img");
        image.src = imageUrl.href;
        image.alt = `Imagem de apresentação do projeto ${sabrina.title}`;
        image.width = 1024;
        image.height = 1536;
        image.loading = "lazy";
        image.decoding = "async";
        imageLink.append(image, createTextElement("span", "image-link", "↗"));

        const info = document.createElement("div");
        info.className = "project-info";
        const meta = document.createElement("div");
        meta.className = "project-meta";
        meta.append(
            createTextElement("span", "", "Freelance"),
            createTextElement("span", "", "")
        );
        info.append(
            meta,
            createTextElement("h3", "", sabrina.title),
            createTextElement("p", "", sabrina.description)
        );

        const details = document.createElement("dl");
        details.className = "project-case";
        appendProjectDetails(details, [
            ["Atuação", sabrina.role],
            ["Desafio", sabrina.challenge]
        ]);
        if (details.childElementCount > 0) {
            info.append(details);
        }

        const footer = document.createElement("div");
        footer.className = "project-footer";
        const tags = document.createElement("div");
        tags.className = "tag-list";
        if (Array.isArray(sabrina.technologies)) {
            sabrina.technologies
                .filter((technology) => typeof technology === "string" && technology.trim() !== "")
                .forEach((technology) => tags.append(createTextElement("span", "", technology)));
        }

        const visitLink = document.createElement("a");
        visitLink.href = projectUrl.href;
        visitLink.target = "_blank";
        visitLink.rel = "noreferrer";
        visitLink.append(document.createTextNode("Ver site "));
        visitLink.append(createTextElement("span", "", "↗"));

        const projectLinks = document.createElement("div");
        projectLinks.className = "project-links";
        projectLinks.append(visitLink);

        if (repositoryUrl) {
            const codeLink = document.createElement("a");
            codeLink.href = repositoryUrl.href;
            codeLink.target = "_blank";
            codeLink.rel = "noreferrer";
            codeLink.append(document.createTextNode("Ver código "));
            codeLink.append(createTextElement("span", "", "↗"));
            projectLinks.append(codeLink);
        }

        if (tags.childElementCount > 0) {
            footer.append(tags);
        }
        footer.append(projectLinks);
        info.append(footer);
        slide.append(imageLink, info);
        carouselTrack.append(slide);

    };

    appendSabrinaProject();
    slides = [...projectsCarousel.querySelectorAll(".project-slide")];
    slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot";
        dot.type = "button";
        dot.setAttribute("aria-pressed", String(index === activeSlide));
        pagination.append(dot);
    });
    paginationButtons = [...projectsCarousel.querySelectorAll(".carousel-dot")];

    slides.forEach((slide, index) => {
        slide.setAttribute("aria-label", `${index + 1} de ${slides.length}`);
        const position = slide.querySelector(".project-meta span:last-child");
        if (position) {
            position.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
        }
    });

    paginationButtons.forEach((button, index) => {
        button.setAttribute("aria-label", `Ir para o projeto ${index + 1}`);
    });
    totalSlidesLabel.textContent = `/ ${String(slides.length).padStart(2, "0")}`;

    const showSlide = (index) => {
        activeSlide = (index + slides.length) % slides.length;
        carouselTrack.style.transform = `translateX(-${activeSlide * 100}%)`;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeSlide;
            slide.setAttribute("aria-hidden", String(!isActive));
            slide.inert = !isActive;
        });

        paginationButtons.forEach((button, buttonIndex) => {
            button.setAttribute("aria-pressed", String(buttonIndex === activeSlide));
        });

        currentSlideLabel.textContent = String(activeSlide + 1).padStart(2, "0");
    };

    projectsCarousel.querySelectorAll(".carousel-arrow").forEach((button) => {
        button.addEventListener("click", () => {
            showSlide(activeSlide + (button.dataset.direction === "next" ? 1 : -1));
        });
    });

    paginationButtons.forEach((button, index) => {
        button.addEventListener("click", () => showSlide(index));
    });

    showSlide(0);

    projectsCarousel.addEventListener("keydown", (event) => {
        if (event.target !== projectsCarousel) {
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showSlide(activeSlide + 1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            showSlide(activeSlide - 1);
        }
    });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#menu-principal");

if (menuToggle && navigation) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        navigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
        navigation.classList.toggle("is-open", !isExpanded);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuToggle.focus();
        }
    });
}

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}
