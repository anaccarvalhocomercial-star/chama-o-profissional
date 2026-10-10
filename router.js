const RouterService = {
    init(onRouteChange) {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const target = button.getAttribute('data-target');
                onRouteChange(target);
            });
        });
    }
};