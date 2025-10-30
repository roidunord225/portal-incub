import { Lead, Ticket, User, Notification, Attachment, Company } from '../types';

const generateId = () => `notif-${new Date().getTime()}-${Math.random()}`;

export const createLeadNotifications = (lead: Lead, allUsers: User[], clientEmailBody: string): Notification[] => {
    const notifications: Notification[] = [];
    const admins = allUsers.filter(u => u.role === 'admin');
    const adminEmails = admins.map(a => a.email);

    if (admins.length > 0) {
        // Notification for admin
        notifications.push({
            id: generateId(),
            to: admins[0].email, // Send to the first admin
            cc: adminEmails.slice(1), // CC the rest
            subject: `Nouveau Lead Commercial: ${lead.company}`,
            body: `
Un nouveau lead a été soumis par ${lead.name} (${lead.company}).

Email: ${lead.email}
Téléphone: ${lead.phone}
Besoins: ${lead.needs.join(', ')}
Description:
${lead.description}
            `,
            timestamp: new Date().toISOString(),
        });
    }

    // Confirmation for the client
    notifications.push({
        id: generateId(),
        to: lead.email,
        subject: `Confirmation de votre demande de devis - Incubtek`,
        body: clientEmailBody,
        timestamp: new Date().toISOString(),
    });

    return notifications;
};

export const createNewTicketNotifications = (ticket: Ticket, allUsers: User[], companies: Company[]): Notification[] => {
    const notifications: Notification[] = [];
    const admins = allUsers.filter(u => u.role === 'admin');
    const adminEmails = admins.map(a => a.email);
    const requester = allUsers.find(u => u.id === ticket.requesterId);
    const assignee = allUsers.find(u => u.id === ticket.assigneeId);
    const company = companies.find(c => c.id === ticket.companyId);

    // Notification for the assigned support member
    if (assignee) {
        notifications.push({
            id: generateId(),
            to: assignee.email,
            cc: adminEmails,
            subject: `[Ticket #${ticket.id.slice(0,6)}] Nouveau Ticket Assigné: ${ticket.title}`,
            body: `
Bonjour ${assignee.name},

Un nouveau ticket vous a été assigné et requiert votre attention.

**Détails du Ticket :**
- **ID du Ticket :** #${ticket.id.slice(0, 6)}
- **Sujet :** ${ticket.title}
- **Type :** ${ticket.type}
- **Urgence :** ${ticket.urgency}
- **Créé le :** ${new Date(ticket.createdAt).toLocaleString('fr-FR')}

**Informations du Client :**
- **Nom :** ${requester?.name || 'Inconnu'}
- **Société :** ${company?.name || 'Inconnue'}
- **Email :** ${requester?.email}

**Description initiale :**
---
${ticket.description}
---

Vous pouvez consulter et répondre à ce ticket directement depuis votre tableau de bord de support.
            `,
            timestamp: new Date().toISOString(),
        });
    }

    // Confirmation for the client
    if (requester) {
        notifications.push({
            id: generateId(),
            to: requester.email,
            subject: `[Ticket #${ticket.id.slice(0,6)}] Votre demande a été reçue`,
            body: `
Bonjour ${requester.name},

Nous avons bien reçu votre demande et l'avons enregistrée sous le numéro de ticket #${ticket.id.slice(0,6)}.

Sujet: ${ticket.title}

Un technicien (${assignee?.name || 'un membre de notre équipe'}) a été assigné et reviendra vers vous dès que possible.

Cordialement,
L'équipe Incubtek
            `,
            timestamp: new Date().toISOString(),
        });
    }
    
    return notifications;
}

export const createTicketReplyNotification = (ticket: Ticket, message: { author: string; content: string; timestamp: string; attachment?: Attachment }, allUsers: User[]): Notification[] => {
    const requester = allUsers.find(u => u.id === ticket.requesterId);

    if (!requester) return [];
    
    return [{
        id: generateId(),
        to: requester.email,
        subject: `Re: [Ticket #${ticket.id.slice(0,6)}] ${ticket.title}`,
        body: `
Bonjour ${requester.name},

${message.author} a répondu à votre ticket :

---
${message.content}
${message.attachment ? `\nPièce jointe: ${message.attachment.fileName}` : ''}
---

Vous pouvez répondre à ce mail pour ajouter un commentaire.

Cordialement,
L'équipe Incubtek
        `,
        timestamp: new Date().toISOString(),
    }];
};