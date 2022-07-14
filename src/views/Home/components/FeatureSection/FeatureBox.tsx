import TransparentIcon from 'components/Svg/TransparentIcon'
import React from 'react'
import styled from 'styled-components'

const StyledFeatureBox = styled.div<{ color: string }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  padding: 24px;
  min-width: '250px';

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 32%;
  }

  .icon {
    display: flex;
    justify-content: flex-end;
  }

  .info {
    margin-top: 50px;
    h4.title {
      font-family: 'Space Grotesk';
      font-weight: 600;
      font-size: 32px;
      line-height: 36px;
      color: ${({ color }) => color};
    }

    p.desc {
      margin-top: 8px;
      font-family: 'Inter';
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.65);
    }
  }
`

type Props = {
  title: string
  description: string
  icon: React.ReactElement
  color: string
}

const FeatureBox = ({ title, description, icon, color }: Props) => {
  return (
    <StyledFeatureBox color={color}>
      <div className="icon">{icon}</div>

      <div className="info">
        <h4 className="title">{title}</h4>
        <p className="desc">{description}</p>
      </div>
    </StyledFeatureBox>
  )
}

export default FeatureBox
