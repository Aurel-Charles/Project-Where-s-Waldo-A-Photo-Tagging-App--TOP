// convert milliseconde to mm:ss

export function convertMsToMinSec(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    // Format with leading zeros (e.g., "04:05")
    const formattedMin = String(minutes).padStart(2, '0');
    const formattedSec = String(seconds).padStart(2, '0');
    
    return `${formattedMin}:${formattedSec}`;
  }
