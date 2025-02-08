import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FIRForm } from './components/FIRForm';
import { FIRViewer } from './components/FIRViewer';
import { Chatbot } from './components/Chatbot';
import { Sidebar } from './components/Sidebar';
import { translations } from './translations';
import { ColorblindMode, Language, FIRData } from './types';
import { Menu } from 'lucide-react';

function App() {
  const [firId, setFirId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [firData, setFirData] = useState<FIRData | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [colorblindMode, setColorblindMode] = useState<ColorblindMode>('none');
  const [language, setLanguage] = useState<Language>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[language] || translations.en;

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getColorblindFilter = () => {
    switch (colorblindMode) {
      case 'protanopia':
        return 'saturate(0.5) sepia(0.2)';
      case 'deuteranopia':
        return 'saturate(0.7) hue-rotate(-10deg)';
      case 'tritanopia':
        return 'saturate(0.8) hue-rotate(180deg)';
      default:
        return 'none';
    }
  };

  const fetchFIR = async () => {
    if (!firId.trim()) {
      setError(t.invalidFirId || 'Please enter a valid FIR ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (firId === "TEST123") {
        setFirData({
          id: firId,
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        });
      } else {
        throw new Error('FIR not found');
      }
    } catch (err) {
      setError(t.firNotFound || 'Unable to find FIR with the provided ID');
      setFirData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}
      style={{ filter: getColorblindFilter() }}
    >
      <Header
        isDark={isDark}
        setIsDark={setIsDark}
        colorblindMode={colorblindMode}
        setColorblindMode={setColorblindMode}
        language={language}
        setLanguage={setLanguage}
        t={t}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          t={t}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : 'ml-0'} overflow-y-auto`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white dark:bg-gray-800/95 rounded-2xl shadow-xl p-8">
              <div className="max-w-xl mx-auto">
                <div className="flex flex-col space-y-6">
                  <FIRForm
                    firId={firId}
                    setFirId={setFirId}
                    loading={loading}
                    onSubmit={fetchFIR}
                    t={t}
                  />

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 p-4 rounded-xl text-sm animate-fade-in">
                      {error}
                    </div>
                  )}

                  {firData && <FIRViewer firData={firData} t={t} />}
                </div>
              </div>
            </div>
          </div>
        </main>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed left-4 bottom-4 p-2 bg-white dark:bg-gray-800/95 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700/90 transition-colors z-30 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <Menu className="h-6 w-6 text-gov-green-600 dark:text-gov-green-300" />
        </button>
      </div>

      <Chatbot
        showChatbot={showChatbot}
        setShowChatbot={setShowChatbot}
        t={t}
      />
    </div>
  );
}

export default App;