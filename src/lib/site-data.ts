import {
  Home,
  Building2,
  Wrench,
  Sun,
  Shield,
  BadgeCheck,
} from "lucide-react";
import homeBefore from "@/assets/project-home-before.png";
import homeAfter from "@/assets/project-home-after.png";
import businessBefore from "@/assets/project-business-before.png";
import businessAfter from "@/assets/project-business-after.png";

export const navLinks = [
  { label: "Services", to: "/services" as const },
  { label: "Residential", to: "/residential" as const },
  { label: "Commercial", to: "/commercial" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export const services = [
  {
    icon: Home,
    title: "Residential Solar",
    description:
      "Custom rooftop solar systems for villas and homes in Kerala. Designed to eliminate or drastically reduce your monthly KSEB electricity bill.",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description:
      "High-capacity installations for shops, offices, hospitals, and industrial units in Thodupuzha and surrounding areas.",
  },
  {
    icon: Wrench,
    title: "Installation & Support",
    description:
      "End-to-end service from site inspection and KSEB paperwork to professional installation and long-term maintenance.",
  },
];

export const benefits = [
  {
    icon: Sun,
    title: "Kerala Climate Optimized",
    description:
      "Systems engineered to perform through monsoon rains and intense tropical sunshine.",
  },
  {
    icon: Shield,
    title: "Premium Components",
    description:
      "We use Tier-1 solar panels and proven inverters backed by long-term warranties.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Local Team",
    description:
      "Based in Manakkad with a 5.02 Google review rating and a growing list of happy neighbors.",
  },
];

export const testimonials = [
  {
    name: "Rajesh K.",
    role: "Manakkad Resident",
    text: "We haven't paid an electricity bill in six months. The installation was professional and they handled all the KSEB paperwork for us.",
    initials: "RK",
  },
  {
    name: "Aneesh M.",
    role: "Business Owner",
    text: "Best decision for my shop. The payback period was exactly what they estimated, and the work quality is excellent.",
    initials: "AM",
  },
  {
    name: "Sajitha T.",
    role: "Thodupuzha Resident",
    text: "Very transparent pricing and friendly team. They explained everything clearly and the system is running perfectly.",
    initials: "ST",
  },
];

export const stats = [
  { value: "450+", label: "Homes Powered" },
  { value: "12MW+", label: "Capacity Installed" },
  { value: "5.02", label: "Google Rating" },
  { value: "25Y", label: "Panel Warranty" },
];

export const projects = [
  {
    id: "home-manakkad",
    type: "home" as const,
    title: "Manakkad Family Home",
    location: "Manakkad, Kerala",
    beforeImage: homeBefore,
    afterImage: homeAfter,
    systemSize: "5 kW",
    savings: "92%",
    billBefore: "₹4,800/mo",
    billAfter: "₹380/mo",
    description:
      "A two-story family home switched to a 5 kW rooftop system. Monthly KSEB bills dropped from nearly ₹4,800 to under ₹400, with surplus power exported to the grid.",
    highlights: ["5 kW grid-tied system", "Net metering enabled", "25-year panel warranty"],
  },
  {
    id: "business-thodupuzha",
    type: "business" as const,
    title: "Thodupuzha Commercial Complex",
    location: "Thodupuzha, Kerala",
    beforeImage: businessBefore,
    afterImage: businessAfter,
    systemSize: "10 kW",
    savings: "78%",
    billBefore: "₹18,500/mo",
    billAfter: "₹4,100/mo",
    description:
      "A retail and office building reduced its operating costs with a 10 kW commercial installation. The system runs lighting, AC, and equipment during peak business hours.",
    highlights: ["10 kW commercial array", "Daytime load offset", "Depreciation benefits"],
  },
];
