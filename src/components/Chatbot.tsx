import React from 'react';
import { Bot } from 'lucide-react';
import { Translation } from '../types';

interface ChatbotProps {
  showChatbot: boolean;
  setShowChatbot: (value: boolean) => void;
  t: Translation;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  showChatbot,
  setShowChatbot,
  t
}) => {
  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="bg-gov-green-600 hover:bg-gov-green-700 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 dark:shadow-gov-green-900/20"
      >
        <Bot className="h-6 w-6" />
      </button>
      
      {showChatbot && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700/50 p-4 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif font-semibold dark:text-white">{t.support}</h3>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="h-64 overflow-y-auto border-t border-b border-gray-200 dark:border-gray-700/50 py-4">
            <p className="text-gray-600 dark:text-gray-300">
              Hello! How can I help you today with the NyaySetu?
            </p>
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder={t.chatPlaceholder}
              className="flex-1 border dark:border-gray-700/50 rounded-l-xl px-3 py-2 bg-white dark:bg-gray-800/80 focus:outline-none focus:ring-1 focus:ring-gov-green-500 dark:text-white dark:placeholder-gray-400"
            />
            <button className="bg-gov-green-600 hover:bg-gov-green-700 text-white px-4 rounded-r-xl">
              {t.send}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};