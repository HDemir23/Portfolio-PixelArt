import { profile } from "./profile";

export const contactLinks = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/905075865681",
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
  },
  {
    label: "GitHub",
    href: profile.github,
  },
  {
    label: "Portfolio",
    href: profile.portfolio,
  },
  {
    label: "Start a project",
    href: `mailto:${profile.email}?subject=New%20project%20inquiry`,
  },
];
