import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import API from '../../api';

const MenuManagement = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Items');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filters = ['All Items', 'Fast Food', 'Pakistani & Desi', 'Pizza & Burgers', 'Cafe & Bakery', 'Desserts'];

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.id) {
        const res = await API.get(`/api/foods?vendor_id=${user.id}`);
        setItems(res.data || []);
      } else {
        const res = await API.get('/api/foods');
        setItems(res.data || []);
      }
    } catch (err) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const filteredItems = items
    .filter(item => activeFilter === 'All Items' || item.category === activeFilter)
    .filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = async (itemId) => {
    try {
      await API.delete(`/api/foods/${itemId}`);
      setItems(prev => prev.filter(i => i.id !== itemId));
    } catch (err) {
      alert('Failed to delete item: ' + (err.response?.data?.detail || err.message));
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleEdit = (item) => {
    navigate(`/edit-item/${item.id}`, { state: { item } });
  };

  return (
    <div className="min-h-screen pb-32">
      <Header />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-container-padding bg-on-surface/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-surface rounded-2xl shadow-xl p-lg max-w-sm w-full animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-sm">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600">delete_forever</span>
              </div>
              <h2 className="font-headline-md text-on-surface font-bold">Delete Item?</h2>
            </div>
            <p className="text-body-md text-on-surface-variant mb-lg">
              Are you sure you want to delete <strong className="text-on-surface">{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-full font-label-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 py-3 rounded-full font-label-lg bg-red-600 text-white shadow-sm hover:brightness-110 transition-all active:scale-95 cursor-pointer font-bold">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-[1920px] mx-auto px-container-padding pt-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1 font-extrabold text-2xl">Menu Management</h1>
            <p className="text-body-md text-on-surface-variant">Update, add, or organize your kitchen offerings</p>
          </div>
          <Link to="/add-item" className="bg-[#FF6B35] text-white py-3 px-6 rounded-full font-label-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all font-bold">
            <span className="material-symbols-outlined" data-icon="add">add</span>
            Add New Item
          </Link>
        </div>

        <div className="mb-lg space-y-md">
          {/* Search Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              type="text"
              placeholder="Search your menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-2xl border border-outline-variant/15 outline-none focus:border-primary font-body-md text-on-surface transition-all shadow-sm"
            />
          </div>

          {/* Categories Horizontal Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#FF6B35] text-white shadow-sm'
                    : 'bg-white border border-outline-variant/15 text-on-surface-variant hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="py-16 text-center text-gray-500">
            <div className="w-8 h-8 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs">Loading menu items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-surface rounded-2xl border border-outline-variant/15 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#FF6B35] uppercase tracking-wider">{item.category || 'General'}</span>
                      <h3 className="font-bold text-base text-on-surface mt-0.5">{item.name}</h3>
                    </div>
                    <span className="font-extrabold text-base text-on-surface">Rs. {item.price}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">{item.description}</p>
                </div>
                <div className="flex gap-2 pt-3 border-t border-outline-variant/10">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item)}
                    className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
            <span className="material-symbols-outlined text-5xl text-gray-300">restaurant_menu</span>
            <h3 className="text-lg font-bold text-on-surface">No Menu Items Found</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              You don't have any food items listed under this category. Click "Add New Item" to create a dish for your restaurant!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuManagement;
