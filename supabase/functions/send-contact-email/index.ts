import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Send notification email to the portfolio owner
    const notificationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["franckdoteu3@gmail.com"],
        subject: `Nouveau message de contact: ${subject}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">Nouveau Message de Contact</h1>
            
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Sujet:</strong> ${subject}</p>
            </div>
            
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
              <h3 style="margin-top: 0; color: #334155;">Message:</h3>
              <p style="white-space: pre-wrap; color: #475569;">${message}</p>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; margin-top: 30px;">
              Ce message a été envoyé depuis le formulaire de contact de votre portfolio.
            </p>
          </div>
        `,
      }),
    });

    console.log("Notification email response:", notificationResponse.status);

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text();
      console.error("Notification email error:", errorData);
      throw new Error(`Failed to send notification email: ${errorData}`);
    }

    // Note: Confirmation email to sender is disabled in test mode
    // To enable it, verify a domain at resend.com/domains
    console.log("Contact form processed successfully for:", email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails envoyés avec succès" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
