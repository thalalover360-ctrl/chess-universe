// Global Session & Navbar Sync
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Agar user logged in nahi hai aur login screen par nahi hai, toh bounce back
  const isAuth = localStorage.getItem('chess_auth');
  if (!isAuth && !currentPath.includes('login.html')) {
    window.location.href = 'login.html';
    return;
  }

  // Pure app ke navbar me updated username & rating sync rakho
  const navName = document.getElementById('navName');
  const navAvatar = document.getElementById('navAvatar');
  const navElo = document.getElementById('navElo');

  if (navName) navName.innerText = localStorage.getItem('chess_name') || 'Player';
  if (navAvatar) navAvatar.src = localStorage.getItem('chess_avatar') || 'https://api.dicebear.com/7.x/bottts/svg?seed=Player';
  if (navElo) navElo.innerText = localStorage.getItem('chess_rating') || 'Calibrating (?)';
});

