import { useEffect, useState } from 'react';

import ArrowUp from '@assets/ui/arrow-up.svg';
import ArrowDown from '@assets/ui/arrow-down.svg';

interface FloatingScrollButtonProps {
  isScrollTop?: boolean;
}

export default function FloatingScrollButton({
  isScrollTop = true,
}: FloatingScrollButtonProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (isScrollTop) {
      setIsVisible(scrollTop > 1);
    } else {
      setIsVisible(scrollTop + windowHeight < documentHeight - 1);
    }
  };

  const handleScrollAction = () => {
    if (isScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollTop]);

  if (!isVisible) return null;

  return (
    <button
      type='button'
      onClick={handleScrollAction}
      className={`fixed flex items-center justify-center rounded-full bg-white shadow-[0_0_25px_0_rgba(0,0,0,0.10)] transition-transform hover:scale-105 ${isScrollTop ? 'right-[2rem] bottom-[10rem] h-[6rem] w-[6rem]' : 'right-[1.5rem] bottom-[7.5rem] h-[4.5rem] w-[4.5rem]'}`}
    >
      <img
        className='w-[2.1rem]'
        src={isScrollTop ? ArrowUp : ArrowDown}
        alt={isScrollTop ? 'scroll to top' : 'scroll to bottom'}
      />
    </button>
  );
}
