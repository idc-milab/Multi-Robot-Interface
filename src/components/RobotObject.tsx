import React, { Component, useEffect, useState } from 'react'
import { HttpClient } from '@butter-robotics/mas-javascript-api';

export function RobotObject({ butterClient, onRemove }: { butterClient: HttpClient, onRemove: (ip: string) => void }) {

  const [animations, setAnimations] = useState<string[]>([]);

  useEffect(() => {
    loadAnimations();
  }, []);

  const loadAnimations = async () => {
    setTimeout(() => {
    }, 5000)
    const res = await butterClient.getAvailableAnimations();
    if (res.status !== 200) {
      console.error('Failed to get robot animations', res);
      return;
    }
    const animations = res.data.Result.match(/\[.*\]/ig)[0].replace('[', '').replace(']', '').replace(/\\s+/, '').split(',');
    console.log(animations);
    setAnimations(animations);
  }

  const playAnimationByName = (animation: string) => {
    butterClient.playAnimation(animation.trim());
  }

  return (
    <div>
      <div key={butterClient.ip} className='robot-object'>
        {animations.length === 0 ? 'loading...' : animations.map(animation => (
          <button className='animation-button'key={animation} onClick={() => playAnimationByName(animation)}>{animation}</button>
        ))}
        <footer >
          <button className='remove' onClick={() => onRemove(butterClient.ip)}>Remove &#10005;</button>
        </footer>
      </div>

    </div>
  );
}

