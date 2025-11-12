import { useEffect, useState } from 'react';

import ArrowUp from '@assets/ui/arrow-up.svg';
import ArrowDown from '@assets/ui/arrow-down.svg';

interface FloatingScrollButtonProps {
  /** true → 위로 스크롤 / false → 아래로 스크롤 */
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

    // 위로 가는 버튼일 때: 일정 스크롤 이상일 때 보이기
    // 아래로 가는 버튼일 때: 화면이 완전히 맨 아래가 아닐 때 보이기
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
      className='fixed right-[2rem] bottom-[10rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-full bg-white shadow-[0_0_25px_0_rgba(0,0,0,0.10)] transition-transform hover:scale-105'
    >
      <img
        className='w-[2.1rem]'
        src={isScrollTop ? ArrowUp : ArrowDown}
        alt={isScrollTop ? 'scroll to top' : 'scroll to bottom'}
      />
    </button>
  );
}
