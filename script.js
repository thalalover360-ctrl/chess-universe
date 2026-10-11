// ==========================================================================
// CHESS UNIVERSE - CINEMATIC TITAN AUDIO ENGINE & REAL WOODEN SFX
// ==========================================================================

const SoundEngine = (() => {
  let ctx = null;
  let isLobbyMusicPlaying = false;
  let lobbyMusicTimer = null;
  let masterGain = null;
  let volume = 0.8;

  function getAudioCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  // ==========================================================================
  // 1. BGMI / ACTION CINEMATIC LOBBY THEME (HEAVY BASS & WAR DRUM PULSE)
  // ==========================================================
  let beatStep = 0;
  // D Minor Cinematic Chord Progressions (Epic Military / BGMI Suspense)
  const cinematicChords = [
    { root: 73.42, notes: [146.83, 174.61, 220.00, 293.66] }, // Dm
    { root: 65.41, notes: [130.81, 164.81, 196.00, 261.63] }, // C
    { root: 58.27, notes: [116.54, 146.83, 174.61, 233.08] }, // Bb (Dramatic Lift)
    { root: 65.41, notes: [130.81, 164.81, 196.00, 246.94] }  // C / A
  ];

  function playCinematicLobbyBar() {
    if (!isLobbyMusicPlaying) return;
    const ac = getAudioCtx();
    const chord = cinematicChords[beatStep % cinematicChords.length];
    beatStep++;

    const now = ac.currentTime;

    // A. HEAVY WAR-DRUM / SUB KICK DROP (BGMI Style Impact)
    const kickOsc = ac.createOscillator();
    const kickGain = ac.createGain();
    kickOsc.type = 'sine';
    kickOsc.frequency.setValueAtTime(130, now);
    kickOsc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

    kickGain.gain.setValueAtTime(0.65, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    kickOsc.connect(kickGain);
    kickGain.connect(masterGain);
    kickOsc.start(now);
    kickOsc.stop(now + 0.4);

    // B. DEEP 808 REESE SUB-BASS DRONE
    const subOsc = ac.createOscillator();
    const subGain = ac.createGain();
    const subFilter = ac.createBiquadFilter();

    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(chord.root, now);

    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(160, now);

    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.35, now + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(masterGain);

    subOsc.start(now);
    subOsc.stop(now + 2.2);

    // C. DRAMATIC STRINGS / BRASS PAD SWELL
    chord.notes.forEach((freq, idx) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      const f = ac.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      f.type = 'bandpass';
      f.frequency.setValueAtTime(450 + (idx * 150), now);
      f.Q.setValueAtTime(1.8, now);

      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc.connect(f);
      f.connect(g);
      g.connect(masterGain);

      osc.start(now);
      osc.stop(now + 2.4);
    });
  }

  function startLobbyTheme() {
    getAudioCtx();
    if (isLobbyMusicPlaying) return;
    isLobbyMusicPlaying = true;
    playCinematicLobbyBar();
    lobbyMusicTimer = setInterval(playCinematicLobbyBar, 2300);
  }

  function stopLobbyTheme() {
    isLobbyMusicPlaying = false;
    if (lobbyMusicTimer) clearInterval(lobbyMusicTimer);
  }

  // ==========================================================================
  // 2. CHESS.COM GRADE REAL ACOUSTIC WOOD PIECE SFX
  // ==========================================================================

  // NORMAL MOVE: Realistic Wooden Chessboard Thud
  function playMove() {
    const ac = getAudioCtx();
    const now = ac.currentTime;

    // 1. High tactile transient (Wood click)
    const clickOsc = ac.createOscillator();
    const clickGain = ac.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(800, now);
    clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.045);

    clickGain.gain.setValueAtTime(0.5, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    clickOsc.connect(clickGain);
    clickGain.connect(masterGain);
    clickOsc.start(now);
    clickOsc.stop(now + 0.05);

    // 2. Low table resonance (Hollow wood board)
    const woodOsc = ac.createOscillator();
    const woodGain = ac.createGain();
    woodOsc.type = 'sine';
    woodOsc.frequency.setValueAtTime(180, now);
    woodOsc.frequency.exponentialRampToValueAtTime(50, now + 0.08);

    woodGain.gain.setValueAtTime(0.4, now);
    woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    woodOsc.connect(woodGain);
    woodGain.connect(masterGain);
    woodOsc.start(now);
    woodOsc.stop(now + 0.085);
  }

  // CAPTURE: Heavy Dual-Wood Impact
  function playCapture() {
    const ac = getAudioCtx();
    const now = ac.currentTime;

    // Harder transient strike
    const snapOsc = ac.createOscillator();
    const snapGain = ac.createGain();
    snapOsc.type = 'sawtooth';
    snapOsc.frequency.setValueAtTime(1200, now);
    snapOsc.frequency.exponentialRampToValueAtTime(90, now + 0.07);

    snapGain.gain.setValueAtTime(0.65, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    snapOsc.connect(snapGain);
    snapGain.connect(masterGain);
    snapOsc.start(now);
    snapOsc.stop(now + 0.075);

    // Deep table impact
    const bodyOsc = ac.createOscillator();
    const bodyGain = ac.createGain();
    bodyOsc.type = 'triangle';
    bodyOsc.frequency.setValueAtTime(240, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    bodyGain.gain.setValueAtTime(0.6, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(masterGain);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.13);
  }

  // CHECK: Wood impact + Metallic tactical alert
  function playCheck() {
    playCapture();
    const ac = getAudioCtx();
    const now = ac.currentTime;

    const bellOsc = ac.createOscillator();
    const bellGain = ac.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1046.5, now); // High C
    bellOsc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    bellGain.gain.setValueAtTime(0.3, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    bellOsc.connect(bellGain);
    bellGain.connect(masterGain);
    bellOsc.start(now);
    bellOsc.stop(now + 0.3);
  }

  // CASTLE: Double rapid wood clicks
  function playCastle() {
    playMove();
    setTimeout(playMove, 110);
  }

  // Set Master Volume (0 to 1)
  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    if (masterGain && ctx) {
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    }
  }

  return {
    getAudioCtx,
    startLobbyTheme,
    stopLobbyTheme,
    playMove,
    playCapture,
    playCheck,
    playCastle,
    setVolume
  };
})();

// Auto-unlock WebAudio on initial user interaction anywhere in app
window.addEventListener('click', () => { SoundEngine.getAudioCtx(); }, { once: true });
window.addEventListener('touchstart', () => { SoundEngine.getAudioCtx(); }, { once: true });

