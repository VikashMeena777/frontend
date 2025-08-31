import { Card, CardContent } from "@/components/ui/card";

export default function Policies() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <Card className="p-6" data-testid="privacy-policy">
        <CardContent className="p-0">
          <h2 className="font-display text-2xl font-bold mb-4">Privacy Policy</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700">
              We collect personal information (name, email, payment details) solely to process orders, improve services, and provide support. We do not sell or share data except for payment processing or legal compliance.
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Contact:</strong> xprmediaagency.help@gmail.com
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6" data-testid="terms-conditions">
        <CardContent className="p-0">
          <h2 className="font-display text-2xl font-bold mb-4">Terms & Conditions</h2>
          <div className="prose prose-gray max-w-none">
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All purchases are final unless stated otherwise.</li>
              <li>Services delivered in agreed timeframe; delays by client are not our responsibility.</li>
              <li>Digital products are delivered instantly upon successful payment.</li>
              <li>Refunds are processed within 7-14 business days.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6" data-testid="refund-policy">
        <CardContent className="p-0">
          <h2 className="font-display text-2xl font-bold mb-4">Refund Policy</h2>
          <div className="prose prose-gray max-w-none">
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Refunds only if service hasn't started. Digital products non-refundable once delivered.</li>
              <li>Request refunds within 7 days: xprmediaagency.help@gmail.com</li>
              <li>Processing fees may apply for payment gateway charges.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
