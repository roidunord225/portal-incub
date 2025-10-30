import React, { useState } from 'react';
import { Ticket, User, TicketStatus } from '../types';
import { PaperClipIcon } from './icons/Icons';

interface AdminTicketDetailPageProps {
  ticket: Ticket;
  user: User; // The admin user
  requester: User;
  assignableUsers: User[];
  onUpdateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  onAssignTicket: (ticketId: string, assigneeId: string) => void;
  onAddMessage: (ticketId: string, message: { author: string; content: string; timestamp: string; attachment?: { fileName: string, url: string } }) => void;
  onBack: () => void;
}

const TICKET_STATUSES: TicketStatus[] = ['Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé'];

const getStatusColor = (status: TicketStatus) => {
    switch(status) {
        case 'Nouveau': return 'bg-orange-100 text-orange-800';
        case 'En cours': return 'bg-yellow-100 text-yellow-800';
        case 'En attente': return 'bg-purple-100 text-purple-800';
        case 'Résolu': return 'bg-green-100 text-green-800';
        case 'Fermé': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminTicketDetailPage: React.FC<AdminTicketDetailPageProps> = ({ ticket, user, requester, assignableUsers, onUpdateTicketStatus, onAssignTicket, onAddMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || attachment) {
      const messageAttachment = attachment
        ? { fileName: attachment.name, url: '#' } // Simulating URL
        : undefined;

      onAddMessage(ticket.id, {
        author: user.name,
        content: newMessage,
        timestamp: new Date().toISOString(),
        attachment: messageAttachment
      });
      setNewMessage('');
      setAttachment(null);
      const fileInput = document.getElementById('file-upload-admin') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <button onClick={onBack} className="text-incubtek-orange font-semibold hover:underline mb-4">
          <i className="fas fa-arrow-left mr-2"></i>
          Retour à la liste des tickets
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900">{ticket.title}</h1>
        <p className="text-lg text-gray-600">Ticket #{ticket.id.slice(0, 8)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Conversation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Conversation</h2>
            <div className="space-y-4">
              {ticket.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.author === user.name ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg p-4 rounded-lg ${msg.author === user.name ? 'bg-incubtek-orange text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p className="font-bold">{msg.author}</p>
                    {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}
                    {msg.attachment && (
                      <div className="mt-2">
                        <a 
                          href={msg.attachment.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`inline-flex items-center p-2 rounded-md transition ${
                            msg.author === user.name 
                            ? 'bg-orange-400 hover:bg-orange-300' 
                            : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        >
                            <PaperClipIcon className={`h-4 w-4 mr-2 ${msg.author === user.name ? 'text-white' : 'text-gray-700'}`} />
                            <span className="text-sm font-medium">{msg.attachment.fileName}</span>
                        </a>
                      </div>
                    )}
                    <p className="text-xs mt-2 opacity-75 text-right">{new Date(msg.timestamp).toLocaleString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Add Response */}
          <div className="bg-white rounded-xl shadow-lg p-6">
             <h2 className="text-xl font-bold text-gray-800 mb-4">Répondre</h2>
             <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={5}
                className="w-full p-3 border rounded-lg mb-2"
                placeholder="Votre réponse..."
             />
             {attachment && (
              <div className="my-2 p-2 bg-gray-100 rounded-md flex justify-between items-center text-sm">
                <span className="flex items-center text-gray-700">
                  <PaperClipIcon className="h-4 w-4 mr-2 text-gray-600" /> {attachment.name}
                </span>
                <button onClick={() => setAttachment(null)} className="text-red-500 hover:text-red-700 font-bold text-lg">&times;</button>
              </div>
            )}
             <div className="flex justify-between items-center mt-4">
                <label htmlFor="file-upload-admin" className="cursor-pointer text-gray-500 hover:text-incubtek-orange p-2 rounded-full">
                    <PaperClipIcon className="h-6 w-6" />
                    <input id="file-upload-admin" type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <button onClick={handleSendMessage} className="bg-incubtek-orange text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600">
                    Envoyer
                </button>
            </div>
          </div>
        </div>
        {/* Ticket Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Détails</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-gray-500">Statut</p>
              <select 
                value={ticket.status} 
                onChange={(e) => onUpdateTicketStatus(ticket.id, e.target.value as TicketStatus)}
                className={`w-full p-2 text-sm font-bold rounded-lg border-none appearance-none text-center ${getStatusColor(ticket.status)}`}
              >
                {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Assigné à</p>
                <select
                    value={ticket.assigneeId || ''}
                    onChange={(e) => onAssignTicket(ticket.id, e.target.value)}
                    className="w-full p-2 text-sm font-semibold rounded-lg border-gray-300 appearance-none bg-gray-50"
                >
                    <option value="">Non assigné</option>
                    {assignableUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
             <div>
              <p className="font-semibold text-gray-500">Demandeur</p>
              <p className="text-gray-800">{requester.name} ({requester.email})</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Urgence</p>
              <p className="text-gray-800">{ticket.urgency}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Créé le</p>
              <p className="text-gray-800">{new Date(ticket.createdAt).toLocaleString('fr-FR')}</p>
            </div>
             <div>
              <p className="font-semibold text-gray-500">Dernière mise à jour</p>
              <p className="text-gray-800">{new Date(ticket.updatedAt).toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetailPage;