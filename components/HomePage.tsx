import React from 'react';
import { View } from '../types';

interface HomePageProps {
  onNavigate: (view: View) => void;
}

const ActionCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}> = ({ icon, title, description, buttonText, onClick }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col text-center items-center transform hover:-translate-y-2">
    <i className={`${icon} text-4xl text-incubtek-orange mb-4`}></i>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow">{description}</p>
    <button
      onClick={onClick}
      className="bg-incubtek-orange text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out w-full"
    >
      {buttonText}
    </button>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Votre infrastructure IT, <span className="text-incubtek-orange">simplifiée</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Incubtek fournit des solutions informatiques robustes et sur-mesure pour accompagner la croissance de votre entreprise, du démarrage à la maturité.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <ActionCard
          icon="fas fa-rocket"
          title="Nouveau Projet d'Entreprise"
          description="Lancez votre activité sur des bases solides avec nos packs de démarrage complets : domaine, emails professionnels et sécurité essentielle."
          buttonText="Je démarre mon entreprise"
          onClick={() => onNavigate(View.ServicesDemarrage)}
        />
        <ActionCard
          icon="fas fa-cogs"
          title="Gestion Informatique Quotidienne"
          description="Concentrez-vous sur votre cœur de métier. Nous prenons en charge la gestion, la maintenance et le support de votre parc informatique."
          buttonText="Je veux gérer mon IT"
          onClick={() => onNavigate(View.ServicesGestion)}
        />
      </div>
    </div>
  );
};

export default HomePage;