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
      const existingScript = document.querySelector(
        'script[src*="www.paypal.com/sdk/js"]'
      );

      if (existingScript) {
        // Wait for PayPal to be available
        const waitForPayPal = () => {
          if (window.paypal) {
            renderPayPalButton();
          } else {
            setTimeout(waitForPayPal, 100);
          }
        };
        waitForPayPal();
        return;
      }

      // Dynamically load the PayPal SDK
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAdiuuq-E8cDKgmaHRIkrwfeKZoQ-fJqgirP37OHRt9EEAHGTYQQ9hwe5oOA4866nHzSVePB3YVnDFW-w&components=hosted-buttons&disable-funding=venmo&currency=USD";
      script.async = true;
      script.crossOrigin = "anonymous";

      // Create a promise to handle script loading
      const scriptLoaded = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      document.body.appendChild(script);

      try {
        await scriptLoaded;
        // Wait for PayPal to be available
        const waitForPayPal = () => {
          if (window.paypal) {
            renderPayPalButton();
          } else {
            setTimeout(waitForPayPal, 100);
          }
        };
        waitForPayPal();
      } catch (error) {
        console.error("Error loading PayPal SDK script:", error);
      }
    };

    const renderPayPalButton = () => {
      try {
        if (!window.paypal?.HostedButtons) {
          console.error("PayPal HostedButtons not available");
          return;
        }

        window.paypal
          .HostedButtons({
            hostedButtonId: "9RMHPWNU5VKVN",
          })
          .render("#paypal-container-9RMHPWNU5VKVN");
      } catch (error) {
        console.error("Error rendering PayPal button:", error);
      }
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
