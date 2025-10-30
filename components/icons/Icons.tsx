import React from 'react';

// Using a generic SVG props type for all icons
type IconProps = React.SVGProps<SVGSVGElement>;

const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({ children, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    {children}
  </svg>
);

export const RocketIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></IconWrapper>
);

export const CogIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></IconWrapper>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6-4a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>
);

export const CloudIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.09A5.002 5.002 0 003 15z" /></IconWrapper>
);

export const ServerIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></IconWrapper>
);

export const WifiIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a8.967 8.967 0 0111.424 0M6.343 13.093a6.364 6.364 0 019.009 0m-4.5-4.5a.75.75 0 011.06 0" /></IconWrapper>
);

export const ComputerDesktopIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v.007a.375.375 0 01-.375.375H6.375a.375.375 0 01-.375-.375v-.007H5.25a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v8.25a.75.75 0 01-.75.75h-.75v.007a.375.375 0 01-.375.375h-2.25a.375.375 0 01-.375-.375v-.007m-7.5-6.75h7.5" /></IconWrapper>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></IconWrapper>
);

export const PlusCircleIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></IconWrapper>
);

export const DocumentTextIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></IconWrapper>
);

export const LightBulbIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m-7-7H4m16 0h-1m-1.636-5.636L16.95 5.05m-11.8 11.8l-1.414 1.414M12 6a6 6 0 100 12a6 6 0 000-12z" /></IconWrapper>
);

export const BuildingOfficeIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></IconWrapper>
);

export const PaperClipIcon: React.FC<IconProps> = (props) => (
    <IconWrapper {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.008-.008l-.008.008-2.25-2.25.008-.008 2.25-2.25" />
    </IconWrapper>
);

export const XMarkIcon: React.FC<IconProps> = (props) => (
    <IconWrapper {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </IconWrapper>
);