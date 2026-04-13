import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2 } from "lucide-react";

const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", title: "Notre Salle", category: "Ambiance" },
  { id: 2, url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", title: "Thieboudienne", category: "Plats" },
  { id: 3, url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", title: "Décoration", category: "Ambiance" },
  { id: 4, url: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=800", title: "Poulet Yassa", category: "Plats" },
  { id: 5, url: "https://images.unsplash.com/photo-1550966842-2862ba996344?auto=format&fit=crop&q=80&w=800", title: "En Cuisine", category: "Service" },
  { id: 6, url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", title: "Grillades", category: "Plats" },
  { id: 7, url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800", title: "Desserts", category: "Plats" },
  { id: 8, url: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800", title: "Cocktails", category: "Boissons" },
  { id: 9, url: "https://images.unsplash.com/photo-1542766606-04144ee3ec44?auto=format&fit=crop&q=80&w=800", title: "Jus de Bouye", category: "Boissons" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Galerie Photos</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Plongez dans l'univers de NooKo Beugué à travers nos photos. Découvrez nos plats, notre équipe et l'ambiance chaleureuse de notre restaurant.
          </p>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6">
                <Maximize2 size={32} className="mb-2" />
                <h3 className="text-xl font-bold">{image.title}</h3>
                <span className="text-sm text-gray-200">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
