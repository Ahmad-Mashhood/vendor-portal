export const INITIAL_ORDERS = [
  // --- INCOMING (7) ---
  {
    id: '#FG-8821', status: 'Incoming', time: '2 mins ago', customer: 'Marcus Holloway',
    items: [
      { name: '2x Truffle Burger Delux', price: '$32.00' },
      { name: '1x Large Sweet Potato Fries', price: '$6.50' }
    ], total: '$38.50'
  },
  {
    id: '#FG-8822', status: 'Incoming', time: '5 mins ago', customer: 'Jessica Taylor',
    items: [
      { name: '1x Margherita Pizza', price: '$14.00' },
      { name: '1x Tiramisu', price: '$8.00' },
      { name: '2x Diet Cola', price: '$5.00' },
      { name: '1x Garlic Bread', price: '$4.50' }
    ], total: '$31.50'
  },
  {
    id: '#FG-8823', status: 'Incoming', time: '8 mins ago', customer: 'Brian Adams',
    items: [
      { name: '1x Veggie Wrap', price: '$12.00' },
      { name: '1x Mango Smoothie', price: '$6.00' }
    ], total: '$18.00'
  },
  {
    id: '#FG-8824', status: 'Incoming', time: '11 mins ago', customer: 'Lucy Liu',
    items: [
      { name: '1x California Roll', price: '$15.00' },
      { name: '1x Spicy Tuna Roll', price: '$16.00' },
      { name: '1x Edamame', price: '$5.00' },
      { name: '2x Miso Soup', price: '$6.00' },
      { name: '1x Green Tea', price: '$3.00' }
    ], total: '$45.00'
  },
  {
    id: '#FG-8825', status: 'Incoming', time: '14 mins ago', customer: 'Samuel Jackson',
    items: [
      { name: '1x Ribeye Steak', price: '$42.00' },
      { name: '1x Mashed Potatoes', price: '$6.00' },
      { name: '1x House Salad', price: '$8.00' }
    ], total: '$56.00'
  },
  {
    id: '#FG-8826', status: 'Incoming', time: '16 mins ago', customer: 'Emily Clark',
    items: [{ name: '2x Chicken Alfredo', price: '$34.00' }],
    total: '$34.00'
  },
  {
    id: '#FG-8827', status: 'Incoming', time: '19 mins ago', customer: 'Omar Little',
    items: [
      { name: '1x Honey BBQ Wings', price: '$12.00' },
      { name: '1x Onion Rings', price: '$5.50' },
      { name: '1x Craft Beer', price: '$7.00' },
      { name: '1x Extra Ranch', price: '$0.50' }
    ], total: '$25.00'
  },
  // --- PREPARING (4) ---
  {
    id: '#FG-8819', status: 'Preparing', time: '12 mins ago', customer: 'Sarah Jenkins',
    items: [{ name: '1x Quinoa Buddha Bowl', price: '$14.00' }]
  },
  {
    id: '#FG-8818', status: 'Preparing', time: '15 mins ago', customer: 'David Chen',
    items: [
      { name: '4x Classic Pepperoni Pizza', price: '$56.00' },
      { name: '2x Garlic Breadsticks', price: '$10.00' },
      { name: '3x Marinara Dip', price: '$3.00' },
      { name: '2x 2L Cola', price: '$8.00' }
    ]
  },
  {
    id: '#FG-8817', status: 'Preparing', time: '18 mins ago', customer: 'Mia Wallace',
    items: [
      { name: '1x $5 Shake', price: '$5.00' },
      { name: '1x Durwood Kirby Burger', price: '$12.00' }
    ]
  },
  {
    id: '#FG-8816', status: 'Preparing', time: '22 mins ago', customer: 'Vincent Vega',
    items: [
      { name: '1x Royale with Cheese', price: '$10.00' },
      { name: '1x Sprite', price: '$3.00' }
    ]
  },
  // --- READY (4) ---
  {
    id: '#FG-8815', status: 'Ready', time: '25 mins ago', customer: 'Elena Rodriguez',
    items: [
      { name: '1x Seafood Paella', price: '$28.00' },
      { name: '2x Sangria', price: '$18.00' },
      { name: '1x Churros', price: '$6.00' },
      { name: '1x Flan', price: '$5.00' }
    ]
  },
  {
    id: '#FG-8814', status: 'Ready', time: '30 mins ago', customer: 'John Snow',
    items: [{ name: '1x Venison Stew', price: '$22.00' }, { name: '1x Ale', price: '$6.00' }]
  },
  {
    id: '#FG-8813', status: 'Ready', time: '35 mins ago', customer: 'Arya Stark',
    items: [{ name: '1x Oysters', price: '$16.00' }, { name: '1x Lemon Cake', price: '$8.00' }]
  },
  {
    id: '#FG-8812', status: 'Ready', time: '40 mins ago', customer: 'Sansa Stark',
    items: [{ name: '1x Roast Chicken', price: '$18.00' }, { name: '2x Lemon Cake', price: '$16.00' }]
  },
  // --- COMPLETED (4) ---
  {
    id: '#FG-8811', status: 'Completed', time: '45 mins ago', customer: 'James Wilson',
    items: [{ name: '2x Caesar Salad', price: '$16.00' }]
  },
  {
    id: '#FG-8810', status: 'Completed', time: '1 hour ago', customer: 'Anita Desai',
    items: [
      { name: '1x Butter Chicken', price: '$18.50' },
      { name: '2x Garlic Naan', price: '$5.00' },
      { name: '1x Basmati Rice', price: '$4.00' },
      { name: '1x Mango Lassi', price: '$6.00' }
    ]
  },
  {
    id: '#FG-8809', status: 'Completed', time: '1.5 hours ago', customer: 'Bruce Wayne',
    items: [{ name: '1x Lobster Thermidor', price: '$65.00' }, { name: '1x Caviar', price: '$120.00' }]
  },
  {
    id: '#FG-8808', status: 'Completed', time: '2 hours ago', customer: 'Clark Kent',
    items: [
      { name: '3x Beef Burger', price: '$36.00' },
      { name: '2x Large Fries', price: '$10.00' },
      { name: '1x Apple Pie', price: '$5.00' },
      { name: '1x Vanilla Shake', price: '$6.00' }
    ]
  }
];
