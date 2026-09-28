(function () {
    var MIN_DURATION = 600;
    var start = Date.now();

    var style = document.createElement('style');
    style.textContent =
        '.page-loader{position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;' +
        'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;' +
        'z-index:99999;transition:opacity .4s ease,visibility .4s ease}' +
        '.page-loader.is-hidden{opacity:0;visibility:hidden}' +
        '.page-loader img{width:90px;height:90px;object-fit:contain}' +
        '.page-loader-dots{display:flex;gap:6px;align-items:center;justify-content:center;height:12px}' +
        '.page-loader-dots i{width:8px;height:8px;border-radius:50%;background:#0a1a6e;display:block;' +
        'animation:page-loader-dot 1.2s ease-in-out infinite}' +
        '.page-loader-dots i:nth-child(2){animation-delay:.2s}' +
        '.page-loader-dots i:nth-child(3){animation-delay:.4s}' +
        '@keyframes page-loader-dot{0%,80%,100%{opacity:.25;transform:translateY(0)}' +
        '40%{opacity:1;transform:translateY(-5px)}}';
    document.head.appendChild(style);

    var loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.id = 'page-loader';
    loader.innerHTML = '<img src="assets/loader.png" alt="Chargement">' +
        '<div class="page-loader-dots" aria-label="Chargement"><i></i><i></i><i></i></div>';
    document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(loader);
    });

    function hide() {
        var elapsed = Date.now() - start;
        var delay = Math.max(0, MIN_DURATION - elapsed);
        setTimeout(function () {
            loader.classList.add('is-hidden');
            setTimeout(function () { loader.remove(); }, 450);
        }, delay);
    }

    if (document.readyState === 'complete') {
        hide();
    } else {
        window.addEventListener('load', hide);
    }
})();
