type Mood = "vhs" | "interlude" | "sky" | "scrapbook" | "tarot" | "gacha" | "finale" | "quiet";
type UiSound = "next" | "unlock" | "draw" | "star" | "insert" | "tracking" | "play";

let toneModule: typeof import("tone") | null = null;
let synth: import("tone").PolySynth | null = null;
let pianoSynth: import("tone").PolySynth | null = null;
let clackSynth: import("tone").MembraneSynth | null = null;
let clackNoise: import("tone").NoiseSynth | null = null;
let started = false;
let muted = false;
let currentMood: Mood = "quiet";

// TODO Phase 2: replace the skeleton synth with real music stems and mood layers.
const ensureTone = async () => {
  if (!toneModule) {
    toneModule = await import("tone");
  }

  return toneModule;
};

export const audioManager = {
  async start() {
    if (started) {
      return;
    }

    try {
      const Tone = await ensureTone();
      await Tone.start();
      synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.08, decay: 0.18, sustain: 0.08, release: 0.7 },
      }).toDestination();
      synth.volume.value = -28;
      pianoSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.015, decay: 1.1, sustain: 0.06, release: 2.2 },
      }).toDestination();
      pianoSynth.volume.value = -29;
      clackSynth = new Tone.MembraneSynth({
        pitchDecay: 0.012,
        octaves: 2.4,
        oscillator: { type: "square" },
        envelope: { attack: 0.001, decay: 0.07, sustain: 0, release: 0.035 },
      }).toDestination();
      clackSynth.volume.value = -22;
      clackNoise = new Tone.NoiseSynth({
        noise: { type: "brown" },
        envelope: { attack: 0.001, decay: 0.026, sustain: 0, release: 0.018 },
      }).toDestination();
      clackNoise.volume.value = -34;
      started = true;
    } catch {
      started = false;
    }
  },

  setMood(mood: Mood) {
    currentMood = mood;
  },

  mute() {
    muted = true;
  },

  unmute() {
    muted = false;
  },

  playUiSound(type: UiSound) {
    if (!started || muted || !synth) {
      return;
    }

    try {
      const noteMap: Record<UiSound, string> = {
        next: "C5",
        unlock: "G5",
        draw: "E5",
        star: "A5",
        insert: "C3",
        tracking: "F#4",
        play: "C4",
      };
      const duration = currentMood === "tarot" ? "12n" : "24n";
      synth.triggerAttackRelease(noteMap[type], duration);
    } catch {
      // Audio is a progressive enhancement in this phase.
    }
  },

  playAchievementCue(tier: "main" | "puzzle" | "hidden" = "main") {
    if (!started || muted || !toneModule || !synth || !pianoSynth || !clackNoise) {
      return;
    }

    try {
      const now = toneModule.now();
      const sparkleNotes =
        tier === "hidden"
          ? ["G5", "B5", "D6", "G6"]
          : tier === "puzzle"
            ? ["E5", "G5", "B5", "E6"]
            : ["C5", "E5", "G5", "C6"];

      clackNoise.triggerAttackRelease("64n", now, 0.16);
      synth.triggerAttackRelease(sparkleNotes.slice(0, 3), "16n", now + 0.02, 0.5);
      pianoSynth.triggerAttackRelease(sparkleNotes[0], "32n", now + 0.02, 0.24);
      pianoSynth.triggerAttackRelease(sparkleNotes[1], "32n", now + 0.16, 0.28);
      pianoSynth.triggerAttackRelease(sparkleNotes[2], "32n", now + 0.3, 0.3);
      pianoSynth.triggerAttackRelease(sparkleNotes[3], "8n", now + 0.48, 0.38);
      synth.triggerAttackRelease([sparkleNotes[1], sparkleNotes[3]], "8n", now + 0.5, 0.26);
    } catch {
      // Achievement audio should never block unlock state.
    }
  },

  playDialoguePopupCue() {
    if (!started || muted || !toneModule || !synth || !pianoSynth) {
      return;
    }

    try {
      const now = toneModule.now();
      synth.triggerAttackRelease("A4", "32n", now, 0.22);
      pianoSynth.triggerAttackRelease(["E5", "A5"], "16n", now + 0.08, 0.2);
    } catch {
      // Ambient dialogue is a visual feature first.
    }
  },

  playTapeBootSequence() {
    if (!started || muted || !synth || !toneModule) {
      return;
    }

    try {
      const now = toneModule.now();
      synth.triggerAttackRelease(["C2", "G2"], "32n", now + 0.08);
      synth.triggerAttackRelease("F#2", "32n", now + 0.48);
      synth.triggerAttackRelease(["C3", "D#3"], "32n", now + 0.92);
      synth.triggerAttackRelease("G4", "32n", now + 1.42);
      synth.triggerAttackRelease(["A4", "C5"], "24n", now + 2.42);
      synth.triggerAttackRelease("F#4", "32n", now + 3.18);
      synth.triggerAttackRelease(["C5", "G5"], "16n", now + 6.42);
    } catch {
      // VHS boot audio is intentionally non-blocking.
    }
  },

  playCassetteInsertCue() {
    if (!started || muted || !toneModule || !clackSynth || !clackNoise) {
      return;
    }

    try {
      const now = toneModule.now();
      const hits = [
        { note: "C2", time: 0.22, velocity: 0.46 },
        { note: "F#1", time: 0.92, velocity: 0.5 },
        { note: "D2", time: 1.48, velocity: 0.54 },
        { note: "A1", time: 1.88, velocity: 0.66 },
        { note: "C2", time: 2.18, velocity: 0.38 },
      ];

      hits.forEach(({ note, time, velocity }) => {
        clackSynth?.triggerAttackRelease(note, "64n", now + time, velocity);
      });

      [0.2, 0.9, 1.47, 1.86, 2.16].forEach((time, index) => {
        clackNoise?.triggerAttackRelease(index === 3 ? "32n" : "64n", now + time, index === 3 ? 0.42 : 0.28);
      });
    } catch {
      // Cassette mechanics should never block the intro.
    }
  },

  playTapePlayCue() {
    if (!started || muted || !synth || !toneModule) {
      return;
    }

    try {
      const now = toneModule.now();
      synth.triggerAttackRelease("C3", "32n", now);
      synth.triggerAttackRelease("G3", "32n", now + 0.08);
      synth.triggerAttackRelease(["C4", "E4", "G4"], "16n", now + 0.18);
    } catch {
      // Audio is a progressive enhancement in this phase.
    }
  },

  playTitleRevealCue() {
    if (!started || muted || !toneModule || !synth || !pianoSynth || !clackSynth || !clackNoise) {
      return;
    }

    try {
      const now = toneModule.now();
      clackNoise.triggerAttackRelease("16n", now + 0.02, 0.18);
      clackSynth.triggerAttackRelease("C1", "16n", now + 0.04, 0.7);
      synth.triggerAttackRelease(["C2", "C3"], "12n", now + 0.05, 0.5);

      clackSynth.triggerAttackRelease("G1", "8n", now + 0.43, 0.88);
      synth.triggerAttackRelease(["G2", "C3", "D#3"], "8n", now + 0.44, 0.72);
      clackNoise.triggerAttackRelease("32n", now + 0.46, 0.1);

      pianoSynth.triggerAttackRelease(["C4", "G4", "C5"], "2n", now + 0.72, 0.32);
      pianoSynth.triggerAttackRelease("G5", "8n", now + 1.1, 0.18);
    } catch {
      // The title reveal should still work if Web Audio is unavailable.
    }
  },

  playInterludePianoSequence() {
    if (!started || muted || !pianoSynth || !toneModule) {
      return;
    }

    try {
      const now = toneModule.now();
      const chords = [
        { notes: ["D4", "A4", "E5"], time: 0.25, duration: "2n" },
        { notes: ["F#4", "A4", "C#5"], time: 2.05, duration: "2n" },
        { notes: ["E4", "B4", "D5"], time: 3.85, duration: "2n" },
        { notes: ["G4", "B4", "E5"], time: 5.65, duration: "2n" },
        { notes: ["A4", "C#5", "F#5"], time: 7.15, duration: "4n" },
        { notes: ["B4", "D5", "G5"], time: 8.15, duration: "4n" },
        { notes: ["A4", "E5", "A5"], time: 9.15, duration: "1n" },
      ];
      const glints = [
        { note: "A5", time: 1.12 },
        { note: "E5", time: 2.78 },
        { note: "B5", time: 4.4 },
        { note: "C#6", time: 6.75 },
        { note: "E6", time: 8.72 },
      ];

      chords.forEach(({ notes, time, duration }) => {
        pianoSynth?.triggerAttackRelease(notes, duration, now + time, 0.42);
      });

      glints.forEach(({ note, time }) => {
        pianoSynth?.triggerAttackRelease(note, "8n", now + time, 0.28);
      });
    } catch {
      // The interlude still works visually if Web Audio is unavailable.
    }
  },
};
