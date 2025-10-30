import type { FC, SVGProps } from 'react';

export enum View {
  Home = 'Home',
  Login = 'Login',
  Dashboard = 'Dashboard',
  AdminDashboard = 'AdminDashboard',
  SupportDashboard = 'SupportDashboard',
  ServicesDemarrage = 'ServicesDemarrage',
  ServicesGestion = 'ServicesGestion',
  QuoteForm = 'QuoteForm',
  NewTicket = 'NewTicket',
  AdminLeads = 'AdminLeads',
  AdminHelpdesk = 'AdminHelpdesk',
  AdminClients = 'AdminClients',
  AdminTicketDetail = 'AdminTicketDetail',
  ClientTicketDetail = 'ClientTicketDetail',
}

export interface Service {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  category: 'Démarrage' | 'Gestion';
}

export type LeadStatus = 'Nouveau' | 'Contacté' | 'Converti' | 'Perdu';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  needs: string[];
  description: string;
  createdAt: string; // ISO date string
  status: LeadStatus;
  activity?: {
    author: string;
    note: string;
    timestamp: string;
  }[];
}

export interface User {
  id:string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'support';
  companyId: string;
  password?: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Contract {
  id: string;
  companyId: string;
  serviceName: string;
  details: string;
  expires: string; // ISO date string
}

export type TicketStatus = 'Nouveau' | 'En cours' | 'En attente' | 'Résolu' | 'Fermé';
export type TicketUrgency = 'Faible' | 'Moyenne' | 'Haute';
export type TicketType = 'Incident' | 'Demande';

export interface Attachment {
  fileName: string;
  url: string; // For simulation, will be a data URL or '#'
}

export interface Ticket {
  id: string;
  type: TicketType;
  title: string;
  description: string;
  status: TicketStatus;
  urgency: TicketUrgency;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  requesterId: string; // user id
  companyId: string;
  serviceId?: string; // contract id
  assigneeId?: string; // support user id
  messages: {
    author: string;
    content: string;
    timestamp: string;
    attachment?: Attachment;
  }[];
}

export interface Document {
  id: string;
  companyId: string;
  fileName: string;
  url: string;
}

export interface Notification {
    id: string;
    to: string;
    cc?: string[];
    subject: string;
    body: string;
    timestamp: string;
}