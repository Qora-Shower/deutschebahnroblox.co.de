let deferredPrompt;

// Prüfen ob Install möglich ist
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Installations-Button sichtbar machen
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        // Installationsdialog anzeigen
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('App wurde installiert');
            } else {
                console.log('Installation abgelehnt');
            }

            // Button ausblenden nach Entscheidung
            installButton.style.display = 'none';
            deferredPrompt = null;
        });
    });
});

// Prüfen, ob App schon als PWA läuft → Button gar nicht erst anzeigen
if (window.matchMedia('(display-mode: fullscreen)').matches || window.navigator.fullscreen) {
    console.log("PWA-Modus aktiv");
    document.getElementById('installButton')?.remove();
}
