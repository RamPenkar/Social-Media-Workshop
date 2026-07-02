(function () {
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');
  var LEAVE_MS = 220;
  var navigating = false;

  function goTo(key) {
    if (navigating) return;
    var targetTab = document.getElementById('tab-' + key);
    var targetPanel = document.getElementById('panel-' + key);
    var currentPanel = document.querySelector('.panel.is-active');
    if (!targetTab || !targetPanel || targetPanel === currentPanel) return;

    navigating = true;

    tabs.forEach(function (t) {
      var active = t === targetTab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (currentPanel) {
      currentPanel.classList.add('is-leaving');
      currentPanel.classList.remove('is-active');
    }

    window.setTimeout(function () {
      if (currentPanel) {
        currentPanel.classList.remove('is-leaving');
        currentPanel.hidden = true;
      }
      panels.forEach(function (p) {
        if (p !== targetPanel) p.hidden = true;
      });
      targetPanel.hidden = false;
      targetPanel.classList.add('is-active');
      document.querySelector('.tabsection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      navigating = false;
    }, currentPanel ? LEAVE_MS : 0);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      goTo(tab.getAttribute('data-tab'));
    });
  });

  document.querySelectorAll('.next-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goTo(btn.getAttribute('data-goto'));
    });
  });

  var process = document.getElementById('process');
  if (process && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          process.classList.add('in-view');
          observer.unobserve(process);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(process);
  } else if (process) {
    process.classList.add('in-view');
  }
})();
