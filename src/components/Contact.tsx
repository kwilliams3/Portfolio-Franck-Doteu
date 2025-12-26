import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function Contact() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;
      
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "franckdoteu3@gmail.com", href: "mailto:franckdoteu3@gmail.com" },
    { icon: Phone, label: "Téléphone", value: "+237 655 497 331", href: "tel:+237655497331" },
    { icon: MapPin, label: "Localisation", value: "Douala, Cameroun", href: null },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-secondary/30">
      {/* Background Decoration */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Travaillons <span className="gradient-text">Ensemble</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Vous avez un projet en tête ? N'hésitez pas à me contacter !
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Informations</h3>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-foreground">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Decorative Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-premium text-primary-foreground"
            >
              <h4 className="text-lg font-bold mb-2">Disponible pour de nouveaux projets</h4>
              <p className="text-primary-foreground/80 text-sm">
                Je suis actuellement ouvert aux opportunités de freelance et de collaboration sur des projets innovants.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass border border-border/50">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@exemple.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Projet de collaboration"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-premium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                    <span className="relative z-10">Envoi en cours...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Message envoyé !</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Envoyer le message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
