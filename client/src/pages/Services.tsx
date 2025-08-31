import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ServiceCard from "../components/ServiceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import api from "../lib/api";

const SERVICES = [
  {
    title: "Video Editing",
    startingPrice: 599,
    description: "Reels, Shorts, ads & long-form — transitions, grading, captions.",
  },
  {
    title: "Thumbnail Designing",
    startingPrice: 299,
    description: "YouTube thumbnails and socials that convert.",
  },
  {
    title: "Story Writing (Scripts)",
    startingPrice: 499,
    description: "Hooks, pacing & endings for reels.",
  },
  {
    title: "Copywriting",
    startingPrice: 599,
    description: "Ad copy, captions & product descriptions.",
  },
  {
    title: "Social Media Management",
    startingPrice: 4999,
    description: "Full page management & analytics.",
  },
  {
    title: "Brand Strategy",
    startingPrice: 2999,
    description: "Complete brand identity and positioning strategy.",
  },
];

export default function Services() {
  const [modal, setModal] = useState<typeof SERVICES[0] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const { toast } = useToast();

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await api.post("/bookings/create", bookingData);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Booking received!",
        description: "We'll contact you soon to finalize the details.",
      });
      setModal(null);
      setForm({ name: "", email: "", notes: "" });
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal) return;

    bookingMutation.mutate({
      ...form,
      service: modal.title,
      budget: modal.startingPrice,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-4" data-testid="services-title">Professional Services</h1>
      <p className="text-gray-600 mb-8" data-testid="services-description">
        Book the service — we'll contact you after booking to finalize scope & timeline.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="services-grid">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={index}
            svc={service}
            onBook={(svc) => setModal(svc)}
          />
        ))}
      </div>

      <Dialog open={!!modal} onOpenChange={() => setModal(null)}>
        <DialogContent className="sm:max-w-md" data-testid="service-booking-modal">
          <DialogHeader>
            <DialogTitle data-testid="modal-title">Book: {modal?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-testid="input-name"
            />
            <Input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-testid="input-email"
            />
            <Textarea
              placeholder="Describe your needs"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              data-testid="textarea-notes"
            />
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModal(null)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={bookingMutation.isPending}
                data-testid="button-submit"
              >
                {bookingMutation.isPending ? "Submitting..." : "Submit Booking"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}