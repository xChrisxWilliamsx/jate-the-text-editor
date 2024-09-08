const install = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    install.style.display = 'block';
});

// TODO: Implement a click event handler on the `install` element
install.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        install.style.display = 'none !important';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    deferredPrompt = null;
    console.log('PWA was installed');
    install.style.display = 'none !important';
});