"use client";

import { useEffect } from "react";
import { Card } from "./ui/card";

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (options: { hostedButtonId: string }) => {
        render: (containerId: string) => void;
      };
    };
  }
}

const PayPalButton = () => {
  useEffect(() => {
    const loadPayPalScript = async () => {
      // Check if PayPal script is already loaded
      if (document.querySelector('script[src*="www.paypal.com/sdk/js"]')) {
        if (window.paypal) {
          renderPayPalButton();
        } else {
          console.error("PayPal SDK not available on window.");
        }
        return;
      }

      // Dynamically load the PayPal SDK
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAdiuuq-E8cDKgmaHRIkrwfeKZoQ-fJqgirP37OHRt9EEAHGTYQQ9hwe5oOA4866nHzSVePB3YVnDFW-w&components=hosted-buttons&disable-funding=venmo&currency=USD";
      script.async = true;
      script.crossOrigin = "anonymous";

      script.onload = () => {
        if (window.paypal) {
          renderPayPalButton();
        } else {
          console.error("PayPal SDK failed to load.");
        }
      };

      script.onerror = () => {
        console.error("Error loading PayPal SDK script.");
      };

      document.body.appendChild(script);
    };

    const renderPayPalButton = () => {
      // Add a small delay to ensure PayPal SDK is fully initialized
      setTimeout(() => {
        try {
          if (!window.paypal?.HostedButtons) {
            console.error("PayPal HostedButtons not available");
            return;
          }
          
          window.paypal.HostedButtons({
            hostedButtonId: "9RMHPWNU5VKVN",
          }).render("#paypal-container-9RMHPWNU5VKVN");
        } catch (error) {
          console.error("Error rendering PayPal button:", error);
        }
      }, 1000); // 1 second delay
    };

    loadPayPalScript();
  }, []);

  return (
    <div>
      <Card className="p-6 bg-stone-800 shadow-stone-500">
        <div id="paypal-container-9RMHPWNU5VKVN"></div>
      </Card>
    </div>
  );
};

export default PayPalButton;