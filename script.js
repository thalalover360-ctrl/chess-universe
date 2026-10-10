// Global Session & Navbar Sync
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  // Agar user login nahi hai aur login page par nahi hai toh login pe redirect karo
  const isAuth = localStorage.getItem('chess_auth');
  if (!isAuth && !currentPath.includes('login.html')) {
    window.location.href = 'login.html';
    return;
  }

  // Sync Navbar elements across all pages
  const navName = document.getElementById('navName');
  const navAvatar = document.getElementById('navAvatar');
  const navElo = document.getElementById('navElo');

  if (navName) navName.innerText = localStorage.getItem('chess_name') || 'Player';
  if (navAvatar) navAvatar.src = localStorage.getItem('chess_avatar') || 'https://api.dicebear.com/7.x/bottts/svg?seed=Player';
  if (navElo) navElo.innerText = localStorage.getItem('chess_rating') || '?';
});

