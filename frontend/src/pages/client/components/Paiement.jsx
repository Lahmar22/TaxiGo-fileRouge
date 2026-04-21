import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { useState } from "react";
import axios from "axios";

function Paiement({ bookingData, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardNumberElement);

    try {
      // 🔥 1. Créer payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      // 🔥 2. Envoyer au backend (paiement simple)
      const res = await axios.post(
        "http://127.0.0.1:8000/api/create-payment-intent",
        {
          payment_method_id: paymentMethod.id,
          amount: bookingData.prix_course,
          course_id: bookingData.course_id,
          status_paiement: "paye",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Paiement réussi !");
      onSuccess();

    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors du paiement");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Card */}
      <div className="p-3 border rounded">
        <CardNumberElement />
      </div>

      <div className="flex gap-2">
        <div className="w-1/2 p-3 border rounded">
          <CardExpiryElement />
        </div>

        <div className="w-1/2 p-3 border rounded">
          <CardCvcElement />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {loading ? "Paiement..." : "Payer"}
      </button>

      {/* Message */}
      {message && (
        <p className="text-center text-sm mt-2">
          {message}
        </p>
      )}
    </form>
  );
}

export default Paiement;