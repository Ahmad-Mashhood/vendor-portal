import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

const EditItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    category: item?.category || '',
    price: item?.price || '',
    prepTime: item?.prepTime || '',
    inStock: item?.inStock ?? true,
    tags: item?.tags || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // In a real app this would persist back to the store / API
    navigate('/menu-management');
  };

  const handleDelete = () => {
    // In a real app this would call the delete API
    navigate('/menu-management');
  };

  if (!item) {
    return (
      <div className="bg-[#FDF3EC] min-h-screen font-body-md pb-32">
        <Header />
        <main className="max-w-2xl mx-auto px-container-padding py-xl text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">error</span>
          <p className="text-on-surface-variant mt-4">Item not found.</p>
          <Link to="/menu-management" className="mt-6 inline-block px-lg py-sm rounded-xl bg-primary text-on-primary font-label-lg">
            Back to Menu
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF3EC] min-h-screen text-on-surface font-body-md overflow-x-hidden pb-32">
      <Header />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-container-padding bg-on-surface/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-surface rounded-2xl shadow-xl p-lg max-w-sm w-full animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-sm">
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-error">delete_forever</span>
              </div>
              <h2 className="font-headline-md text-on-surface">Delete Item?</h2>
            </div>
            <p className="text-body-md text-on-surface-variant mb-lg">
              Are you sure you want to delete <strong className="text-on-surface">{item.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-full font-label-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 py-3 rounded-full font-label-lg bg-error text-on-error shadow-sm hover:brightness-110 transition-all active:scale-95">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-container-padding py-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
          <div className="space-y-base">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1F1B1B]">Edit Item</h2>
            <p className="text-body-md text-[#8A8A8A]">Update the details of this menu item</p>
          </div>
          <div className="flex items-center gap-card-gap">
            <Link to="/menu-management" className="flex-1 md:flex-none px-lg py-sm rounded-xl border border-outline text-on-surface-variant font-label-lg hover:bg-surface-container-low transition-all active:scale-95 text-center">
              Cancel
            </Link>
            <button onClick={handleSave} className="flex-1 md:flex-none px-lg py-sm rounded-xl bg-[#F2632A] text-white font-label-lg shadow-md hover:brightness-110 transition-all active:scale-95">
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-lg">
          {/* Current Photo */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30">
            <label className="block font-label-lg text-on-surface mb-sm">Dish Photo</label>
            <div className="relative group cursor-pointer">
              <div className="w-full aspect-video border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-4xl">photo_camera</span>
                  <p className="text-white font-body-md text-sm">Click to change photo</p>
                </div>
              </div>
              <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
            </div>
          </section>

          {/* Details */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30 space-y-md">
            <div className="space-y-base">
              <label className="block font-label-lg text-on-surface" htmlFor="name">Dish Name</label>
              <input
                className="w-full h-12 px-md bg-white border border-outline-variant rounded-xl text-body-md transition-all focus:border-primary"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
              />
            </div>

            <div className="space-y-base">
              <div className="flex justify-between items-center">
                <label className="block font-label-lg text-on-surface" htmlFor="description">Description</label>
                <span className="text-label-sm text-[#8A8A8A]">{formData.description.length}/150</span>
              </div>
              <textarea
                className="w-full p-md bg-white border border-outline-variant rounded-xl text-body-md transition-all resize-none focus:border-primary"
                id="description"
                name="description"
                maxLength="150"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface" htmlFor="category">Category</label>
                <div className="relative">
                  <select
                    className="w-full h-12 pl-md pr-10 bg-white border border-outline-variant rounded-xl text-body-md appearance-none transition-all"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select Category</option>
                    <option>Main Course</option>
                    <option>Appetizers</option>
                    <option>Beverages</option>
                    <option>Desserts</option>
                    <option>Specials</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">keyboard_arrow_down</span>
                </div>
              </div>
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface" htmlFor="price">Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-lg">$</span>
                  <input
                    className="w-full h-12 pl-8 pr-md bg-white border border-outline-variant rounded-xl text-body-md transition-all"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Inventory */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30 space-y-md">
            <div className="flex items-center justify-between pb-xs border-b border-outline-variant/20">
              <div className="space-y-1">
                <p className="font-label-lg text-on-surface">Inventory Status</p>
                <p className="text-[12px] text-[#8A8A8A]">Toggle item visibility on the menu</p>
              </div>
              <div className="flex items-center gap-sm">
                <span className="text-label-sm font-medium text-on-surface-variant">In Stock</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                  <input
                    defaultChecked={formData.inStock}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-outline-variant appearance-none cursor-pointer z-10 checked:translate-x-6 checked:border-primary transition-transform duration-200 ease-in-out"
                    id="toggle"
                    name="inStock"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer" htmlFor="toggle"></label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface" htmlFor="prepTime">Preparation Time</label>
                <div className="relative">
                  <input
                    className="w-full h-12 pl-md pr-16 bg-white border border-outline-variant rounded-xl text-body-md transition-all"
                    id="prepTime"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    type="number"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-sm">mins</span>
                </div>
              </div>
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface">Tags &amp; Labels</label>
                <div className="flex flex-wrap gap-xs pt-1">
                  {formData.tags.map(tag => (
                    <button key={tag} type="button" className="px-md py-1.5 rounded-full bg-[#F7DECE] text-primary font-label-sm border border-transparent hover:border-primary transition-all flex items-center gap-1 active:scale-95">
                      {tag}
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  ))}
                  <button type="button" className="px-md py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-sm border border-outline-variant/40 hover:bg-[#F7DECE] hover:text-primary transition-all flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    Add Tag
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Delete Section */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-error/20">
            <h3 className="font-label-lg text-on-surface mb-sm">Danger Zone</h3>
            <p className="text-body-md text-on-surface-variant mb-md">Permanently remove this item from your menu. This action cannot be undone.</p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-label-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">delete_forever</span>
              Delete Item
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditItem;
