
import React, { useEffect } from 'react';

export const LeafGenerator = () => {
  useEffect(() => {
    // Create falling leaves
    const createLeaf = () => {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf-fall');
      
      // Set random properties
      leaf.style.setProperty('--fall-duration', Math.random().toString());
      leaf.style.setProperty('--fall-delay', Math.random().toString());
      leaf.style.setProperty('--fall-x', Math.random().toString());
      
      // Set random rotation
      leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Add to body and remove after animation ends
      document.body.appendChild(leaf);
      setTimeout(() => {
        if (document.body.contains(leaf)) {
          document.body.removeChild(leaf);
        }
      }, 15000 + Math.random() * 5000);
    };
    
    // Create leaves periodically
    const leafInterval = setInterval(() => {
      if (Math.random() > 0.7) { // Only 30% chance to create a leaf
        createLeaf();
      }
    }, 2000);
    
    // Cleanup
    return () => {
      clearInterval(leafInterval);
      // Remove any remaining leaves
      document.querySelectorAll('.leaf-fall').forEach(leaf => {
        if (document.body.contains(leaf)) {
          document.body.removeChild(leaf);
        }
      });
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};
