import React, { useState, useRef, useEffect } from 'react';
import { RiQuestionLine } from 'react-icons/ri';

interface InfoTipProps {
  text: string;
}

const InfoTip: React.FC<InfoTipProps> = ({ text }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (open && btnRef.current) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setPopupStyle({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          right: 'auto',
          marginTop: 0,
        });
      } else {
        setPopupStyle({
          position: 'absolute',
          top: '100%',
          marginTop: '8px',
          right: 0,
        });
      }
    }
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
        style={{
          backgroundColor: open ? 'rgba(56,189,248,0.15)' : 'transparent',
          color: open ? '#38BDF8' : 'var(--text-dim)',
          border: `1px solid ${open ? 'rgba(56,189,248,0.3)' : 'var(--border)'}`,
        }}
        title="הסבר"
      >
        <RiQuestionLine className="text-sm" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40 md:hidden" />
          <div
            className="z-50 w-[calc(100vw-32px)] md:w-96 p-3 md:p-4 rounded-xl shadow-lg text-right max-h-[70vh] overflow-y-auto"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 32px var(--shadow-color)',
              ...popupStyle,
            }}
          >
            <div className="hidden md:block absolute -top-1.5 right-2 w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderLeft: 'none', borderBottom: 'none' }} />
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{text}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoTip;
