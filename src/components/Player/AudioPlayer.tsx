'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Player.module.css';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={styles.playerBar}
    >
      <div className={styles.container}>
        <div className={styles.trackInfo}>
          <div className={styles.albumArt}>
            <Music size={20} color="white" />
          </div>
          <div className={styles.details}>
            <h4 className={styles.trackName}>Sabor de Mi Tierra</h4>
            <p className={styles.artistName}>La Bendición</p>
          </div>
        </div>

        <div className={styles.controls}>
          <button className={styles.iconBtn}><SkipBack size={20} /></button>
          <button 
            className={styles.playBtn}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
          </button>
          <button className={styles.iconBtn}><SkipForward size={20} /></button>
        </div>

        <div className={styles.volumeControl}>
          <Volume2 size={20} className={styles.volumeIcon} />
          <div className={styles.volumeBar}>
            <div className={styles.volumeProgress}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
