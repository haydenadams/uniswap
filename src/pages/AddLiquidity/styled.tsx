import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { DarkGreyCard } from 'components/Card'

export const ScrollablePage = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`

export const ScrollableContent = styled.div`
  margin-right: 24px;
`

export const FixedPreview = styled.div`
  position: relative;
  padding: 8px;
  width: 260px;
  height: fit-content;
  background: ${({ theme }) => theme.bg0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
`

export const DynamicSection = styled(AutoColumn)<{ disabled?: boolean }>`
    opacity: ${({ disabled }) => (disabled ? '0.3' : '1')}
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')}
`

export const CurrencyDropdown = styled(CurrencyInputPanel)`
  width: 49%;
  font-size: 16px;
`

export const PreviewCard = styled(DarkGreyCard)<{ disabled?: boolean }>`
  padding: 8px;
  border-radius: 12px;
  min-height: 40px;
  opacity: ${({ disabled }) => (disabled ? '0.2' : '1')};
  display: flex;
  align-items: center;
  justify-content: center;
`
