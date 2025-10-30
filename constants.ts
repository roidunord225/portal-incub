import type { Service } from './types';
import { RocketIcon, CogIcon, ShieldCheckIcon, CloudIcon, ServerIcon, WifiIcon, ComputerDesktopIcon, CameraIcon } from './components/icons/Icons';

export const SERVICES_DEMARRAGE: Service[] = [
  {
    icon: RocketIcon,
    title: 'Nom de Domaine & Hébergement',
    description: "Enregistrez votre identité en ligne et hébergez votre site web sur une infrastructure fiable et performante.",
    category: 'Démarrage',
  },
  {
    icon: CloudIcon,
    title: 'Microsoft 365 Business',
    description: "Équipez vos collaborateurs avec les outils de productivité essentiels : email, stockage cloud et suite Office.",
    category: 'Démarrage',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Sécurité Initiale',
    description: "Protégez votre nouvelle entreprise contre les menaces de base avec nos solutions de sécurité managées.",
    category: 'Démarrage',
  },
  {
    icon: WifiIcon,
    title: 'Installation de Réseau et Wi-Fi',
    description: 'Nous concevons et déployons une infrastructure réseau filaire et Wi-Fi performante et sécurisée pour vos nouveaux locaux.',
    category: 'Démarrage',
  },
  {
    icon: ComputerDesktopIcon,
    title: 'Fourniture de PC et Serveurs',
    description: "Acquérez du matériel informatique professionnel, pré-configuré et prêt à l'emploi pour vos équipes.",
    category: 'Démarrage',
  },
  {
    icon: CameraIcon,
    title: "Sécurité (Vidéosurveillance, Contrôle d'Accès)",
    description: "Protégez vos locaux avec nos systèmes de caméras de surveillance et de contrôle d'accès modernes.",
    category: 'Démarrage',
  },
];

export const SERVICES_GESTION: Service[] = [
  {
    icon: CogIcon,
    title: 'Infogérance & Support IT',
    description: "Déléguez la gestion de votre parc informatique à nos experts et bénéficiez d'un support réactif.",
    category: 'Gestion',
  },
  {
    icon: ServerIcon,
    title: 'Gestion de Serveurs & Cloud',
    description: "Nous assurons la maintenance, la surveillance et l'optimisation de vos serveurs, qu'ils soient sur site ou dans le cloud.",
    category: 'Gestion',
  },
  {
    icon: WifiIcon,
    title: 'Réseau & Connectivité',
    description: "Optimisez vos connexions internet, Wi-Fi et la sécurité de votre réseau pour une productivité sans faille.",
    category: 'Gestion',
  },
];

export const NEEDS_OPTIONS: string[] = [
  'Création d\'entreprise (Domaine, M365)',
  'Gestion de mon parc informatique',
  'Support pour mes utilisateurs',
  'Projet de migration Cloud',
  'Audit de sécurité',
  'Solution de sauvegarde',
  'Autre (à préciser)',
];