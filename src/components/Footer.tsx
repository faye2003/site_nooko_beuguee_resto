import { Link } from "react-router-dom";
import { UtensilsCrossed, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-600 text-white">
              <UtensilsCrossed size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              NooKo <span className="text-orange-500">Beugué</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Une expérience culinaire authentique au cœur de la ville. Nous vous accueillons dans une ambiance chaleureuse pour savourer nos spécialités maison.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Liens Rapides</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link></li>
            <li><Link to="/menu" className="hover:text-orange-500 transition-colors">Notre Menu</Link></li>
            <li><Link to="/reservation" className="hover:text-orange-500 transition-colors">Réservation</Link></li>
            <li><Link to="/gallery" className="hover:text-orange-500 transition-colors">Galerie Photos</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition-colors">À Propos</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-500 shrink-0" />
              <span>123 Avenue des Saveurs, Dakar, Sénégal</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500 shrink-0" />
              <span>+221 33 000 00 00</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500 shrink-0" />
              <span>contact@nookobeugue.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Horaires</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span>Lundi - Jeudi</span>
              <span className="text-white">12:00 - 23:00</span>
            </li>
            <li className="flex justify-between">
              <span>Vendredi - Samedi</span>
              <span className="text-white">12:00 - 00:00</span>
            </li>
            <li className="flex justify-between">
              <span>Dimanche</span>
              <span className="text-white">11:00 - 22:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} NooKo Beugué. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
