import React, { useState, useMemo } from 'react';
import { Search, Book, ChevronDown, ChevronRight } from 'lucide-react';
import { Translation } from '../types';
import { ipcData, transformIPCData } from '../data/ipcSections';
import { cpcData, transformCPCData } from '../data/cpcSections';

interface SidebarProps {
  t: Translation;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ t, isOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'ipc' | 'cpc'>('ipc');

  
  const IPC_SECTIONS = useMemo(() => transformIPCData(ipcData), []);
  const CPC_SECTIONS = useMemo(() => transformCPCData(cpcData), []);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

 
  const filteredSections = useMemo(() => {
    const sections = activeTab === 'ipc' ? IPC_SECTIONS : CPC_SECTIONS;
    if (!searchTerm) return sections;

    const searchLower = searchTerm.toLowerCase();
    return sections.map(chapter => ({
      ...chapter,
      sections: chapter.sections.filter(section =>
        section.description.toLowerCase().includes(searchLower) ||
        section.number.includes(searchLower)
      )
    })).filter(chapter => chapter.sections.length > 0);
  }, [activeTab, searchTerm, IPC_SECTIONS, CPC_SECTIONS]);

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800/95 border-r border-gray-200 dark:border-gray-700/50 transition-all duration-300 ${
        isOpen ? 'w-80' : 'w-0'
      } overflow-hidden`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700/50">
          <h2 className="text-xl font-serif font-semibold text-gray-800 dark:text-white mb-4">
            {t.legalReference}
          </h2>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchLaws}
              className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700/50 border-none rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gov-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700/50">
          <button
            onClick={() => setActiveTab('ipc')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'ipc'
                ? 'text-gov-green-500 dark:text-gov-green-300 border-b-2 border-gov-green-500 dark:border-gov-green-300'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t.ipcTitle}
          </button>
          <button
            onClick={() => setActiveTab('cpc')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              activeTab === 'cpc'
                ? 'text-gov-green-500 dark:text-gov-green-300 border-b-2 border-gov-green-500 dark:border-gov-green-300'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t.cpcTitle}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSections.map((section) => (
            <div key={section.title} className="border-b border-gray-200 dark:border-gray-700/50">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {section.title}
                </span>
                {expandedSections.includes(section.title) ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>
              {expandedSections.includes(section.title) && (
                <div className="bg-gray-50 dark:bg-gray-700/30">
                  {section.sections.map((s) => (
                    <div
                      key={s.number}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600/50 cursor-pointer"
                    >
                      <div className="flex items-start space-x-2">
                        <Book className="h-4 w-4 mt-1 text-gov-green-600 dark:text-gov-green-300" />
                        <div>
                          <span className="text-sm font-medium text-gray-800 dark:text-white">
                            Section {s.number}
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};