import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex items-center gap-4 py-4 border-b">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-600">${item.product.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="px-2 py-1 border rounded"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
            <button
              onClick={() => onRemoveItem(item.product.id)}
              className="ml-4 text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}