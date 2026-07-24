import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { addMenuItem } from '../../data/restaurantStorage';
import API from '../../api';

const AVAILABLE_TAGS = ['Spicy', 'Vegan', 'Vegetarian', 'Gluten Free', 'New', 'Best Seller', 'Halal'];

const AddItem = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [inStock, setInStock] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Dish name is required.';
    if (!category) errs.category = 'Please select a category.';
    if (!price || isNaN(price) || parseFloat(price) <= 0) errs.price = 'Enter a valid price.';
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await API.post('/api/foods', {
        name: name.trim(),
        price: parseFloat(price),
        category: category,
        description: description.trim(),
        calories: 450,
        is_available: inStock,
        vendor_id: user.id || 1
      });

      addMenuItem({
        name: name.trim(),
        description: description.trim(),
        category,
        price: parseFloat(price).toFixed(2),
        prepTime: prepTime || '15',
        tags: selectedTags,
        inStock,
        image: imageUrl || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
      });
      setSaving(false);
      navigate('/menu-management');
    } catch (err) {
      setSaving(false);
      alert('Failed to save item: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="bg-[#FDF3EC] min-h-screen text-on-surface font-body-md overflow-x-hidden pb-32">
      <Header />
      <main className="max-w-2xl mx-auto px-container-padding py-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
          <div className="space-y-base">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1F1B1B]">Add New Item</h2>
            <p className="text-body-md text-[#8A8A8A]">Create a new dish for your menu</p>
          </div>
          <div className="flex items-center gap-card-gap">
            <Link to="/menu-management" className="flex-1 md:flex-none px-lg py-sm rounded-xl border border-outline text-on-surface-variant font-label-lg hover:bg-surface-container-low transition-all active:scale-95 text-center">
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 md:flex-none px-lg py-sm rounded-xl bg-[#F2632A] text-white font-label-lg shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <span className="material-symbols-outlined text-[18px]">save</span>
              )}
              Save Item
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-lg">
          {/* Photo Upload */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30">
            <label className="block font-label-lg text-on-surface mb-sm">Dish Photo</label>
            <div className="relative group cursor-pointer">
              <div className="w-full aspect-video border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center gap-xs group-hover:border-primary transition-colors overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-primary text-4xl" data-icon="photo_camera">photo_camera</span>
                    <p className="font-body-md text-[#8A8A8A] text-center">Click or drag to upload dish photo</p>
                    <p className="text-[10px] text-outline px-md text-center">High quality JPG, PNG (Max 5MB)</p>
                  </>
                )}
              </div>
              <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="mt-sm">
              <label className="block font-label-sm text-on-surface-variant mb-1">Or enter image URL</label>
              <input
                className="w-full h-10 px-md bg-white border border-outline-variant rounded-xl text-body-md transition-all focus:border-primary text-sm"
                placeholder="https://..."
                type="url"
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
              />
            </div>
          </section>

          {/* Details */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30 space-y-md">
            <div className="space-y-base">
              <label className="block font-label-lg text-on-surface" htmlFor="dish-name">
                Dish Name <span className="text-error">*</span>
              </label>
              <input
                className={`w-full h-12 px-md bg-white border ${errors.name ? 'border-error' : 'border-outline-variant'} rounded-xl text-body-md transition-all focus:border-primary`}
                id="dish-name"
                placeholder="e.g. Signature Truffle Burger"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
              />
              {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-base">
              <div className="flex justify-between items-center">
                <label className="block font-label-lg text-on-surface" htmlFor="description">Description</label>
                <span className="text-label-sm text-[#8A8A8A]">{description.length}/150</span>
              </div>
              <textarea
                className="w-full p-md bg-white border border-outline-variant rounded-xl text-body-md transition-all resize-none focus:border-primary"
                id="description"
                maxLength="150"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe the ingredients and taste profile..."
                rows="3"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface" htmlFor="category">
                  Category <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    className={`w-full h-12 pl-md pr-10 bg-white border ${errors.category ? 'border-error' : 'border-outline-variant'} rounded-xl text-body-md appearance-none transition-all`}
                    id="category"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setErrors(p => ({ ...p, category: '' })); }}
                  >
                    <option value="" disabled>Select Category</option>
                    <option>Main Course</option>
                    <option>Appetizers</option>
                    <option>Beverages</option>
                    <option>Desserts</option>
                    <option>Specials</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
                </div>
                {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
              </div>
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface" htmlFor="price">
                  Price <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-lg">$</span>
                  <input
                    className={`w-full h-12 pl-8 pr-md bg-white border ${errors.price ? 'border-error' : 'border-outline-variant'} rounded-xl text-body-md transition-all`}
                    id="price"
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value); setErrors(p => ({ ...p, price: '' })); }}
                  />
                </div>
                {errors.price && <p className="text-xs text-error mt-1">{errors.price}</p>}
              </div>
            </div>
          </section>

          {/* Inventory & Prep Time */}
          <section className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30 space-y-md">
            <div className="flex items-center justify-between pb-xs border-b border-outline-variant/20">
              <div className="space-y-1">
                <p className="font-label-lg text-on-surface">Inventory Status</p>
                <p className="text-[12px] text-[#8A8A8A]">Toggle item visibility on the menu</p>
              </div>
              <div className="flex items-center gap-sm">
                <span className="text-label-sm font-medium text-on-surface-variant">{inStock ? 'In Stock' : 'Out of Stock'}</span>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
                  <input
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 border-outline-variant appearance-none cursor-pointer z-10 checked:translate-x-6 checked:border-primary transition-transform duration-200 ease-in-out"
                    id="toggle"
                    name="toggle"
                    type="checkbox"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer" htmlFor="toggle"></label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface" htmlFor="prep-time">Preparation Time</label>
                <div className="relative">
                  <input
                    className="w-full h-12 pl-md pr-16 bg-white border border-outline-variant rounded-xl text-body-md transition-all"
                    id="prep-time"
                    placeholder="15"
                    type="number"
                    min="1"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-label-sm">mins</span>
                </div>
              </div>
              <div className="space-y-base">
                <label className="block font-label-lg text-on-surface">Tags &amp; Labels</label>
                <div className="flex flex-wrap gap-xs pt-1">
                  {AVAILABLE_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-md py-1.5 rounded-full font-label-sm border transition-all flex items-center gap-1 active:scale-95 ${
                        selectedTags.includes(tag)
                          ? 'bg-[#F7DECE] text-primary border-primary'
                          : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:bg-[#F7DECE] hover:text-primary'
                      }`}
                    >
                      {selectedTags.includes(tag) && (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      )}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddItem;
