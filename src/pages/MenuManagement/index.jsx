import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getMenu, deleteMenuItem } from '../../data/restaurantStorage';

const MenuManagement = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Items');
  const [items, setItems] = useState(() => getMenu());
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filters = ['All Items', 'Main Course', 'Appetizers', 'Beverages', 'Desserts', 'Specials'];

  const filteredItems = items
    .filter(item => activeFilter === 'All Items' || item.category === activeFilter)
    .filter(item => !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (itemId) => {
    deleteMenuItem(itemId);
    setItems(prev => prev.filter(i => i.id !== itemId));
    setDeleteConfirm(null);
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
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-error">delete_forever</span>
              </div>
              <h2 className="font-headline-md text-on-surface">Delete Item?</h2>
            </div>
            <p className="text-body-md text-on-surface-variant mb-lg">
              Are you sure you want to delete <strong className="text-on-surface">{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-full font-label-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 py-3 rounded-full font-label-lg bg-error text-on-error shadow-sm hover:brightness-110 transition-all active:scale-95">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-[1920px] mx-auto px-container-padding pt-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">Menu Management</h1>
            <p className="text-body-md text-on-surface-variant">Update, add, or organize your kitchen offerings</p>
          </div>
          <Link to="/add-item" className="bg-primary-container text-on-primary py-3 px-6 rounded-full font-label-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <span className="material-symbols-outlined" data-icon="add">add</span>
            Add New Item
          </Link>
        </div>

        <div className="mb-lg space-y-md">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/60" data-icon="search">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all font-body-md"
              placeholder="Search dish name, ID, or description..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto gap-xs pb-2 custom-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-label-sm whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-primary-container text-on-primary' : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-card-gap">
          {filteredItems.length === 0 && items.length === 0 ? (
            /* ── Empty state for brand-new restaurants ── */
            <div className="col-span-full flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary/40">restaurant_menu</span>
              </div>
              <div>
                <h2 className="font-headline-md text-on-surface mb-1">Your menu is empty</h2>
                <p className="text-body-md text-on-surface-variant max-w-xs">
                  You haven't added any dishes yet. Start building your menu by adding your first item.
                </p>
              </div>
              <Link
                to="/add-item"
                className="bg-primary-container text-on-primary py-3 px-8 rounded-full font-label-lg flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined" data-icon="add">add</span>
                Add Your First Item
              </Link>
            </div>
          ) : filteredItems.length === 0 ? (
            /* ── No results for current filter/search ── */
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">search_off</span>
              <p className="text-body-md text-on-surface-variant">No items match your search or filter.</p>
            </div>
          ) : (
            <>
              {filteredItems.map(item => (
                <div key={item.id} className={`item-card bg-white rounded-xl overflow-hidden flex flex-col group ${!item.inStock ? 'opacity-70' : ''}`}>
                  <div className={`relative h-48 w-full overflow-hidden ${!item.inStock ? 'grayscale' : ''}`}>
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} alt={item.name} />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-on-surface/40 flex items-center justify-center">
                        <span className="bg-white px-3 py-1 rounded-full text-label-sm font-bold text-on-surface">OUT OF STOCK</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm hover:bg-white active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item)}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-error shadow-sm hover:bg-white active:scale-90 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-primary-fixed-variant text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                      <span className={`font-bold text-headline-md ${item.inStock ? 'text-primary' : 'text-on-surface-variant/60'}`}>${item.price}</span>
                    </div>
                    <h3 className="font-headline-md text-on-surface mb-1 truncate">{item.name}</h3>
                    <p className="text-body-md text-on-surface-variant line-clamp-2 mb-4">{item.description}</p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/30">
                      <span className={`text-label-sm ${item.inStock ? 'text-on-surface-variant' : 'text-error font-semibold'}`}>
                        {item.inStock ? 'Available Today' : 'Sold Out'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked={item.inStock} className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/add-item" className="border-2 border-dashed border-outline-variant rounded-xl h-full min-h-[350px] flex flex-col items-center justify-center gap-4 text-on-surface-variant/40 hover:text-primary hover:border-primary hover:bg-primary-container/5 transition-all group">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container/20 transition-all">
                  <span className="material-symbols-outlined text-4xl" data-icon="add_circle">add_circle</span>
                </div>
                <span className="font-label-lg">Quick Add Item</span>
              </Link>
            </>
          )}
        </div>
      </main>

      <Link to="/add-item" className="fixed right-6 bottom-24 w-14 h-14 bg-primary-container text-on-primary rounded-2xl shadow-xl flex items-center justify-center lg:hidden active:scale-90 transition-transform">
        <span className="material-symbols-outlined text-3xl" data-icon="add">add</span>
      </Link>
    </div>
  );
};

export default MenuManagement;
