document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const body = document.getElementById('chatbot-body');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const closeBtn = document.getElementById('chatbot-close');
    if (!toggle || !win || !body) return;

    const PHONE = '237654753999';
    const PHONE_DISPLAY = '(+237) 654 753 999';
    const WHATSAPP_MSG = 'Bonjour, je souhaite obtenir des informations sur vos formations en hôtellerie et restauration.';

    const FORMATIONS = [
        'Gestion d\'hôtel — 12 mois (intermédiaire)',
        'Restauration haut de gamme — 9 mois (débutant)',
        'Service en salle — 6 mois (tous niveaux)',
        'Pâtisserie & Boulangerie — 8 mois (intermédiaire)',
        'Management hôtelier — 18 mois (avancé)',
        'Bar & Cocktails — 4 mois (tous niveaux)'
    ].join('\n');

    const QUICK_QUESTIONS = [
        { label: 'Quelles sont les filières disponibles ?', key: 'formations' },
        { label: 'Comment s\'inscrire à CEFOPHREST ?', key: 'inscription' },
        { label: 'Quand commence la prochaine rentrée ?', key: 'rentree' },
        { label: 'Où est situé CEFOPHREST ?', key: 'adresse' },
        { label: 'Quels sont les frais de formation ?', key: 'frais' },
        { label: 'Puis-je parler à un conseiller ?', key: 'conseiller' }
    ];

    const ANSWERS = {
        formations: 'Voici nos filières en hôtellerie et restauration :\n\n' + FORMATIONS +
            '\n\nLa durée et le niveau sont indiqués pour chaque cursus. Souhaitez-vous des détails sur une filière en particulier ?',
        inscription: 'L\'inscription se fait en 4 étapes :\n\n' +
            '1. Envoyez-nous votre/message via le bouton WhatsApp ou passez nous voir.\n' +
            '2. Nous fixons un entretien d\'orientation (30 min, gratuit).\n' +
            '3. Vous déposez votre dossier : pièce d\'identité, photo et copie des derniers diplômes.\n' +
            '4. Vous recevez votre confirmation d\'inscription et votre planning de rentrée.\n\nUn formulaire est aussi disponible sur la page Contact.',
        rentree: 'La prochaine rentrée ouvre en octobre. Les inscriptions commencent dès le 1er août et les places sont limitées par filière.\n\nPour connaître la date exacte et réserver votre place, contactez-nous au ' + PHONE_DISPLAY + '.',
        adresse: 'CEFOPHREST est situé à Yaoundé, au Cameroun :\n\n' +
            'Rue de la Formation, 123 Yaoundé.\n\n' +
            'Horaires d\'ouverture : du lundi au vendredi, 8h à 17h.\n' +
            'Téléphone : ' + PHONE_DISPLAY + '\n' +
            'Email : info@cefront.hrest.cm',
        frais: 'Les frais de formation varient selon la filière et la durée du cursus. Ils couvrent la scolarité, les fournitures, les produits pratiques et l\'équipement de travail.\n\n' +
            'Pour recevoir le devis détaillé et les facilités de paiement, contactez-nous au ' + PHONE_DISPLAY + ' ou sur WhatsApp. Un conseiller vous répond du lundi au vendredi.',
        conseiller: 'Bien sûr, je vous mets en relation. Vous pouvez joindre notre équipe :\n\n' +
            'Téléphone / WhatsApp : ' + PHONE_DISPLAY + '\n' +
            'Email : info@cefront.hrest.cm\n' +
            'Bureau : Rue de la Formation, 123 Yaoundé (lun. - ven., 8h - 17h)\n\n' +
            'Cliquez ci-dessous pour ouvrir WhatsApp avec votre message déjà rédigé.',
        default: 'Je peux vous renseigner sur nos formations en hôtellerie et restauration, l\'inscription, la rentrée, les frais et l\'adresse du centre.\n\n' +
            'Pour une réponse précise sur un point précis, contactez-nous au ' + PHONE_DISPLAY + ' ou choisissez une question ci-dessous.'
    };

    const KEYWORDS = [
        { keys: ['frais', 'prix', 'cout', 'tarif', 'argent', 'paiement', 'bourse', 'facture'], answer: 'frais' },
        { keys: ['rentree', 'debut', 'date', 'reprise', 'session', 'calendrier', 'septembre', 'octobre'], answer: 'rentree' },
        { keys: ['ou', 'adresse', 'situe', 'lieu', 'localisation', 'yaounde', 'plan', 'map'], answer: 'adresse' },
        { keys: ['inscri', 'postul', 'candidature', 'dossier', 'admission', 'inscription'], answer: 'inscription' },
        { keys: ['conseiller', 'humain', 'appel', 'telephon', 'joindre', 'whatsapp', 'contact', 'parler'], answer: 'conseiller' },
        { keys: ['filiere', 'formation', 'programme', 'cursus', 'disponible', 'specialite', 'metier'], answer: 'formations' }
    ];

    let started = false;

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function scrollToBottom() {
        body.scrollTop = body.scrollHeight;
    }

    function addMessage(text, type) {
        const el = document.createElement('div');
        el.classList.add('chatbot-msg', type);
        el.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
        body.appendChild(el);
        scrollToBottom();
        return el;
    }

    function addWhatsAppLink(msg) {
        const el = addMessage('Ouvrir WhatsApp', 'user');
        el.innerHTML = '<a href="https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg) +
            '" target="_blank" rel="noopener">Cliquez ici pour envoyer votre message sur WhatsApp</a>';
        scrollToBottom();
    }

    function showTyping() {
        const el = document.createElement('div');
        el.classList.add('chatbot-msg', 'bot', 'typing');
        el.innerHTML = '<span></span><span></span><span></span>';
        body.appendChild(el);
        scrollToBottom();
        return el;
    }

    function renderQuick() {
        const existing = body.querySelector('.chatbot-quick');
        if (existing) existing.remove();
        const wrap = document.createElement('div');
        wrap.className = 'chatbot-quick';
        QUICK_QUESTIONS.forEach(q => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-chip';
            btn.type = 'button';
            btn.textContent = q.label;
            btn.addEventListener('click', () => handleQuestion(q));
            wrap.appendChild(btn);
        });
        body.appendChild(wrap);
        scrollToBottom();
    }

    function normalize(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function detect(text) {
        const words = normalize(text).split(/[^a-z0-9]+/).filter(Boolean);
        for (const rule of KEYWORDS) {
            for (const k of rule.keys) {
                if (words.some(w => w.indexOf(k) === 0)) return rule.answer;
            }
        }
        return 'default';
    }

    function respond(key) {
        const typing = showTyping();
        setTimeout(() => {
            typing.remove();
            addMessage(ANSWERS[key], 'bot');
            if (key === 'conseiller') {
                addWhatsAppLink(WHATSAPP_MSG);
            }
            renderQuick();
        }, 700);
    }

    function handleQuestion(q) {
        addMessage(q.label, 'user');
        respond(q.key);
    }

    function greet() {
        if (started) return;
        started = true;
        const typing = showTyping();
        setTimeout(() => {
            typing.remove();
            addMessage('Bonjour et bienvenue chez CEFOPHREST !\nJe suis votre assistant virtuel. Je peux vous renseigner sur nos formations en hôtellerie et restauration.', 'bot');
            renderQuick();
        }, 500);
    }

    function open() {
        win.classList.add('is-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        greet();
        input.focus();
    }

    function close() {
        win.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
        if (win.classList.contains('is-open')) close();
        else open();
    });

    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && win.classList.contains('is-open')) close();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        greet();
        respond(detect(text));
    });
});
