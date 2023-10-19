import { Button, Stack } from 'react-bootstrap';
import { useShoppingCartContext } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCartContext();
  const item = storeItems.find((i) => i.id === id);
  if (item === undefined) return undefined;

  return (
    <Stack direction="horizontal" className="my-3 d-flex align-items-center">
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className="me-auto">
        <div>
          {item.name} <span className="text-danger">({quantity})</span>
        </div>
        <div className="text-muted">{formatCurrency(item.price)}</div>
      </div>
      <div className="text-muted">{formatCurrency(item.price * quantity)}</div>
      <Button variant='outline-danger' size='sm' onClick={() => removeFromCart(item.id)} className='mx-2'>&times;</Button>
    </Stack>
  );
}
