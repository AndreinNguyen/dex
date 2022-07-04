import styled from 'styled-components'

export const BannerBox = styled.div`
  position: relative;
  .about-box {
    display: flex;
    flex-direction: column;
    max-width: 592px;
    position: relative;
    z-index: 3;
    min-height: 60vh;
    margin-top: 60px;

    h1.hero-title {
      font-family: 'Space Grotesk';
      font-style: normal;
      font-weight: 600;
      font-size: 64px;
      line-height: 78px;
      color: #ffffff;
    }

    p.desc {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.65);
    }
  }

  img.chainBanner {
    position: absolute;
    right: -200px;
    top: -120px;
    z-index: 2;
    max-width: 1050px;
  }

  @media screen and (max-width: 576px) {
    .about-box {
      align-items: center;
      margin-bottom: 50px;
      min-height: 0;
      margin: 0 auto;
      margin-bottom: 50px;
      h1.hero-title {
        font-size: 42px;
        line-height: 1.2;
        margin-bottom: 20px;
      }
      padding: 0 30px;
    }
  }
`
