import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme";
import Skeleton from "../Skeleton/Skeleton";
import { SVCLogo } from "../Svg";
import Text from "../Text/Text";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
  showSkeleton?: boolean;
  svcBalance?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }

  span {
    font-family: "Space Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #f6b24f;
  }
`;

const CakePrice: React.FC<Props> = ({ svcBalance, showSkeleton = true }) => {
  const balanceFormatted = svcBalance
    ? Number(svcBalance)
        .toFixed(3)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    : 0;

  return svcBalance ? (
    <PriceLink href="https://coin.savvycom.vn/" target="_blank">
      <SVCLogo width="24px" mr="8px" />
      <span>{balanceFormatted}</span>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(CakePrice);
