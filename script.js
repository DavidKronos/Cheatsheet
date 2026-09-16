  // ─── TAB SWITCHING ─────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');
      updateSidebar(tab);
    });
  });

  function updateSidebar(activeTab) {
    const sidebar = document.getElementById('sidebar');
    const allLinks = sidebar.querySelectorAll('.sidebar-link');
    const allSections = sidebar.querySelectorAll('.sidebar-section');
    allSections.forEach((section, i) => {
      const tabs = ['js', 'html', 'css', 'git'];
      section.style.display = (i < tabs.length && tabs[i] !== activeTab && activeTab !== 'lastminute') ? 'none' : 'block';
      if (activeTab === 'lastminute') section.style.display = 'none';
    });

    // Re-show only the active tab's sidebar section
    const tabIndexMap = { js: 0, html: 1, css: 2, git: 3 };
    allSections.forEach((s, i) => { s.style.display = 'none'; });
    if (tabIndexMap[activeTab] !== undefined) {
      allSections[tabIndexMap[activeTab]].style.display = 'block';
    }
  }

  // ─── Q&A EXPAND ────────────────────────────────
  function toggleQA(block) {
    block.classList.toggle('open');
  }

  // ─── SIDEBAR ACTIVE LINKS ──────────────────────
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-60px 0px -60% 0px' });

  document.querySelectorAll('.section[id]').forEach(s => observer.observe(s));

  // Initialize sidebar for first tab
  updateSidebar('js');
