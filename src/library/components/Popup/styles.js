import styled from 'styled-components'
import CancelSvg from './assets/cancel.svg'

export const PopupWrapper = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(47, 79, 79, 0.2);
`

export const PopupContainer = styled.div`
  position: absolute;
  left: 100px;
  top: 100px;
  min-width: 295px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
`
export const PopupHeader = styled.div`
  background-color: #70b603;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bolder;
  flex-grow: 0;
  flex-basis: 3em;
  user-select: none;
`

export const PopupBody = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 0.5em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 0;
  flex-basis: 3em;
  border: 1px solid #f0f0f0;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: #ffffff;

  & > form {
    display: flex;
    flex-direction: column;
    & > * {
      margin-bottom: 10px
    }
  }
`

export const CancelButton = styled.button`
  position: absolute;
  top: -30px;
  right: -12px;
  background: url(${CancelSvg}) center no-repeat;
  border: none;
  height: 25px;
  width: 25px;
  cursor: pointer;
`
