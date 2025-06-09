import { useContext } from 'react';
import ThemeContext from '../utils/ThemeContext';


function Theme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('Theme must be used within a ThemeProvider');
  }

  const { theme, setTheme, themeIcon } = context;
  return (
    <button
      className={`h-[44px] w-[44px] max-sm:w-[32px] max-sm:h-[32px]  flex justify-center items-center rounded-[8px] cursor-pointer`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <img
        src={themeIcon || undefined}
        alt="theme icon"
        className="max-sm:w-[20px] max-sm:h-[20px]"
      />
    </button>
  );
}

export default Theme;