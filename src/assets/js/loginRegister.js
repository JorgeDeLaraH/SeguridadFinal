document.addEventListener('DOMContentLoaded', function() {
    const registerPress = document.getElementById('registerPress');
    const sesionPress = document.getElementById('sesionPress');
    const registerSection = document.getElementById('registerSection');
    const loginSection = document.getElementById('loginSection');

    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
    registerPress.style.opacity = 1;
    sesionPress.style.display = 'none';

    registerPress.addEventListener('click', function() {
        fadeOut(registerPress, loginSection);
        setTimeout(function() {
            registerPress.style.display = 'none';
            loginSection.style.display = 'none';
            fadeIn(sesionPress, registerSection);
        }, 500);
    });

    sesionPress.addEventListener('click', function() {
        fadeOut(sesionPress, registerSection);
        setTimeout(function() {
            sesionPress.style.display = 'none';
            registerSection.style.display = 'none';
            fadeIn(registerPress, loginSection);
        }, 500);
    });

    function fadeIn(element1, element2) {
        element1.style.opacity = 0;
        element1.style.display = 'block';
        setTimeout(function() {
            element1.style.opacity = 1;
        }, 100);
        element2.style.opacity = 0;
        element2.style.display = 'block';
        setTimeout(function() {
            element2.style.opacity = 1;
        }, 100);
    }

    function fadeOut(element1, element2) {
        element1.style.opacity = 1;
        setTimeout(function() {
            element1.style.opacity = 0;
            element2.style.opacity = 1;
        }, 100);
        element2.style.opacity = 1;
        setTimeout(function() {
            element2.style.opacity = 0;
        }, 100);
    }
});
