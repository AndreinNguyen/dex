import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  background: ${darkColors.backgroundAlt};
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${darkColors.secondary};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  border-bottom: 1px solid ${darkColors.cardBorder};
`;

export const StyledText = styled.span`
  color: ${darkColors.text};
`;

export const FooterRoot = styled.div`
  width: 100%;
  background-color: #0f282a;
  padding-top: 24px;

  .logo {
    display: flex;
    justify-content: center;
  }

  .description {
    padding: 20px 30px 30px 30px;
    border-bottom: 1px solid #ffffffa5;

    p {
      margin: auto;
      max-width: 970px;
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #ffffffa5;
    }
  }

  .social {
    display: flex;
    padding: 51px 0;
    justify-content: center;

    .social-content {
      min-width: 80%;
      display: flex;
      justify-content: center;
      gap: 42px;
      flex-wrap: wrap;
      padding-bottom: 30px;
    }

    .social-item {
      font-family: "Google Sans", sans-serif;
      font-weight: 700;
      display: flex;
      gap: 15px;
      font-size: 18px;
      color: #ffffffa5;
      cursor: pointer;
      align-items: center;
    }
  }
`;
