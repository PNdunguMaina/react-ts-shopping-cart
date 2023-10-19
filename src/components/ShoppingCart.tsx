import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCartContext } from '../context/ShoppingCartContext';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCartContext();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="sticky-bottom bg-light p-3">
            <hr />
            <div className="d-flex justify-content-between align-items-center fw-bold fs-5">
              <span>Total</span>
              <span>
                {formatCurrency(
                  cartItems.reduce((total, currItem) => {
                    const item = storeItems.find((i) => i.id === currItem.id);
                    return total + (item?.price || 0) * currItem.quantity;
                  }, 0)
                )}
              </span>
            </div>
            <hr />
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
