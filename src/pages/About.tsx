import { motion } from "motion/react";
import { Heart, Target, Eye, Users, Award, ShieldCheck } from "lucide-react";

const values = [
  { icon: Heart, title: "Passion", text: "Chaque plat est préparé avec amour et dévouement." },
  { icon: ShieldCheck, title: "Qualité", text: "Nous sélectionnons rigoureusement nos produits locaux." },
  { icon: Users, title: "Accueil", text: "L'hospitalité sénégalaise est au cœur de notre service." },
  { icon: Award, title: "Excellence", text: "Nous visons l'excellence dans chaque détail." },
];

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tighter">
              L'histoire de <br />
              <span className="text-orange-600">NooKo Beugué</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Fondé en 2015, NooKo Beugué est né d'une volonté simple : partager la richesse de la gastronomie sénégalaise dans un cadre moderne et élégant. Le nom "NooKo Beugué" signifie "Comme vous l'aimez" en Wolof, reflétant notre engagement à satisfaire chaque client.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ce qui n'était au départ qu'un petit restaurant familial est devenu une référence culinaire à Dakar, attirant des gourmets du monde entier en quête d'authenticité et de raffinement.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
              alt="Restaurant History"
              className="rounded-[3rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-orange-600 text-white p-12 rounded-[2rem] shadow-xl hidden md:block">
              <span className="text-5xl font-bold block mb-2">10+</span>
              <span className="text-sm font-medium uppercase tracking-widest">Années d'expérience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[2.5rem] shadow-sm space-y-6"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Offrir une expérience culinaire inoubliable en alliant les saveurs traditionnelles du Sénégal à des techniques de cuisine modernes, tout en soutenant les producteurs locaux.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-[2.5rem] shadow-sm space-y-6"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Notre Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Devenir l'ambassadeur mondial de la cuisine sénégalaise, reconnue pour sa finesse, sa générosité et son hospitalité légendaire (Teranga).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4 p-8 rounded-3xl hover:bg-orange-50 transition-colors"
              >
                <div className="w-16 h-16 bg-white shadow-md text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
                  <val.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{val.title}</h3>
                <p className="text-gray-500 text-sm">{val.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
