import { User, Company, Contract, Ticket, Document, Lead } from './types';

export const mockCompany: Company = {
  id: 'comp-1',
  name: 'Innovatech SARL',
};

export const mockCompany2: Company = {
  id: 'comp-2',
  name: 'Solutions Avancées Inc.',
};

export const mockUser: User = {
  id: 'user-1',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  role: 'client',
  companyId: 'comp-1',
  password: 'password',
};

export const mockUser2: User = {
  id: 'user-2',
  name: 'Marie Curie',
  email: 'marie.curie@example.com',
  role: 'client',
  companyId: 'comp-2',
  password: 'password',
};


export const mockAdmin: User = {
  id: 'admin-1',
  name: 'Alice Martin',
  email: 'alice.martin@incubtek.com',
  role: 'admin',
  companyId: 'incubtek',
  password: 'password',
};

export const mockSupport1: User = {
    id: 'support-1',
    name: 'David Legrand',
    email: 'david.legrand@incubtek.com',
    role: 'support',
    companyId: 'incubtek',
    password: 'password',
};

export const mockSupport2: User = {
    id: 'support-2',
    name: 'Sophie Boyer',
    email: 'sophie.boyer@incubtek.com',
    role: 'support',
    companyId: 'incubtek',
    password: 'password',
};

export const mockContracts: Contract[] = [
  { id: 'cont-1', companyId: 'comp-1', serviceName: 'Support IT Essentiel', details: 'Support 8/5, 10 tickets/mois', expires: '2025-12-31T23:59:59Z' },
  { id: 'cont-2', companyId: 'comp-1', serviceName: 'Gestion de Serveur Cloud', details: 'Serveur AWS t3.medium', expires: '2025-08-15T23:59:59Z' },
  { id: 'cont-3', companyId: 'comp-1', serviceName: 'Microsoft 365 Business Standard', details: '15 licences', expires: '2025-10-01T23:59:59Z' },
  { id: 'cont-4', companyId: 'comp-2', serviceName: 'Infogérance Complète', details: 'Support 24/7, tickets illimités', expires: '2026-06-30T23:59:59Z' },
];

export const mockTickets: Ticket[] = [
  { 
    id: 'tick-1', 
    type: 'Incident',
    title: 'Problème d\'accès à l\'imprimante', 
    description: 'Personne au bureau marketing ne peut se connecter à l\'imprimante HP LaserJet.',
    status: 'En cours', 
    urgency: 'Moyenne', 
    createdAt: '2024-07-20T10:00:00Z',
    updatedAt: '2024-07-20T10:10:00Z',
    requesterId: 'user-1',
    companyId: 'comp-1',
    assigneeId: 'support-1',
    messages: [
        {author: 'Jean Dupont', content: 'Personne au bureau marketing ne peut se connecter à l\'imprimante HP LaserJet.', timestamp: '2024-07-20T10:00:00Z'},
        {author: 'Alice Martin', content: 'Bonjour Jean, pouvez-vous m\'envoyer une capture d\'écran du message d\'erreur s\'il vous plaît ?', timestamp: '2024-07-20T10:05:00Z'},
        {author: 'Jean Dupont', content: 'Voici la capture.', timestamp: '2024-07-20T10:10:00Z', attachment: { fileName: 'error-screenshot.png', url: '#' } }
    ]
  },
  { 
    id: 'tick-2', 
    type: 'Demande',
    title: 'Demande de création d\'un nouvel email', 
    description: 'Merci de créer un compte email pour notre nouvelle recrue, Sophie Durand (s.durand@innovatech.com).',
    status: 'Nouveau', 
    urgency: 'Faible', 
    createdAt: '2024-07-21T14:30:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    requesterId: 'user-1',
    companyId: 'comp-1',
    messages: [{author: 'Jean Dupont', content: 'Merci de créer un compte email pour notre nouvelle recrue, Sophie Durand (s.durand@innovatech.com).', timestamp: '2024-07-21T14:30:00Z'}]
  },
   {
    id: 'tick-3',
    type: 'Incident',
    title: 'Serveur de fichiers inaccessible',
    description: 'Notre serveur de fichiers partagés (\\SHARE) ne répond plus depuis ce matin.',
    status: 'Nouveau',
    urgency: 'Haute',
    createdAt: '2024-07-22T09:00:00Z',
    updatedAt: '2024-07-22T09:00:00Z',
    requesterId: 'user-2',
    companyId: 'comp-2',
    messages: [{ author: 'Marie Curie', content: 'Notre serveur de fichiers partagés (\\SHARE) ne répond plus depuis ce matin.', timestamp: '2024-07-22T09:00:00Z' }]
  },
  {
    id: 'tick-4',
    type: 'Demande',
    title: 'Devis pour 5 nouveaux ordinateurs portables',
    description: 'Nous souhaiterions recevoir un devis pour 5 ordinateurs portables Dell Latitude pour notre équipe de développeurs.',
    status: 'En attente',
    urgency: 'Faible',
    createdAt: '2024-07-19T16:00:00Z',
    updatedAt: '2024-07-19T16:00:00Z',
    requesterId: 'user-2',
    companyId: 'comp-2',
    messages: [{ author: 'Marie Curie', content: 'Nous souhaiterions recevoir un devis pour 5 ordinateurs portables Dell Latitude pour notre équipe de développeurs.', timestamp: '2024-07-19T16:00:00Z' }]
  }
];

export const mockDocuments: Document[] = [
  { id: 'doc-1', companyId: 'comp-1', fileName: 'Facture_Juillet_2024.pdf', url: '#' },
  { id: 'doc-2', companyId: 'comp-1', fileName: 'Rapport_Sécurité_T2_2024.pdf', url: '#' },
];

export const mockLeads: Lead[] = [
    { 
        id: 'lead-1', 
        name: 'Paul Bernard', 
        company: 'Startup Express', 
        email: 'paul.b@startup.com', 
        phone: '0612345678', 
        needs: ['Création d\'entreprise (Domaine, M365)'], 
        description: 'Nous lançons notre activité et avons besoin de tout mettre en place.', 
        createdAt: new Date().toISOString(), 
        status: 'Nouveau',
        activity: [
            { author: 'Système', note: 'Lead créé depuis le formulaire de devis.', timestamp: new Date().toISOString() }
        ] 
    },
    { 
        id: 'lead-2', 
        name: 'Carole Petit', 
        company: 'Design & Co', 
        email: 'carole@design.co', 
        phone: '0687654321', 
        needs: ['Gestion de mon parc informatique'], 
        description: 'Notre parc de 15 Mac a besoin d\'être géré de manière proactive.', 
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
        status: 'Contacté',
        activity: [
            { author: 'Alice Martin', note: 'Appel laissé sur messagerie. A recontacter demain.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
            { author: 'Système', note: 'Lead créé depuis le formulaire de devis.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
        ]
    },
];

export const mockAdminStats = {
    totalClients: 2,
    openTickets: mockTickets.filter(t => t.status === 'En cours' || t.status === 'Nouveau').length,
    newLeads: mockLeads.filter(l => l.status === 'Nouveau').length,
};

export const mockCompanies: Company[] = [mockCompany, mockCompany2];

export const mockAllUsers: User[] = [mockUser, mockUser2, mockAdmin, mockSupport1, mockSupport2];

export const mockAllContracts: Contract[] = [...mockContracts];