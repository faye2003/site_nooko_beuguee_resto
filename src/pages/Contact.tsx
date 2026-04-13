import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/firebase";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Une question ? Une suggestion ? N'hésitez pas à nous contacter via le formulaire ci-dessous ou par nos réseaux sociaux.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-[2rem] space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">Nos Coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl text-orange-600 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Adresse</h3>
                    <p className="text-gray-500 text-sm">123 Avenue des Saveurs, Dakar, Sénégal</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl text-orange-600 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Téléphone</h3>
                    <p className="text-gray-500 text-sm">+221 33 000 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl text-green-600 shadow-sm">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-500 text-sm">+221 77 000 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-500 text-sm">contact@nookobeugue.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.21323456789!2d-17.44!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzAwLjAiTiAxN8KwMjYnMjQuMCJX!5e0!3m2!1sen!2ssn!4v1234567890"
                className="w-full h-full border-0 grayscale"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 p-12 rounded-[2rem] shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nom complet</label>
                    <input
                      {...register("name")}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <input
                      {...register("email")}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Téléphone (optionnel)</label>
                  <input
                    {...register("phone")}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all"
                    placeholder="+221 77 000 00 00"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea
                    {...register("message")}
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 size={24} />
                      Message envoyé !
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
