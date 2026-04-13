import React, { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  doc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Utensils, 
  Calendar, 
  MessageSquare, 
  LogOut, 
  LogIn, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  ChevronRight,
  Search,
  Filter,
  Loader2,
  AlertCircle
} from "lucide-react";
import { db, auth } from "@/src/firebase";
import { useAuth } from "@/src/context/AuthContext";
import { cn } from "@/src/lib/utils";

type Tab = "dashboard" | "reservations" | "menu" | "messages";

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [reservations, setReservations] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Plats principaux", description: "" });

  useEffect(() => {
    if (!isAdmin) return;

    const qRes = query(collection(db, "reservations"), orderBy("createdAt", "desc"));
    const unsubRes = onSnapshot(qRes, (snap) => {
      setReservations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qMenu = query(collection(db, "menuItems"), orderBy("createdAt", "desc"));
    const unsubMenu = onSnapshot(qMenu, (snap) => {
      setMenuItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qMsg = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMsg = onSnapshot(qMsg, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubRes();
      unsubMenu();
      unsubMsg();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = () => signOut(auth);

  const updateReservationStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "reservations", id), { status });
  };

  const deleteItem = async (coll: string, id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      await deleteDoc(doc(db, coll, id));
    }
  };

  const addMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "menuItems"), {
      ...newItem,
      price: Number(newItem.price),
      isAvailable: true,
      createdAt: serverTimestamp(),
    });
    setIsAddingItem(false);
    setNewItem({ name: "", price: "", category: "Plats principaux", description: "" });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-600" size={48} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl text-center space-y-8">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto">
            <LayoutDashboard size={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-500">
              Accès réservé au personnel autorisé. Veuillez vous connecter pour continuer.
            </p>
          </div>
          {!user ? (
            <button
              onClick={handleLogin}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all"
            >
              <LogIn size={20} />
              Se connecter avec Google
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle size={18} />
                Accès refusé. Vous n'avez pas les droits d'administrateur.
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 font-bold flex items-center gap-2 mx-auto"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-600 text-white rounded-lg">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-bold text-xl tracking-tighter">Admin <span className="text-orange-600">NooKo</span></span>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === "dashboard" ? "bg-orange-50 text-orange-600" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <LayoutDashboard size={18} />
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveTab("reservations")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === "reservations" ? "bg-orange-50 text-orange-600" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <Calendar size={18} />
            Réservations
            {reservations.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-auto bg-orange-600 text-white text-[10px] px-2 py-1 rounded-full">
                {reservations.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === "menu" ? "bg-orange-50 text-orange-600" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <Utensils size={18} />
            Menu
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
              activeTab === "messages" ? "bg-orange-50 text-orange-600" : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <MessageSquare size={18} />
            Messages
          </button>
        </nav>

        <div className="p-6 border-t border-gray-50">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-700">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Administrateur</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 p-12">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <header>
                <h1 className="text-4xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500">Bienvenue, voici un aperçu de l'activité récente.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{reservations.length}</p>
                    <p className="text-sm text-gray-500 font-medium">Réservations totales</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                    <Utensils size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{menuItems.length}</p>
                    <p className="text-sm text-gray-500 font-medium">Plats au menu</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{messages.length}</p>
                    <p className="text-sm text-gray-500 font-medium">Messages reçus</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Réservations récentes</h2>
                    <button onClick={() => setActiveTab("reservations")} className="text-orange-600 text-sm font-bold hover:underline">Voir tout</button>
                  </div>
                  <div className="space-y-4">
                    {reservations.slice(0, 5).map((res) => (
                      <div key={res.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-gray-900">
                            {res.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{res.name}</p>
                            <p className="text-xs text-gray-500">{res.date} à {res.time}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                          res.status === 'pending' ? "bg-orange-100 text-orange-600" : 
                          res.status === 'confirmed' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        )}>
                          {res.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Derniers messages</h2>
                    <button onClick={() => setActiveTab("messages")} className="text-orange-600 text-sm font-bold hover:underline">Voir tout</button>
                  </div>
                  <div className="space-y-4">
                    {messages.slice(0, 5).map((msg) => (
                      <div key={msg.id} className="p-4 bg-gray-50 rounded-2xl space-y-2">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-gray-900">{msg.name}</p>
                          <p className="text-[10px] text-gray-400">{new Date(msg.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "reservations" && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <header className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Réservations</h1>
                  <p className="text-gray-500">Gérez les demandes de réservation de vos clients.</p>
                </div>
              </header>

              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                        <th className="px-8 py-6">Client</th>
                        <th className="px-8 py-6">Date & Heure</th>
                        <th className="px-8 py-6">Personnes</th>
                        <th className="px-8 py-6">Statut</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-bold">
                                {res.name[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{res.name}</p>
                                <p className="text-xs text-gray-400">{res.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-medium text-gray-900">{res.date}</p>
                            <p className="text-xs text-gray-400">{res.time}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold text-gray-900">{res.guests}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                              res.status === 'pending' ? "bg-orange-100 text-orange-600" : 
                              res.status === 'confirmed' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            )}>
                              {res.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {res.status === 'pending' && (
                                <button
                                  onClick={() => updateReservationStatus(res.id, 'confirmed')}
                                  className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                                  title="Confirmer"
                                >
                                  <Check size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => deleteItem('reservations', res.id)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                title="Supprimer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <header className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Menu</h1>
                  <p className="text-gray-500">Ajoutez ou modifiez les plats de votre carte.</p>
                </div>
                <button
                  onClick={() => setIsAddingItem(true)}
                  className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all"
                >
                  <Plus size={20} />
                  Ajouter un plat
                </button>
              </header>

              {isAddingItem && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-orange-100 shadow-xl"
                >
                  <form onSubmit={addMenuItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nom du plat</label>
                      <input
                        required
                        value={newItem.name}
                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prix (FCFA)</label>
                      <input
                        required
                        type="number"
                        value={newItem.price}
                        onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Catégorie</label>
                      <select
                        value={newItem.category}
                        onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all"
                      >
                        <option>Entrées</option>
                        <option>Plats principaux</option>
                        <option>Grillades</option>
                        <option>Boissons</option>
                        <option>Desserts</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                      <input
                        value={newItem.description}
                        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setIsAddingItem(false)}
                        className="px-6 py-3 text-gray-500 font-bold hover:text-gray-900"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all"
                      >
                        Enregistrer le plat
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{item.category}</span>
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => deleteItem('menuItems', item.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="font-bold text-gray-900">{item.price} FCFA</span>
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        item.isAvailable ? "bg-green-500" : "bg-red-500"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <header>
                <h1 className="text-4xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-500">Consultez les messages envoyés par vos clients.</p>
              </header>

              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex gap-8 group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 shrink-0">
                      <MessageSquare size={24} />
                    </div>
                    <div className="flex-grow space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{msg.name}</h3>
                          <p className="text-xs text-gray-400">{msg.email} • {msg.phone || 'Pas de téléphone'}</p>
                        </div>
                        <button
                          onClick={() => deleteItem('messages', msg.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{msg.message}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        Reçu le {new Date(msg.createdAt?.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
