import React from 'react';
import { Sun, Moon, Menu as MenuIcon, X } from 'lucide-react';
import { ColorblindMode, Language, Translation } from '../types';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  colorblindMode: ColorblindMode;
  setColorblindMode: (value: ColorblindMode) => void;
  language: Language;
  setLanguage: (value: Language) => void;
  t: Translation;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  setIsDark,
  colorblindMode,
  setColorblindMode,
  language,
  setLanguage,
  t,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <>
      <header className="bg-gov-green-800 dark:bg-gov-green-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=48&h=48&fit=crop&crop=center" 
                  alt="NyaySetu" 
                  className="h-10 w-10 object-cover rounded-full ring-2 ring-gov-green-400 dark:ring-gov-green-300 transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gov-green-400/20 animate-ping"></div>
              </div>
              <h1 className="text-2xl font-serif font-bold text-white">
                {t.title}
              </h1>
            </div>

           
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <select
                  value={colorblindMode}
                  onChange={(e) => setColorblindMode(e.target.value as ColorblindMode)}
                  className="appearance-none px-3 py-1.5 pr-8 rounded-lg bg-white/10 text-white border-none text-sm font-sans focus:ring-2 focus:ring-gov-green-400 cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <option value="none" className="text-gray-900">Normal Vision</option>
                  <option value="protanopia" className="text-gray-900">Protanopia</option>
                  <option value="deuteranopia" className="text-gray-900">Deuteranopia</option>
                  <option value="tritanopia" className="text-gray-900">Tritanopia</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="appearance-none px-3 py-1.5 pr-8 rounded-lg bg-white/10 text-white border-none text-sm font-sans focus:ring-2 focus:ring-gov-green-400 cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <option value="en" className="text-gray-900">English</option>
                  <option value="hi" className="text-gray-900">हिंदी</option>
                  <option value="bn" className="text-gray-900">বাংলা</option>
                  <option value="te" className="text-gray-900">తెలుగు</option>
                  <option value="ta" className="text-gray-900">தமிழ்</option>
                  <option value="mr" className="text-gray-900">मराठी</option>
                  <option value="gu" className="text-gray-900">ગુજરાતી</option>
                  <option value="pa" className="text-gray-900">ਪੰਜਾਬੀ</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden">
          <div className="fixed inset-y-0 right-0 w-64 bg-gov-green-800 dark:bg-gov-green-900 shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h2 className="text-lg font-serif font-semibold text-white">Settings</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-serif font-medium text-white">Vision Mode</label>
                <select
                  value={colorblindMode}
                  onChange={(e) => setColorblindMode(e.target.value as ColorblindMode)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border-none text-sm font-sans focus:ring-2 focus:ring-gov-green-400 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="none" className="bg-gov-green-800">Normal Vision</option>
                  <option value="protanopia" className="bg-gov-green-800">Protanopia</option>
                  <option value="deuteranopia" className="bg-gov-green-800">Deuteranopia</option>
                  <option value="tritanopia" className="bg-gov-green-800">Tritanopia</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-serif font-medium text-white">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white border-none text-sm font-sans focus:ring-2 focus:ring-gov-green-400 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="en" className="bg-gov-green-800">English</option>
                  <option value="hi" className="bg-gov-green-800">हिंदी</option>
                  <option value="bn" className="bg-gov-green-800">বাংলা</option>
                  <option value="te" className="bg-gov-green-800">తెలుగు</option>
                  <option value="ta" className="bg-gov-green-800">தமிழ்</option>
                  <option value="mr" className="bg-gov-green-800">मराठी</option>
                  <option value="gu" className="bg-gov-green-800">ગુજરાતી</option>
                  <option value="pa" className="bg-gov-green-800">ਪੰਜਾਬੀ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-serif font-medium text-white">Theme</label>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center justify-center space-x-2 font-sans"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-5 w-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};