import React from 'react';
import type { Service } from '../types';
import { View } from '../types';

interface ServicesPageProps {
  title: string;
  subtitle: string;
  services: Service[];
  onNavigate: (view: View, serviceTitle?: string) => void;
}

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => {
  const Icon = service.icon;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
            <div className="bg-incubtek-orange p-3 rounded-full mr-4">
                <Icon />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
        </div>
        <p className="text-gray-600">{service.description}</p>
      </div>
      <div className="p-6 bg-gray-50">
        <button
          onClick={onClick}
          className="w-full bg-orange-100 text-orange-800 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition duration-300"
        >
          Demander un Devis
        </button>
      </div>
    </div>
  );
};


const ServicesPage: React.FC<ServicesPageProps> = ({ title, subtitle, services, onNavigate }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard 
            key={service.title} 
            service={service} 
            onClick={() => onNavigate(View.QuoteForm, service.title)} 
          />
        ))}
      </div>
       <div className="text-center mt-12">
        <button
          onClick={() => onNavigate(View.Home)}
          className="text-incubtek-orange font-semibold hover:underline"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ServicesPage;