import { MENU_ITEMS } from './menuItems';
import { INITIAL_ORDERS } from './orders';

// Returns a unique key prefix for the currently logged-in restaurant
export const getRestaurantKey = () => {
    const email = localStorage.getItem('vendor_email') || 'default';
    return `vendor_data_${email}`;
};

// ─── MENU ────────────────────────────────────────────────────────────────────

const MENU_KEY = () => `${getRestaurantKey()}_menu`;

/**
 * Returns the menu for the current restaurant.
 * - Default/demo restaurant → returns the shared MENU_ITEMS seed data.
 * - Newly registered restaurant → returns [] (empty menu).
 */
export const getMenu = () => {
    const raw = localStorage.getItem(MENU_KEY());
    if (raw !== null) {
        return JSON.parse(raw);
    }
    // First access: seed with defaults for demo account, empty for new accounts
    const isDemo = (localStorage.getItem('vendor_users') || '[]') === '[]'
        || localStorage.getItem('vendor_restaurant_name') === 'Karachi Hotel';
    const seed = isDemo ? MENU_ITEMS : [];
    localStorage.setItem(MENU_KEY(), JSON.stringify(seed));
    return seed;
};

export const saveMenu = (items) => {
    localStorage.setItem(MENU_KEY(), JSON.stringify(items));
};

export const addMenuItem = (item) => {
    const menu = getMenu();
    const newId = menu.length > 0 ? Math.max(...menu.map(i => i.id)) + 1 : 1;
    const newItem = { ...item, id: newId };
    menu.push(newItem);
    saveMenu(menu);
    return newItem;
};

export const updateMenuItem = (updatedItem) => {
    const menu = getMenu();
    const idx = menu.findIndex(i => i.id === updatedItem.id);
    if (idx !== -1) menu[idx] = updatedItem;
    saveMenu(menu);
};

export const deleteMenuItem = (itemId) => {
    const menu = getMenu().filter(i => i.id !== itemId);
    saveMenu(menu);
};

// ─── ORDERS ──────────────────────────────────────────────────────────────────

const ORDERS_KEY = () => `${getRestaurantKey()}_orders`;

export const getOrders = () => {
    const raw = localStorage.getItem(ORDERS_KEY());
    if (raw !== null) {
        return JSON.parse(raw);
    }
    // Demo account gets seed orders; new restaurants start empty
    const isDemo = (localStorage.getItem('vendor_users') || '[]') === '[]'
        || localStorage.getItem('vendor_restaurant_name') === 'Karachi Hotel';
    const seed = isDemo ? INITIAL_ORDERS : [];
    localStorage.setItem(ORDERS_KEY(), JSON.stringify(seed));
    return seed;
};

export const saveOrders = (orders) => {
    localStorage.setItem(ORDERS_KEY(), JSON.stringify(orders));
};
