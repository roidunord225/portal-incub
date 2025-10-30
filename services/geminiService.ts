import { GoogleGenAI } from "@google/genai";
import type { Lead } from '../types';

// Fix: Use process.env.API_KEY directly as per Gemini API guidelines.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateConfirmationEmail = async (lead: Lead): Promise<string> => {
  try {
    const prompt = `
      Vous êtes un assistant virtuel pour Incubtek, une société de services informatiques.
      Un nouveau prospect vient de remplir un formulaire de demande de devis.
      
      Voici ses informations :
      - Nom : ${lead.name}
      - Société : ${lead.company}
      - Besoins exprimés : ${lead.needs.join(', ')}
      - Description complémentaire : "${lead.description}"

      Rédigez un email de confirmation amical et professionnel en FRANÇAIS à destination de ${lead.name}.
      Le ton doit être rassurant et efficace.
      Confirmez la bonne réception de sa demande.
      Mentionnez que l'équipe d'Incubtek va étudier sa demande et le recontactera très prochainement.
      Terminez par une formule de politesse chaleureuse.
      Ne mettez pas de sujet d'email (pas de "Objet:").
      Commencez directement par "Bonjour ${lead.name},"
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating confirmation email:", error);
    return "Nous avons bien reçu votre demande et nous vous contacterons sous peu. Merci de votre confiance.";
  }
};
