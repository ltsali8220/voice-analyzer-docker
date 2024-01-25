import { LANGUAGES } from '@/constant';
import React from 'react';

interface LanguageSelectorProps {
  onLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  return (
    <div className='flex gap-5'>
      <div className='flex flex-col mb-2'>
        <label htmlFor='language-select' className='text-lg p-2'>
          {' '}
          Input Language{' '}
        </label>
        <select
          id='language-select'
          className='border border-5 rounded-lg p-2'
          onChange={onLanguageChange}
        >
          {LANGUAGES &&
            LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;