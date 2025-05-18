"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTestimonials } from "@/hooks/testimonial-hooks";
import { TestimonialRelation } from "@/types/testimonials";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const relationOptions: TestimonialRelation[] = [
  "client",
  "coworker",
  "manager",
  "team member",
  "project partners",
  "lecturer",
  "industry peer",
  "workshop attende",
  "prospective client",
  "other",
];

export default function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relation, setRelation] = useState<TestimonialRelation | "">("");
  const [customRelation, setCustomRelation] = useState("");
  const [message, setMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const router = useRouter();
  const { updateTestimonial, fetchTestimonialById } = useTestimonials();
  const resolvedParams = use(params);

  useEffect(() => {
    async function loadTestimonial() {
      const testimonial = await fetchTestimonialById(resolvedParams.id);
      if (testimonial) {
        setName(testimonial.name);
        setEmail(testimonial.email);
        setRelation(testimonial.relation);
        setCustomRelation(testimonial.custom_relation || "");
        setMessage(testimonial.message);
        setIsApproved(testimonial.is_approved);
      }
    }
    loadTestimonial();
  }, [resolvedParams.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!relation) return;

    const success = await updateTestimonial(
      resolvedParams.id,
      name,
      email,
      relation,
      message,
      isApproved,
      relation === "other" ? customRelation : undefined
    );

    if (success) {
      router.push("/protected/testimonial");
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Edit Testimonial
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relation">Relation</Label>
          <Select
            onValueChange={(val) => setRelation(val as TestimonialRelation)}
            defaultValue={relation}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relation" />
            </SelectTrigger>
            <SelectContent>
              {relationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {relation === "other" && (
          <div className="space-y-2">
            <Label htmlFor="customRelation">Specify Relation</Label>
            <Input
              id="customRelation"
              value={customRelation}
              onChange={(e) => setCustomRelation(e.target.value)}
              required
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isApproved}
            onCheckedChange={setIsApproved}
            id="approved"
          />
          <Label htmlFor="approved">Approve Testimonial</Label>
        </div>
        <div className="flex gap-4">
          <Button type="submit">Update Testimonial</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/protected/testimonial")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
