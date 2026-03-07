import React, { useState, useRef, useEffect } from 'react';
import { RiQuestionLine } from 'react-icons/ri';

interface InfoTipProps {
  text: string;
}

const InfoTip: React.FC<InfoTipProps> = ({ text }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
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
        <div
          className="absolute z-50 w-72 md:w-96 p-3 md:p-4 rounded-xl shadow-lg text-right max-h-80 overflow-y-auto"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px var(--shadow-color)',
            top: '100%',
            marginTop: '8px',
            right: 0,
          }}
        >
          <div className="absolute -top-1.5 right-2 w-3 h-3 rotate-45" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderLeft: 'none', borderBottom: 'none' }} />
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{text}</p>
        </div>
      )}
    </div>
  );
};

export default InfoTip;
