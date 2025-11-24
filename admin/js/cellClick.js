
function cellClick(e) { 
  const row = e.target.closest("tr"); 
  if (!row) return; 
  const tbody = row.closest("tbody");  
  const allRows = tbody.querySelectorAll("tr");
  allRows.forEach(r => r.style.backgroundColor = ""); 
  row.style.backgroundColor = "#d1e7fd";
}

function initCellClick(tableId) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (tbody) {
    tbody.addEventListener("click", cellClick);
  }
}
