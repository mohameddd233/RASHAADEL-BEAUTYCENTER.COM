
/* small interactions */
window.addEventListener('load', function(){
  const splash = document.getElementById('splash');
  setTimeout(()=>{
    if(splash) splash.classList.add('hide');
    const main = document.getElementById('mainApp');
    if(main) main.classList.remove('hidden');
  }, 1400);
});

function handleLogin(e){
  e.preventDefault();
  // read role from query string; default admin
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') || 'staff';
  // redirect to dashboard (in real app you'd authenticate)
  if(role === 'admin') window.location.href = 'dashboard.html';
  else window.location.href = 'dashboard.html';
  return false;
}
