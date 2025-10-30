import React, { useState, useEffect } from 'react';
import { View, User, Lead, LeadStatus, Ticket, TicketStatus, Attachment, Company, TicketType, TicketUrgency, Notification, Contract } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ServicesPage from './components/ServicesPage';
import QuoteForm from './components/QuoteForm';
import DashboardPage from './components/DashboardPage';
import NewTicketPage from './components/NewTicketPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import SupportDashboardPage from './components/SupportDashboardPage';
import AdminLeadsPage from './components/AdminLeadsPage';
import AdminClientsPage from './components/AdminClientsPage';
import AdminHelpdeskPage from './components/AdminHelpdeskPage';
import AdminTicketDetailPage from './components/AdminTicketDetailPage';
import ClientTicketDetailPage from './components/ClientTicketDetailPage';
import NotificationManager from './components/NotificationManager';
import { SERVICES_DEMARRAGE, SERVICES_GESTION } from './constants';
import { mockContracts, mockTickets, mockDocuments, mockLeads as initialLeads, mockCompanies as initialCompanies, mockAllUsers as initialUsers, mockAllContracts as initialContracts } from './mockData';
import { createLeadNotifications, createNewTicketNotifications, createTicketReplyNotification } from './services/notificationService';
import { generateConfirmationEmail } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.Home);
  const [user, setUser] = useState<User | null>(null);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedTicketId, setSelectedTicketId] = useState<string | undefined>(undefined);
  
  // State for data that can be modified by admin actions
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [allUsers, setAllUsers] = useState<User[]>(initialUsers);
  const [allContracts, setAllContracts] = useState<Contract[]>(initialContracts);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // If user logs out, redirect to home
    if (!user && (view.includes('Dashboard') || view.includes('Admin') || view.includes('Client'))) {
      setView(View.Home);
    }
  }, [user, view]);

  const addNotifications = (newNotifications: Notification[]) => {
    setNotifications(prev => [...newNotifications, ...prev]);
  };

  const handleNavigate = (newView: View, data?: string) => {
    window.scrollTo(0, 0);
    if (newView === View.QuoteForm) {
      setSelectedService(data);
    }
    if (newView === View.AdminTicketDetail || newView === View.ClientTicketDetail) {
        setSelectedTicketId(data);
    }
    setView(newView);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'admin') {
      setView(View.AdminDashboard);
    } else if (loggedInUser.role === 'support') {
      setView(View.SupportDashboard);
    } else {
      setView(View.Dashboard);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView(View.Home);
  };

  const handleUpdateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status } : lead));
  };

  const handleAddLeadNote = (leadId: string, note: string, author: string) => {
    setLeads(prev => prev.map(lead => {
        if (lead.id === leadId) {
            const newActivity = { note, author, timestamp: new Date().toISOString() };
            const updatedActivity = lead.activity ? [newActivity, ...lead.activity] : [newActivity];
            return { ...lead, activity: updatedActivity };
        }
        return lead;
    }));
  };
  
  const handleAddNewLead = async (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
    // Generate and add notifications
    const clientEmailBody = await generateConfirmationEmail(newLead);
    const leadNotifications = createLeadNotifications(newLead, allUsers, clientEmailBody);
    addNotifications(leadNotifications);
  };

  const handleAddCompany = (companyName: string) => {
    const newCompany: Company = {
        id: `comp-${new Date().getTime()}`,
        name: companyName,
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  const handleAddUser = (companyId: string, userName: string, userEmail: string, userPassword: string) => {
      const newUser: User = {
          id: `user-${new Date().getTime()}`,
          name: userName,
          email: userEmail,
          role: 'client',
          companyId: companyId,
          password: userPassword,
      };
      setAllUsers(prev => [...prev, newUser]);
  };

  const handleUpdateUser = (userId: string, updatedData: Partial<User>) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updatedData } : u));
  };
  
  const handleAddContract = (companyId: string, serviceName: string, details: string, expires: string) => {
      const newContract: Contract = {
        id: `cont-${new Date().getTime()}`,
        companyId,
        serviceName,
        details,
        expires: new Date(expires).toISOString(),
      };
      setAllContracts(prev => [...prev, newContract]);
  };

  const handleUpdateContract = (contractId: string, updatedData: Partial<Contract>) => {
    setAllContracts(prev => prev.map(c => c.id === contractId ? { ...c, ...updatedData } : c));
  };

  const handleUpdateTicketStatus = (ticketId: string, status: TicketStatus) => {
    setTickets(prev => prev.map(ticket => ticket.id === ticketId ? { ...ticket, status, updatedAt: new Date().toISOString() } : ticket));
  };
  
  const handleAssignTicket = (ticketId: string, assigneeId: string) => {
    setTickets(prev => prev.map(ticket => ticket.id === ticketId ? { ...ticket, assigneeId: assigneeId || undefined, updatedAt: new Date().toISOString() } : ticket));
  };

  const handleAddTicketMessage = (ticketId: string, message: { author: string; content: string; timestamp: string; attachment?: Attachment; }) => {
    let updatedTicket: Ticket | undefined;
    setTickets(prev => prev.map(ticket => {
        if (ticket.id === ticketId) {
            updatedTicket = { ...ticket, status: user?.role === 'client' ? 'En cours' : ticket.status, messages: [...ticket.messages, message], updatedAt: new Date().toISOString() };
            return updatedTicket;
        }
        return ticket;
    }));

    if (updatedTicket && user && (user.role === 'admin' || user.role === 'support')) {
        const replyNotifications = createTicketReplyNotification(updatedTicket, message, allUsers);
        addNotifications(replyNotifications);
    }
  };

  const handleAddNewTicket = (ticketData: {
    type: TicketType;
    title: string;
    description: string;
    urgency: TicketUrgency;
    requesterId: string;
    companyId: string;
    serviceId?: string;
  }) => {
    const now = new Date().toISOString();
    const requesterName = allUsers.find(u => u.id === ticketData.requesterId)?.name || 'Utilisateur inconnu';

    const supportUsers = allUsers.filter(u => u.role === 'support');
    let randomAssigneeId: string | undefined = undefined;
    if (supportUsers.length > 0) {
      const randomIndex = Math.floor(Math.random() * supportUsers.length);
      randomAssigneeId = supportUsers[randomIndex].id;
    }
    
    const newTicket: Ticket = {
      id: `tick-${new Date().getTime()}`,
      status: 'Nouveau',
      createdAt: now,
      updatedAt: now,
      ...ticketData,
      assigneeId: randomAssigneeId,
      messages: [{
        author: requesterName,
        content: ticketData.description,
        timestamp: now,
      }],
    };
    setTickets(prev => [newTicket, ...prev]);
    // Generate and add notifications
    const ticketNotifications = createNewTicketNotifications(newTicket, allUsers, companies);
    addNotifications(ticketNotifications);
  };


  const renderView = () => {
    const adminStats = {
      totalClients: companies.length,
      openTickets: tickets.filter(t => t.status === 'En cours' || t.status === 'Nouveau').length,
      newLeads: leads.filter(l => l.status === 'Nouveau').length,
    };
    const assignableUsers = allUsers.filter(u => u.role === 'support' || u.role === 'admin');

    switch (view) {
      case View.Home:
        return <HomePage onNavigate={handleNavigate} />;
      case View.Login:
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} allUsers={allUsers} />;
      case View.ServicesDemarrage:
        return <ServicesPage title="Solutions de Démarrage" subtitle="Lancez votre entreprise sur des fondations technologiques solides." services={SERVICES_DEMARRAGE} onNavigate={handleNavigate} />;
      case View.ServicesGestion:
        return <ServicesPage title="Services de Gestion IT" subtitle="Optimisez et sécurisez votre infrastructure existante avec nos experts." services={SERVICES_GESTION} onNavigate={handleNavigate} />;
      case View.QuoteForm:
        return <QuoteForm onBack={() => setView(View.Home)} preselectedNeed={selectedService} onAddNewLead={handleAddNewLead} />;
      
      // Client Views
      case View.Dashboard:
        if (!user) return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} allUsers={allUsers} />;
        return <DashboardPage user={user} contracts={mockContracts} tickets={tickets.filter(t => t.companyId === user.companyId)} documents={mockDocuments} onNavigate={handleNavigate} />;
      case View.NewTicket:
        if (!user) return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} allUsers={allUsers} />;
        return <NewTicketPage user={user} contracts={mockContracts} onBack={() => setView(View.Dashboard)} onAddNewTicket={handleAddNewTicket} />;
      case View.ClientTicketDetail:
        if (!user || user.role !== 'client' || !selectedTicketId) return <HomePage onNavigate={handleNavigate} />;
        const clientTicket = tickets.find(t => t.id === selectedTicketId);
        if (!clientTicket) return <p>Ticket non trouvé</p>;
        return <ClientTicketDetailPage ticket={clientTicket} user={user} onAddMessage={handleAddTicketMessage} onBack={() => setView(View.Dashboard)} />
      
      // Admin and Support Views
      case View.AdminDashboard:
        if (!user || user.role !== 'admin') return <HomePage onNavigate={handleNavigate} />;
        return <AdminDashboardPage user={user} stats={adminStats} onNavigate={handleNavigate} />;
      case View.AdminLeads:
        if (!user || user.role !== 'admin') return <HomePage onNavigate={handleNavigate} />;
        return <AdminLeadsPage leads={leads} onUpdateLeadStatus={handleUpdateLeadStatus} onAddLeadNote={handleAddLeadNote} adminUser={user} onBack={() => setView(View.AdminDashboard)} />;
      case View.AdminClients:
        if (!user || user.role !== 'admin') return <HomePage onNavigate={handleNavigate} />;
        return <AdminClientsPage 
          companies={companies} 
          users={allUsers} 
          contracts={allContracts} 
          onAddCompany={handleAddCompany} 
          onAddUser={handleAddUser} 
          onAddContract={handleAddContract}
          onUpdateUser={handleUpdateUser}
          onUpdateContract={handleUpdateContract}
          onBack={() => setView(View.AdminDashboard)} 
        />;
      case View.AdminHelpdesk:
        if (!user || user.role !== 'admin') return <HomePage onNavigate={handleNavigate} />;
        return <AdminHelpdeskPage tickets={tickets} users={allUsers} companies={companies} onUpdateTicketStatus={handleUpdateTicketStatus} onAssignTicket={handleAssignTicket} onNavigate={handleNavigate} onBack={() => setView(View.AdminDashboard)} />;
      case View.SupportDashboard:
        if (!user || user.role !== 'support') return <HomePage onNavigate={handleNavigate} />;
        const assignedTickets = tickets.filter(t => t.assigneeId === user.id);
        return <SupportDashboardPage user={user} tickets={assignedTickets} onNavigate={handleNavigate} companies={companies} allUsers={allUsers} />;

      case View.AdminTicketDetail:
        if (!user || !['admin', 'support'].includes(user.role) || !selectedTicketId) return <HomePage onNavigate={handleNavigate} />;
        const ticket = tickets.find(t => t.id === selectedTicketId);
        const requester = allUsers.find(u => u.id === ticket?.requesterId);
        if (!ticket || !requester) return <p>Ticket non trouvé</p>;
        const onBackView = user.role === 'admin' ? View.AdminHelpdesk : View.SupportDashboard;
        return <AdminTicketDetailPage ticket={ticket} user={user} requester={requester} assignableUsers={assignableUsers} onUpdateTicketStatus={handleUpdateTicketStatus} onAssignTicket={handleAssignTicket} onAddMessage={handleAddTicketMessage} onBack={() => setView(onBackView)} />
      
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderView()}
      </main>
      <Footer />
      <NotificationManager notifications={notifications} onClear={() => setNotifications([])} />
    </div>
  );
};

export default App;