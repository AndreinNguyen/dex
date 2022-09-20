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
        <SavvycomLogo />
      </div>

      <div className="description">
        <p>SAVVY is an ecosystem of innovative products made with blockchain and AI technologies.</p>
        <p className="p2">
          Savvydex is a demonstration (i.e., solely for non-commercial purposes to learn more about our blockchain
          technologies and services) of being developed multi-chain technologies for Trading, Farming, Staking, etc.,
          cryptocurrencies in a flexible and efficient way.
        </p>
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
