import React, { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { NEEDS_OPTIONS } from '../constants';
import { generateConfirmationEmail } from '../services/geminiService';

interface QuoteFormProps {
  onBack: () => void;
  preselectedNeed?: string;
  onAddNewLead: (lead: Lead) => Promise<void>;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onBack, preselectedNeed, onAddNewLead }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    description: '',
  });
  const [selectedNeeds, setSelectedNeeds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedNeed) {
      const matchingNeed = NEEDS_OPTIONS.find(option => preselectedNeed.includes(option.split(' ')[0]));
      if (matchingNeed) {
        setSelectedNeeds(new Set([matchingNeed]));
      } else {
        setFormData(prev => ({ ...prev, description: `Intéressé par : ${preselectedNeed}\n` }));
      }
    }
  }, [preselectedNeed]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setSelectedNeeds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || selectedNeeds.size === 0) {
      setError('Veuillez remplir les champs obligatoires (Nom, Email) et sélectionner au moins un besoin.');
      return;
    }
    setError('');
    setLoading(true);

    const leadData: Lead = {
      id: `lead-${new Date().getTime()}`,
      status: 'Nouveau',
      createdAt: new Date().toISOString(),
      ...formData,
      needs: Array.from(selectedNeeds),
    };

    try {
      await onAddNewLead(leadData);
      setIsSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue lors de la soumission. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <i className="fas fa-check-circle text-5xl text-incubtek-green mb-4"></i>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Demande envoyée !</h2>
        <p className="text-gray-600 mb-6">Merci pour votre confiance. Nous avons bien reçu votre demande et nous vous contacterons très prochainement. Un email de confirmation vous a été envoyé.</p>
        <button
          onClick={onBack}
          className="mt-8 bg-incubtek-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Demander un Devis</h1>
        <p className="text-lg text-gray-600 mt-2">Dites-nous en plus sur votre projet, nous vous répondrons rapidement.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Vos Informations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Votre nom complet *" value={formData.name} onChange={handleInputChange} className="p-3 border rounded-lg w-full" required />
            <input type="text" name="company" placeholder="Nom de votre société" value={formData.company} onChange={handleInputChange} className="p-3 border rounded-lg w-full" />
            <input type="email" name="email" placeholder="Votre email *" value={formData.email} onChange={handleInputChange} className="p-3 border rounded-lg w-full" required />
            <input type="tel" name="phone" placeholder="Votre téléphone" value={formData.phone} onChange={handleInputChange} className="p-3 border rounded-lg w-full" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Votre Besoin *</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NEEDS_OPTIONS.map((option) => (
              <label key={option} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedNeeds.has(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="h-5 w-5 rounded text-incubtek-orange focus:ring-orange-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Description de votre projet</h3>
          <textarea
            name="description"
            rows={5}
            placeholder="Donnez-nous plus de détails sur votre demande..."
            value={formData.description}
            onChange={handleInputChange}
            className="p-3 border rounded-lg w-full"
          ></textarea>
        </div>

        {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}

        <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onBack}
              className="text-gray-600 font-semibold hover:text-gray-800"
            >
              Annuler
            </button>
            <button
                type="submit"
                disabled={loading}
                className="bg-incubtek-orange text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                    </>
                ) : (
                    'Envoyer ma demande'
                )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;