import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm text-xl mr-2"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <FiMoon /> : <FiSun />}
        </button>
    );
};

export default ThemeToggle;
