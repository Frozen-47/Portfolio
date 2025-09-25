let isFrozen = true;
const heroName = document.getElementById("heroName");

function animateNameChange(element, newName, newClass) {
    const existingCursors = element.querySelectorAll(".typewriter-cursor");
    existingCursors.forEach((cursor) => cursor.remove());

    const currentText = element.textContent.replace("|", "");
    const letters = element.querySelectorAll(".name-letter");

    if (letters.length === 0) {
        element.innerHTML = "";
        for (let i = 0; i < currentText.length; i++) {
            const letterSpan = document.createElement("span");
            letterSpan.className = "name-letter";
            letterSpan.textContent = currentText[i];
            element.appendChild(letterSpan);
        }
    }

    const currentLetters = Array.from(element.querySelectorAll(".name-letter"));
    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    cursor.textContent = "|";
    element.appendChild(cursor);

    let deleteIndex = currentLetters.length - 1;

    const deleteInterval = setInterval(() => {
        if (deleteIndex >= 0 && currentLetters[deleteIndex]) {
            currentLetters[deleteIndex].remove();
            deleteIndex--;
        } else {
            clearInterval(deleteInterval);
            setTimeout(() => {
                const remainingLetters = element.querySelectorAll(".name-letter");
                remainingLetters.forEach((letter) => letter.remove());
                startTyping();
            }, 100);
        }
    }, 80);

    function startTyping() {
        element.className = element.className.replace(
            /\b(sabareesh|frozen)\b/g,
            newClass
        );
        let typeIndex = 0;
        const typeInterval = setInterval(() => {
            if (typeIndex < newName.length) {
                const letterSpan = document.createElement("span");
                letterSpan.className = "name-letter visible";
                letterSpan.textContent = newName[typeIndex];
                element.insertBefore(letterSpan, cursor);
                typeIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    if (cursor && cursor.parentNode) cursor.remove();
                }, 1000);
            }
        }, 120);
    }
}

function toggleName() {
    const newName = isFrozen ? "Sabareesh" : "Frozen";
    const newClass = isFrozen ? "sabareesh" : "frozen";
    if (heroName) animateNameChange(heroName, newName, newClass);
    isFrozen = !isFrozen;
}

const observerOptions = { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

function openContactModal() {
    const modal = document.getElementById("contactModal");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function closeContactModal() {
    const modal = document.getElementById("contactModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }
}

let statusIndex = 0;
const statusMessages = [
    "Available for work",
    "Open to opportunities", 
    "Ready to collaborate",
    "Seeking new challenges",
];

function rotateStatusMessage() {
    const statusTextElement = document.querySelector(".profile-subtitle");
    if (statusTextElement) {
        let textNode = null;
        for (let child of statusTextElement.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                textNode = child;
                break;
            }
        }
        
        if (!textNode) {
            textNode = document.createTextNode("");
            statusTextElement.insertBefore(textNode, statusTextElement.firstChild);
        }
        
        statusIndex = (statusIndex + 1) % statusMessages.length;
        textNode.textContent = statusMessages[statusIndex] + " ";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const contactMeBtn = document.querySelector('.contact-me');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });
    }
    
    const contactModal = document.getElementById("contactModal");
    if (contactModal) {
        contactModal.addEventListener("click", function (e) {
            if (e.target === this) closeContactModal();
        });
    }

    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeContactModal();
        });
    }

    document.querySelectorAll(".skill-tag").forEach((tag) => {
        tag.addEventListener("click", function () {
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });
    });

    document.querySelectorAll(".section").forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(section);
    });
});

setInterval(toggleName, 4000);

if (heroName) heroName.addEventListener("click", toggleName);

setInterval(rotateStatusMessage, 5000);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeContactModal();
    if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        openContactModal();
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ 
                behavior: "smooth", 
                block: "start" 
            });
        }
    });
});

window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
});

window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    setTimeout(() => (document.body.style.opacity = "1"), 100);

    if (heroName) {
        const text = heroName.textContent;
        heroName.innerHTML = "";
        for (let i = 0; i < text.length; i++) {
            const letterSpan = document.createElement("span");
            letterSpan.className = "name-letter visible";
            letterSpan.textContent = text[i];
            heroName.appendChild(letterSpan);
        }
    }
});
