(function () {
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');

      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach(function (p) {
        var active = p.id === 'panel-' + key;
        p.classList.toggle('is-active', active);
        p.hidden = !active;
      });

      document.querySelector('.tabsection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
