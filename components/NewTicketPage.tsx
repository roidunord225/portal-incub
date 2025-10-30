import React, { useState } from 'react';
import { User, Contract, TicketType, TicketUrgency } from '../types';

interface NewTicketPageProps {
  user: User;
  contracts: Contract[];
  onBack: () => void;
  onAddNewTicket: (ticketData: {
    type: TicketType;
    title: string;
    description: string;
    urgency: TicketUrgency;
    requesterId: string;
    companyId: string;
    serviceId?: string;
  }) => void;
}

const NewTicketPage: React.FC<NewTicketPageProps> = ({ user, contracts, onBack, onAddNewTicket }) => {
  const [ticketType, setTicketType] = useState<TicketType>('Incident');
  const [subject, setSubject] = useState('');
  const [service, setService] = useState(contracts.length > 0 ? contracts[0].id : '');
  const [urgency, setUrgency] = useState<TicketUrgency>('Moyenne');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    setLoading(true);
    const newTicketData = {
        type: ticketType,
        title: subject,
        serviceId: service !== 'autre' ? service : undefined,
        urgency,
        description,
        requesterId: user.id,
        companyId: user.companyId,
    };
    // Simulate API call
    setTimeout(() => {
        onAddNewTicket(newTicketData);
        setLoading(false);
        setSuccess(true);
    }, 1500);
  };
  
  if (success) {
      return (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket envoyé !</h2>
              <p className="text-gray-600 mb-6">Votre {ticketType.toLowerCase()} a bien été enregistré. Notre équipe va le prendre en charge dans les plus brefs délais.</p>
              <button
                  onClick={onBack}
                  className="mt-8 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                  Retour au tableau de bord
              </button>
          </div>
      );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Créer un nouveau ticket</h1>
        <p className="text-lg text-gray-600 mt-2">Décrivez votre besoin et nous nous en occupons.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Type de ticket</h3>
            <div className="flex space-x-4">
                <button type="button" onClick={() => setTicketType('Incident')} className={`w-full p-4 rounded-lg font-bold text-center transition ${ticketType === 'Incident' ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    <i className="fas fa-exclamation-triangle mr-2"></i> Incident
                </button>
                <button type="button" onClick={() => setTicketType('Demande')} className={`w-full p-4 rounded-lg font-bold text-center transition ${ticketType === 'Demande' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    <i className="fas fa-plus-circle mr-2"></i> Demande
                </button>
            </div>
        </div>

        <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="p-3 border rounded-lg w-full" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service concerné</label>
                <select id="service" value={service} onChange={(e) => setService(e.target.value)} className="p-3 border rounded-lg w-full bg-white">
                    {contracts.map(c => <option key={c.id} value={c.id}>{c.serviceName}</option>)}
                     <option value="autre">Autre</option>
                </select>
            </div>
             {ticketType === 'Incident' && (
                <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">Urgence</label>
                    <select id="urgency" value={urgency} onChange={(e) => setUrgency(e.target.value as any)} className="p-3 border rounded-lg w-full bg-white">
                        <option value="Faible">Faible</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Haute">Haute</option>
                    </select>
                </div>
            )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea id="description" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-lg w-full" placeholder={`Décrivez votre ${ticketType === 'Incident' ? 'problème' : 'demande'} en détail...`} required></textarea>
        </div>

        <div>
            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">Pièce jointe</label>
            <input type="file" id="attachment" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>


        <div className="flex justify-between items-center pt-4">
            <button type="button" onClick={onBack} className="text-gray-600 font-semibold hover:text-gray-800">Annuler</button>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center">
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                    </>
                ) : 'Envoyer le ticket'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicketPage;