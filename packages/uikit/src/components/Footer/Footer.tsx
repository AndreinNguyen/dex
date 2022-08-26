import {
  Behance,
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Medium,
  Twitter,
  Youtube,
} from "@styled-icons/boxicons-logos";
import React from "react";
import { SavvycomLogo } from "../Svg";
import { FooterRoot } from "./styles";
import { FooterProps } from "./types";

const socialList: { icon: React.ReactNode; href: string; title: string }[] = [
  {
    icon: <Linkedin size={18} color="#ffffffa5" />,
    href: "",
    title: "LinkedIn",
  },
  {
    icon: <Medium size={18} color="#ffffffa5" />,
    href: "",
    title: "Medium",
  },
  {
    icon: <Facebook size={18} color="#ffffffa5" />,
    href: "",
    title: "Facebook",
  },
  {
    icon: <Twitter size={18} color="#ffffffa5" />,
    href: "",
    title: "Twitter",
  },
  {
    icon: <Instagram size={18} color="#ffffffa5" />,
    href: "",
    title: "Instagram",
  },
  {
    icon: <Youtube size={18} color="#ffffffa5" />,
    href: "",
    title: "Youtube",
  },
  {
    icon: <Behance size={18} color="#ffffffa5" />,
    href: "",
    title: "Behance",
  },
  {
    icon: <Dribbble size={18} color="#ffffffa5" />,
    href: "",
    title: "Dribbble",
  },
];

const MenuItem: React.FC<FooterProps> = () => {
  return (
    <FooterRoot>
      <div className="logo">
        <SavvycomLogo width={278} />
      </div>

      <div className="description">
        <p>An AI & BLOCKCHAIN disruptive integration</p>
      </div>

      <div className="social">
        <div className="social-content">
          {socialList.map((item, index) => (
            <div className="social-item" key={`social-${item.title}`}>
              {item.icon}
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </FooterRoot>
  );
};

export default MenuItem;
