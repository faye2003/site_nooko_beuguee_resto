import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Utensils, Star, Clock, MapPin, ArrowRight, Quote } from "lucide-react";

const specialties = [
  {
    name: "Thieboudienne Royal",
    description: "Le plat national sénégalais revisité avec des produits d'exception.",
    price: "12,500 FCFA",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Yassa au Poulet",
    description: "Poulet mariné au citron et oignons caramélisés, servi avec riz blanc.",
    price: "8,500 FCFA",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Grillades NooKo",
    description: "Assortiment de viandes grillées au feu de bois, marinade secrète.",
    price: "15,000 FCFA",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
  },
];

const reviews = [
  {
    name: "Fatou Diop",
    text: "Une expérience incroyable ! Le Thieboudienne est le meilleur que j'ai mangé à Dakar. L'ambiance est chaleureuse et le service impeccable.",
    rating: 5,
  },
  {
    name: "Marc Lefebvre",
    text: "Magnifique restaurant. Les saveurs sont authentiques et la présentation des plats est digne d'un grand chef. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Awa Ndiaye",
    text: "Le cadre est parfait pour un dîner en amoureux ou en famille. Les grillades sont à tomber par terre !",
    rating: 4,
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920"
            alt="Restaurant Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              NooKo <span className="text-orange-500">Beugué</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light italic">
              "Saveurs authentiques dans une ambiance élégante"
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/menu"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                Voir le menu
              </Link>
              <Link
                to="/reservation"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                Réserver une table
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <div className="w-px h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* Presentation Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-wider">
              Notre Histoire
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              L'art de la cuisine <br /> traditionnelle revisitée
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Chez NooKo Beugué, nous croyons que la cuisine est un langage universel. Notre chef passionné sélectionne les meilleurs produits locaux pour créer des plats qui racontent une histoire, celle de nos racines et de notre terroir.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Que vous veniez pour un déjeuner d'affaires ou un dîner romantique, notre équipe s'engage à vous offrir un service d'exception dans un cadre raffiné et accueillant.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all"
            >
              En savoir plus sur nous <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600"
              alt="Restaurant Interior"
              className="rounded-2xl shadow-xl mt-12"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1550966842-2862ba996344?auto=format&fit=crop&q=80&w=600"
              alt="Chef Cooking"
              className="rounded-2xl shadow-xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Nos Spécialités</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Découvrez les plats qui font la renommée de NooKo Beugué. Une explosion de saveurs authentiques préparées avec amour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-orange-600 font-bold">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <button className="w-full py-3 border border-gray-100 rounded-xl text-sm font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                    Commander
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all"
            >
              Voir tout le menu
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 text-gray-50 -translate-x-1/4 -translate-y-1/4">
          <Quote size={400} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} className="fill-orange-500 text-orange-500" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-3xl space-y-6"
              >
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-gray-900">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl font-bold">Où nous trouver ?</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-2xl text-orange-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Adresse</h3>
                  <p className="text-gray-400">123 Avenue des Saveurs, Dakar, Sénégal</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-2xl text-orange-500">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Horaires</h3>
                  <p className="text-gray-400">Lun - Jeu: 12:00 - 23:00</p>
                  <p className="text-gray-400">Ven - Sam: 12:00 - 00:00</p>
                  <p className="text-gray-400">Dim: 11:00 - 22:00</p>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-block bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all"
            >
              Nous contacter
            </Link>
          </div>

          <div className="h-[400px] rounded-3xl overflow-hidden bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center space-y-4">
                <MapPin size={48} className="mx-auto opacity-20" />
                <p>Carte Google Maps Interactive</p>
              </div>
            </div>
            {/* Placeholder for real map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.21323456789!2d-17.44!3d14.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzAwLjAiTiAxN8KwMjYnMjQuMCJX!5e0!3m2!1sen!2ssn!4v1234567890"
              className="w-full h-full border-0 grayscale opacity-50 contrast-125"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
