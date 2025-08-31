interface Service {
  title: string;
  startingPrice: number;
  description: string;
}

interface ServiceCardProps {
  svc: Service;
  onBook: (service: Service) => void;
}

export default function ServiceCard({ svc, onBook }: ServiceCardProps) {
  return (
    <div className="card p-5 reveal" data-testid={`service-card-${svc.title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg" data-testid="service-title">{svc.title}</h3>
        <span className="font-bold text-brand-700" data-testid="service-price">from ₹{svc.startingPrice}</span>
      </div>
      <p className="text-sm text-gray-600 mt-2" data-testid="service-description">{svc.description}</p>
      <button
        onClick={() => onBook(svc)}
        className="btn-primary mt-4 w-full"
        data-testid="book-service-button"
      >
        Book Service
      </button>
    </div>
  );
}
