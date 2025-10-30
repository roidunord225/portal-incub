import React, { useState } from 'react';
import type { Notification } from '../types';
import { XMarkIcon } from './icons/Icons';

interface NotificationManagerProps {
  notifications: Notification[];
  onClear: () => void;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ notifications, onClear }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
      return (
          <div className="fixed bottom-4 right-4 z-50">
               <button 
                onClick={() => setIsOpen(true)}
                className="bg-incubtek-orange text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center hover:bg-orange-600 transition-transform transform hover:scale-110"
                aria-label="Afficher les notifications"
               >
                   <i className="fas fa-bell fa-lg"></i>
                   {notifications.length > 0 && (
                       <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                           {notifications.length}
                       </span>
                   )}
               </button>
          </div>
      )
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-[60vh] border border-gray-200">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-t-2xl">
        <h3 className="font-bold text-lg flex items-center">
            <i className="fas fa-envelope-open-text mr-3"></i>
            Simulateur d'Envoi d'Email
        </h3>
        <div>
            <button onClick={onClear} className="text-gray-300 hover:text-white mr-3 text-sm font-semibold disabled:opacity-50" disabled={notifications.length === 0}>
                Vider
            </button>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                 <XMarkIcon className="h-6 w-6 text-white" />
            </button>
        </div>
      </header>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {notifications.length === 0 ? (
            <div className="text-center text-gray-500 pt-10">
                <i className="fas fa-paper-plane fa-3x mb-4"></i>
                <p>Les notifications d'email simulées apparaîtront ici.</p>
            </div>
        ) : (
          <ul className="space-y-3">
            {notifications.map((notif) => (
              <li key={notif.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="text-xs text-gray-500 mb-1">
                  <strong>À:</strong> {notif.to}
                  {notif.cc && notif.cc.length > 0 && (
                      <span className="ml-2"><strong>Cc:</strong> {notif.cc.join(', ')}</span>
                  )}
                </div>
                <p className="font-semibold text-gray-800 text-sm">{notif.subject}</p>
                <details className="mt-2">
                  <summary className="text-xs text-incubtek-orange cursor-pointer">Voir le contenu</summary>
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {notif.body.trim()}
                  </div>
                </details>
                <p className="text-right text-xs text-gray-400 mt-2">{new Date(notif.timestamp).toLocaleTimeString('fr-FR')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationManager;