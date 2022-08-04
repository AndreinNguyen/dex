import styled from 'styled-components'

export const TransferBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 200px;
  margin-bottom: 200px;
  padding: 20px;
  max-width: 592px;
  background: #08121c;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 32px;

  .transfer-form {
    padding-top: 20px;
  }
  .receive-address {
    min-height: 120px;
  }
  .receive-title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 10px;
  }
`
export const InputStyleTransfer = styled.input`
  outline: none;
  width: 100%;
  height: 54px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  border: none;
  padding: 15px;
  font-family: inter;
  font-size: 16px;
  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`

export const TransferHeaderStyle = styled.div`
  text-align: center;
  .transfer-title {
    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: white;
  }
  .transfer-sub-title {
    margin-top: 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.65);
  }
  .icon {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
  .header-divider {
    border: 1px solid rgba(255, 255, 255, 0.25);
    margin: 0 -20px;
    margin-top: 20px;
  }
`
export const ConfirmModalBox = styled.div`
  min-width: 592px;
  color: #fff;
  .blur {
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: -10000;
  }
  p {
    font-size: 16px;
    font-family: 'Inter';
  }
  .confirm-item {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item-right {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .button-confirm {
    margin-top: 50px;
  }
`
export const NotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  max-width: 500px;
  padding: 0 50px;
  p {
    font-size: 14px;
  }
  .success-icon {
    margin: 40px 0;
  }
  .btn-addto-metamask {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #000000;
    border-radius: 8px;
    height: 40px;
    justify-content: space-between;
    width: 250px;
    padding: 10px;

    p {
      color: #f6b24f;
    }
  }
  .button-notification {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    font-weight: 600;
    width: 120px;
    height: 40px;
    background-color: #f6b24f;
    border-radius: 16px;
    cursor: pointer;
    border: transparent;
  }
`

export const ErrorMsg = styled.p`
  color: #f6b24f;
  margin-top: 8px;
  margin-left: 10px;
  font-size: 13px;
  font-family: 'Inter';
  font-style: normal;
`
