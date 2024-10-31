import { useState } from "react";

type OptionalPaymentMethod = "Credit Card" | "PayPal" | "Bitcoin";

const MyComponent = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<OptionalPaymentMethod | null>(null);
  const [isShipping, setIsShipping] = useState(true);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
      />
      <p>Name: {name}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />
      <p>Quantity: {quantity}</p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter Delivery instructions"
      />
      <p>Comment: {comment}</p>

      <select
        value={paymentMethod ?? ""}
        onChange={(e) =>
          setPaymentMethod(e.target.value as OptionalPaymentMethod)
        }
      >
        <option value="">Select payment method</option>
        <option value="Credit Card">Credit Card</option>
        <option value="PayPal">PayPal</option>
        <option value="Bitcoin">Bitcoin</option>
      </select>

      <p>Payment Method: {paymentMethod ?? "Not selected"}</p>

      <label>
        <input
          type="radio"
          checked={isShipping}
          onChange={() => setIsShipping(true)}
        />
        Delivery
      </label>
      <br />
      <label>
        <input
          type="radio"
          checked={!isShipping}
          onChange={() => setIsShipping(false)}
        />
        Pick up
      </label>
      <p>Shipping: {isShipping ? "Delivery" : "Pick up"}</p>
    </div>
  );
};

export default MyComponent;
