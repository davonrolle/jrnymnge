import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  notIncluded: string[];
};

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      description: "For small or individual rental businesses",
      monthlyPrice: 49,
      yearlyPrice: 528,
      features: [
        "Up to 5 vehicles",
        "Basic booking management",
        "Customer database",
        "Email support",
        "Basic analytics",
      ],
      notIncluded: [
        "Advanced booking features",
        "CRM tools",
        "Financial reports",
        "Live chat support",
      ],
    },
    {
      name: "Professional",
      description: "For mid-sized rental businesses needing more tools",
      monthlyPrice: 99,
      yearlyPrice: 1070,
      features: [
        "Up to 20 vehicles",
        "Advanced booking management",
        "CRM tools",
        "Customer insights",
        "Financial reports",
        "Live chat support",
      ],
      notIncluded: [
        "Unlimited vehicles",
        "Custom solutions",
        "Dedicated support rep",
      ],
    },
    {
      name: "Enterprise",
      description: "For larger businesses or companies with extensive fleets",
      monthlyPrice: 249,
      yearlyPrice: 2689,
      features: [
        "Unlimited vehicles",
        "Full feature access",
        "Custom solutions",
        "Advanced analytics",
        "Dedicated support rep",
        "Priority support",
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Content remains the same */}
<h1 className="text-center text-xl font-bold">Pricing May Change!</h1>
<br />
      <Tabs defaultValue="monthly" className="mb-12">
        <TabsList className="grid w-[400px] grid-cols-2 mx-auto">
          <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {plans.map((plan: Plan) => (
              <PricingCard key={plan.name} plan={plan} billing="monthly" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="yearly">
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {plans.map((plan: Plan) => (
              <PricingCard key={plan.name} plan={plan} billing="yearly" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {/* Content remains the same */}
    </div>
  );
}

type PricingCardProps = {
  plan: Plan;
  billing: "monthly" | "yearly";
};

function PricingCard({ plan, billing }: PricingCardProps) {
  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const discount = (
    ((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) *
    100
  ).toFixed(0);

  return (
    <Card className={plan.name === "Professional" ? "border-primary" : ""}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">
          ${price}
          <span className="text-lg font-normal text-muted-foreground">
            /{billing === "monthly" ? "mo" : "yr"}
          </span>
        </div>
        {billing === "yearly" && (
          <Badge variant="secondary" className="mb-4">
            Save {discount}%
          </Badge>
        )}
        <ul className="space-y-2 mb-4">
          {plan.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
          {plan.notIncluded.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <X className="h-5 w-5 text-red-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full font-bold animate-pulse" variant="default">
          Start 2 Week Trial FREE (Coming Soon)
        </Button>
      </CardFooter>
    </Card>
  );
}
