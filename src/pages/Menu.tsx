import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, Coffee, Pizza, IceCream, Beer } from "lucide-react";

const categories = [
  { id: "all", name: "Tout", icon: Utensils },
  { id: "Entrées", name: "Entrées", icon: Coffee },
  { id: "Plats principaux", name: "Plats", icon: Pizza },
  { id: "Grillades", name: "Grillades", icon: Utensils },
  { id: "Desserts", name: "Desserts", icon: IceCream },
  { id: "Boissons", name: "Boissons", icon: Beer },
];

const menuItems = [
  {
    id: 1,
    name: "Pastels à la Viande",
    description: "Petits chaussons frits farcis à la viande hachée épicée.",
    price: "3,500 FCFA",
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce7c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Accras de Morue",
    description: "Beignets de morue croustillants servis avec une sauce pimentée.",
    price: "4,000 FCFA",
    category: "Entrées",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Thieboudienne Royal",
    description: "Riz rouge au poisson, légumes frais et épices traditionnelles.",
    price: "12,500 FCFA",
    category: "Plats principaux",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Dibi Agneau",
    description: "Agneau grillé au feu de bois, servi avec oignons et moutarde.",
    price: "14,000 FCFA",
    category: "Grillades",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    name: "Poulet Yassa",
    description: "Poulet mariné au citron, oignons et olives, servi avec riz.",
    price: "8,500 FCFA",
    category: "Plats principaux",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    name: "Thiéboudienne Blanc",
    description: "Riz blanc au poisson, sauce onctueuse et légumes.",
    price: "11,000 FCFA",
    category: "Plats principaux",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 7,
    name: "Thiakry",
    description: "Dessert à base de mil et de lait caillé onctueux.",
    price: "3,000 FCFA",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 8,
    name: "Bissap Rouge",
    description: "Infusion de fleurs d'hibiscus, menthe et sucre.",
    price: "1,500 FCFA",
    category: "Boissons",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 9,
    name: "Bouye",
    description: "Jus de fruit de baobab onctueux et riche en vitamines.",
    price: "1,500 FCFA",
    category: "Boissons",
    image: "https://images.unsplash.com/photo-1542766606-04144ee3ec44?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900"
          >
            Notre Menu
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Découvrez une sélection de plats authentiques, préparés avec des ingrédients frais et une passion pour la gastronomie sénégalaise.
          </p>
        </header>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-orange-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <cat.icon size={18} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.name}</h3>
                    <span className="text-orange-600 font-bold shrink-0">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <button className="w-full py-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-900 hover:bg-orange-600 hover:text-white transition-all">
                    Détails du plat
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
