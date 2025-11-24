// Load jQuery + DataTables + include partials - all in one
(async function(){
  // Load external scripts/css
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  // Load partials
  async function loadInclude(el){
    const src = el.getAttribute('data-include');
    if(!src) return;
    try {
      const res = await fetch(src, {cache:'no-store'});
      el.innerHTML = res.ok ? await res.text() : '<p style="color:red">Failed to load ' + src + '</p>';
    } catch(e) { 
      el.innerHTML = '<p style="color:red">Error loading ' + src + ': ' + e.message + '</p>'; 
    }
  }

  async function loadAll(){
    // 1. Load libraries first
    try {
      loadCSS('https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css');
      await loadScript('https://code.jquery.com/jquery-3.7.1.min.js');
      await loadScript('https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js');
    } catch (err) {
      console.error('Libraries failed to load:', err);
    }

    // 2. Load partials
    const nodes = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(nodes.map(loadInclude));
    
    // 3. Set active nav
    const page = document.body.getAttribute('data-page');
    if(page){
      const link = document.querySelector(`.nav-link[data-page="${page}"]`);
      if(link) link.classList.add('active');
      const title = document.getElementById('page-title');
      if(title) title.textContent = page.charAt(0).toUpperCase() + page.slice(1);
    }

    // 4. Trigger ready event
    document.dispatchEvent(new CustomEvent('includes:loaded'));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }
})();
