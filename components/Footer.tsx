
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Incubtek. Tous droits réservés.</p>
        <p className="text-sm text-gray-400 mt-1">Votre partenaire de confiance pour des solutions IT innovantes.</p>
      </div>
    </footer>
  );
};

export default Footer;
