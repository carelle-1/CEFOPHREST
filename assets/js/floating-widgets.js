(function () {
    if (document.getElementById('chatbot-toggle')) return;

    const PHONE = '237654753999';
    const WHATSAPP_MSG = "Bonjour, je souhaite obtenir des informations sur vos formations en hotellerie et restauration.\n\n" +
        "Pouvez-vous me renseigner sur :\n\n" +
        "* les formations disponibles ;\n" +
        "* les conditions d'admission ;\n" +
        "* la duree des formations ;\n" +
        "* les frais de formation ;\n" +
        "* les prochaines dates d'inscription ?\n\n" +
        "Merci.";

    const widgets = document.createElement('div');
    widgets.innerHTML =
        '<div class="chatbot-window" id="chatbot-window" role="dialog" aria-label="Assistant CEFOPHREST">' +
            '<div class="chatbot-header">' +
                '<div class="chatbot-avatar"><i class="fas fa-robot" aria-hidden="true"></i></div>' +
                '<div class="chatbot-header-info">' +
                    '<strong>Assistant CEFOPHREST</strong>' +
                    '<span class="chatbot-status">En ligne</span>' +
                '</div>' +
                '<button class="chatbot-close" id="chatbot-close" type="button" aria-label="Fermer le chat"><i class="fas fa-times" aria-hidden="true"></i></button>' +
            '</div>' +
            '<div class="chatbot-body" id="chatbot-body"></div>' +
            '<form class="chatbot-footer" id="chatbot-form">' +
                '<input type="text" id="chatbot-input" placeholder="Ecrivez votre question..." autocomplete="off">' +
                '<button class="chatbot-send" type="submit" aria-label="Envoyer"><i class="fas fa-paper-plane" aria-hidden="true"></i></button>' +
            '</form>' +
        '</div>' +
        '<button class="chatbot-toggle" id="chatbot-toggle" type="button" aria-label="Ouvrir le chat" aria-expanded="false">' +
            '<i class="fas fa-comments icon-open" aria-hidden="true"></i>' +
            '<i class="fas fa-times icon-close" aria-hidden="true"></i>' +
            '<span class="chatbot-badge">1</span>' +
        '</button>' +
        '<a class="whatsapp-float" href="https://wa.me/' + PHONE + '?text=' + encodeURIComponent(WHATSAPP_MSG) + '"' +
            ' target="_blank" rel="noopener" aria-label="Contactez-nous sur WhatsApp">' +
            '<i class="fab fa-whatsapp" aria-hidden="true"></i>' +
            '<span class="whatsapp-tooltip">Contactez-nous sur WhatsApp</span>' +
        '</a>' +
        '<div class="wa-notice" id="wa-notice" role="status">' +
            '<button class="wa-notice-close" id="wa-notice-close" type="button" aria-label="Fermer">&times;</button>' +
            '<div class="wa-notice-icon"><i class="fas fa-calendar-alt" aria-hidden="true"></i></div>' +
            '<h4 class="wa-notice-title">Rentrée 2026</h4>' +
            '<p class="wa-notice-text">La rentrée aura lieu le <strong>05 octobre 2026</strong>. ' +
                'Les inscriptions se poursuivent, les places sont limitées.</p>' +
            '<a class="wa-notice-btn" href="https://wa.me/' + PHONE + '?text=' + encodeURIComponent("Bonjour, je souhaite m'inscrire pour la rentrée du 05 octobre 2026.") + '"' +
                ' target="_blank" rel="noopener">S\'inscrire sur WhatsApp</a>' +
        '</div>';

    document.body.appendChild(widgets);

    // Popup annonce rentrée : s'affiche a chaque chargement de la page
    const notice = document.getElementById('wa-notice');
    const closeBtn = document.getElementById('wa-notice-close');

    function closeNotice() {
        notice.classList.remove('is-visible');
    }

    setTimeout(() => notice.classList.add('is-visible'), 2500);

    closeBtn.addEventListener('click', closeNotice);

    setTimeout(() => {
        if (notice.classList.contains('is-visible')) closeNotice();
    }, 15000);
})();
