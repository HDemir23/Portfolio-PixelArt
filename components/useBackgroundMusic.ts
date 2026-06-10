"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const notePattern = [196, 246.94, 293.66, 329.63, 293.66, 246.94, 220, 246.94];

export function useBackgroundMusic() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const isPlayingRef = useRef(false);

  const ensureContext = useCallback(async () => {
    const audioWindow = window as AudioWindow;
    const AudioContextConstructor =
      audioWindow.AudioContext ?? audioWindow.webkitAudioContext;

    if (!AudioContextConstructor) {
      return null;
    }

    if (!contextRef.current) {
      const context = new AudioContextConstructor();
      const masterGain = context.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(context.destination);
      contextRef.current = context;
      masterGainRef.current = masterGain;
    }

    if (contextRef.current.state === "suspended") {
      await contextRef.current.resume();
    }

    return contextRef.current;
  }, []);

  const playStep = useCallback(() => {
    const context = contextRef.current;
    const masterGain = masterGainRef.current;

    if (!context || !masterGain || !isPlayingRef.current) {
      return;
    }

    const frequency = notePattern[stepRef.current % notePattern.length];
    const now = context.currentTime;
    const noteGain = context.createGain();
    const oscillator = context.createOscillator();
    const shimmer = context.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    shimmer.type = "triangle";
    shimmer.frequency.setValueAtTime(frequency * 2, now);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.05, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.18);

    oscillator.connect(noteGain);
    shimmer.connect(noteGain);
    noteGain.connect(masterGain);

    oscillator.start(now);
    shimmer.start(now + 0.02);
    oscillator.stop(now + 1.2);
    shimmer.stop(now + 1.2);

    stepRef.current += 1;
  }, []);

  const startMusic = useCallback(async () => {
    const context = await ensureContext();
    const masterGain = masterGainRef.current;

    if (!context || !masterGain) {
      return;
    }

    isPlayingRef.current = true;
    masterGain.gain.cancelScheduledValues(context.currentTime);
    masterGain.gain.setTargetAtTime(0.18, context.currentTime, 0.16);
    playStep();

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(playStep, 620);
    setIsMusicOn(true);
  }, [ensureContext, playStep]);

  const stopMusic = useCallback(() => {
    const context = contextRef.current;
    const masterGain = masterGainRef.current;

    isPlayingRef.current = false;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (context && masterGain) {
      masterGain.gain.cancelScheduledValues(context.currentTime);
      masterGain.gain.setTargetAtTime(0.0001, context.currentTime, 0.12);
    }

    setIsMusicOn(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlayingRef.current) {
      stopMusic();
      return;
    }

    void startMusic();
  }, [startMusic, stopMusic]);

  useEffect(() => {
    return () => {
      stopMusic();
      void contextRef.current?.close();
    };
  }, [stopMusic]);

  return { isMusicOn, startMusic, toggleMusic };
}
