(async function(){
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
    const nodes = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(nodes.map(loadInclude));
    
    // DEBUG
    const page = document.body.getAttribute('data-page');
    console.log('🔍 Page attribute:', page);
    
    if(page){
      const link = document.querySelector(`.nav-link[data-page="${page}"]`);
      console.log('🔍 Link found:', link);
      console.log('🔍 All links:', document.querySelectorAll('.nav-link'));
      if(link) {
        link.classList.add('active');
        console.log('✅ Active added to link');
      } else {
        console.log('❌ Link NOT found for page:', page);
      }
      const title = document.getElementById('page-title');
      if(title) title.textContent = page.charAt(0).toUpperCase() + page.slice(1);
    }

    document.dispatchEvent(new CustomEvent('includes:loaded'));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }
})();
