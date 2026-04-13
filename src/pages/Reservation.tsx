import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Users, Clock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/firebase";

const reservationSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  date: z.string().min(1, "Veuillez choisir une date"),
  time: z.string().min(1, "Veuillez choisir une heure"),
  guests: z.number().min(1, "Minimum 1 personne").max(20, "Maximum 20 personnes"),
  message: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

export default function Reservation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
    },
  });

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "reservations"), {
        ...data,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Error saving reservation:", err);
      setError("Une erreur est survenue lors de l'envoi de votre réservation. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          {/* Info Sidebar */}
          <div className="lg:col-span-2 bg-orange-600 p-12 text-white space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">Réserver une table</h1>
              <p className="text-orange-100">
                Réservez votre table en quelques clics et assurez-vous de passer un moment inoubliable avec nous.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Disponibilité</h3>
                  <p className="text-sm text-orange-100">Réservation possible 24h à l'avance.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Groupes</h3>
                  <p className="text-sm text-orange-100">Pour plus de 20 personnes, contactez-nous directement.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Confirmation</h3>
                  <p className="text-sm text-orange-100">Vous recevrez une confirmation par téléphone.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-3 p-12">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Réservation Envoyée !</h2>
                    <p className="text-gray-500">
                      Votre demande a été enregistrée avec succès. Notre équipe vous contactera très prochainement pour confirmer votre table.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Faire une autre réservation
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm">
                      <AlertCircle size={18} />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Nom complet</label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="Jean Dupont"
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Téléphone</label>
                      <input
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        placeholder="+221 77 000 00 00"
                      />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email (optionnel)</label>
                    <input
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      placeholder="jean@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Date</label>
                      <input
                        type="date"
                        {...register("date")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      />
                      {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Heure</label>
                      <select
                        {...register("time")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      >
                        <option value="">Choisir...</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                        <option value="21:00">21:00</option>
                      </select>
                      {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Personnes</label>
                      <input
                        type="number"
                        {...register("guests", { valueAsNumber: true })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      />
                      {errors.guests && <p className="text-xs text-red-500">{errors.guests.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message (optionnel)</label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                      placeholder="Une occasion particulière ? Un régime alimentaire ?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Envoi en cours...
                      </>
                    ) : (
                      "Réserver maintenant"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
