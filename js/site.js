document.addEventListener('DOMContentLoaded', async () => {

    await loadHeader();
    await loadFooter();

});


async function loadHeader() {

    const headerContainer = document.getElementById('site-header');

    if (!headerContainer) {
        return;
    }

    try {

        const response = await fetch('components/header.html');

        if (!response.ok) {
            throw new Error('Neizdevās ielādēt header.html');
        }

        headerContainer.innerHTML = await response.text();

        initialiseMobileMenu();
        setActiveNavigation();

    } catch (error) {

        console.error('Header loading error:', error);

    }

}


async function loadFooter() {

    const footerContainer = document.getElementById('site-footer');

    if (!footerContainer) {
        return;
    }

    try {

        const response = await fetch('components/footer.html');

        if (!response.ok) {
            throw new Error('Neizdevās ielādēt footer.html');
        }

        footerContainer.innerHTML = await response.text();

    } catch (error) {

        console.error('Footer loading error:', error);

    }

}


/* =========================
   MOBILE MENU
   ========================= */

function initialiseMobileMenu() {

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !nav) {
        return;
    }


    menuToggle.addEventListener('click', () => {

        const isOpen = nav.classList.toggle('nav-open');

        menuToggle.classList.toggle('active', isOpen);

        menuToggle.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );

    });


    nav.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            nav.classList.remove('nav-open');

            menuToggle.classList.remove('active');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

        });

    });

}


/* =========================
   ACTIVE PAGE
   ========================= */

function setActiveNavigation() {

    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav [data-page]').forEach(link => {

        const page = link.getAttribute('data-page');

        if (
            page === 'komanda' &&
            currentPage === 'komanda.html'
        ) {
            link.classList.add('active');
        }

    });

}