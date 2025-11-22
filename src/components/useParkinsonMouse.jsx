import { useEffect, useRef, useState } from 'react';

const useParkinsonMouse = ({ targetRef, onHoverChange, onKeyPress }) => {
  const customCursorRef = useRef(null);
  const finalCursorPosRef = useRef({ x: 0, y: 0 });
  const realMousePos = useRef({ x: 0, y: 0 });
  const delayedMousePos = useRef({ x: 0, y: 0 });
  const tremorTarget = useRef({ x: 0, y: 0 });
  const currentTremor = useRef({ x: 0, y: 0 });
  const lastTremorUpdateTime = useRef(0);
  const animationFrameId = useRef(null);
  const isCurrentlyHoveringRef = useRef(false);
  const activeKeyRef = useRef(null);
  const [cursorCoords, setCursorCoords] = useState(null);

  useEffect(() => {
    const easingFactor = 0.04;
    const tremorAmount = 50;
    const tremorUpdateInterval = 50;
    const tremorEasingFactor = 0.05;

    const handleMouseMove = (event) => {
      realMousePos.current = { x: event.clientX, y: event.clientY };
    };

    // Główna pętla animacji
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity
    const animateCursor = (currentTime) => {
      delayedMousePos.current.x +=
        (realMousePos.current.x - delayedMousePos.current.x) * easingFactor;
      delayedMousePos.current.y +=
        (realMousePos.current.y - delayedMousePos.current.y) * easingFactor;

      if (currentTime - lastTremorUpdateTime.current > tremorUpdateInterval) {
        lastTremorUpdateTime.current = currentTime;
        tremorTarget.current.x = (Math.random() - 0.5) * tremorAmount * 2;
        tremorTarget.current.y = (Math.random() - 0.5) * tremorAmount * 2;
      }

      currentTremor.current.x +=
        (tremorTarget.current.x - currentTremor.current.x) * tremorEasingFactor;
      currentTremor.current.y +=
        (tremorTarget.current.y - currentTremor.current.y) * tremorEasingFactor;

      if (realMousePos.current.y < 78) {
        customCursorRef.current.style.opacity = 0;
      } else {
        customCursorRef.current.style.opacity = 1;
      }

      const finalX = delayedMousePos.current.x + currentTremor.current.x;
      const finalY = delayedMousePos.current.y + currentTremor.current.y;

      finalCursorPosRef.current = { x: finalX, y: finalY };
      setCursorCoords({ x: finalX, y: finalY });

      if (customCursorRef.current) {
        customCursorRef.current.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
      }

      if (targetRef.current && onHoverChange) {
        const targetRect = targetRef.current.getBoundingClientRect();

        const isHoveringNow =
          finalX >= targetRect.left &&
          finalX <= targetRect.right &&
          finalY >= targetRect.top &&
          finalY <= targetRect.bottom;

        if (isHoveringNow && !isCurrentlyHoveringRef.current) {
          isCurrentlyHoveringRef.current = true;
          onHoverChange(true);
        } else if (!isHoveringNow && isCurrentlyHoveringRef.current) {
          isCurrentlyHoveringRef.current = false;
          onHoverChange(false);
        }
      }

      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseDown = (event) => {
      event.preventDefault();
      if (!customCursorRef.current) return;
      const { x, y } = finalCursorPosRef.current;
      const originalDisplay = customCursorRef.current.style.display;
      customCursorRef.current.style.display = 'none';
      const elementUnderCursor = document.elementFromPoint(x, y);
      customCursorRef.current.style.display = originalDisplay;
      if (elementUnderCursor?.classList.contains('keyboard-key')) {
        const key = elementUnderCursor.dataset.key;
        console.log('key', key);
        if (key) {
          onKeyPress(key);
        }
        elementUnderCursor.classList.add('key-active');
        activeKeyRef.current = elementUnderCursor;
      }
    };

    const handleMouseUp = () => {
      if (activeKeyRef.current) {
        activeKeyRef.current.classList.remove('key-active');
        activeKeyRef.current = null;
      }
    };

    // Uruchomienie
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animationFrameId.current = requestAnimationFrame(animateCursor);

    // Sprzątanie po odmontowaniu komponentu
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [onHoverChange, targetRef.current, onKeyPress]); // Pusty array zależności sprawia, że useEffect uruchomi się tylko raz

  return { customCursorRef, cursorCoords };
};

export default useParkinsonMouse;
