// ==========================================================================
// CHESS UNIVERSE - GLOBAL SYSTEM CONTROLLER & AUDIO MANAGER
// ==========================================================================

const ChessApp = (() => {
  // Global User Credentials
  const user = {
    name: localStorage.getItem('chess_name') || 'Harsh Singh',
    uid: localStorage.getItem('chess_game_uid') || '0000000000',
    firebaseUid: localStorage.getItem('chess_firebase_uid') || '',
    rating: parseInt(localStorage.getItem('chess_rating'), 10) || 1200,
    coins: parseInt(localStorage.getItem('chess_coins'), 10) || 350,
    diamonds: parseInt(localStorage.getItem('chess_diamonds'), 10) || 8
  };

  // Web Audio Context (Hardware Synthesizer)
  let audioCtx = null;
  let bgLoopTimer = null;
  let isSoundMuted = localStorage.getItem('chess_sound_muted') === 'true';

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  // Play Wooden Piece Move Sound
  function playMoveSound(isCapture = false) {
    if (isSoundMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isCapture ? 420 : 280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // UI Currency Elements Auto-Hydration
  function syncUI() {
    document.querySelectorAll('.display-user-name').forEach(el => el.innerText = user.name);
    document.querySelectorAll('.display-user-uid').forEach(el => el.innerText = user.uid);
    document.querySelectorAll('.display-user-coins').forEach(el => el.innerText = user.coins);
    document.querySelectorAll('.display-user-elo').forEach(el => el.innerText = user.rating);
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    syncUI();

    // Auto unlock audio context on initial screen tap
    const unlockAudio = () => {
      getAudioContext();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
  });

  return {
    user,
    playMoveSound,
    syncUI
  };
})();

