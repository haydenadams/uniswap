import React, { useEffect, useState } from 'react'
import { FeeAmount } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import { DynamicSection } from 'pages/AddLiquidity/styled'
import { TYPE } from 'theme'
import { RowBetween } from 'components/Row'
import { ButtonGray, ButtonRadioChecked } from 'components/Button'
import styled, { keyframes } from 'styled-components/macro'
import Badge from 'components/Badge'
import { OutlineCard } from 'components/Card'
import Loader from 'components/Loader'
import usePrevious from 'hooks/usePrevious'
import { useFeeTierDistribution } from 'hooks/useFeeTierDistribution'

const pulse = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color};
  }

  70% {
    box-shadow: 0 0 0 2px ${color};
  }

  100% {
    box-shadow: 0 0 0 0 ${color};
  }
`

const ResponsiveText = styled(TYPE.label)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
  `};
`

const FocusedOutlineCard = styled(OutlineCard)<{ pulsing: boolean }>`
  animation: ${({ pulsing, theme }) => pulsing && pulse(theme.primary1)} 0.6s linear;
`

const FeeAmountLabel = {
  [FeeAmount.LOW]: {
    label: '0.05',
    description: <Trans>Best for stable pairs.</Trans>,
  },
  [FeeAmount.MEDIUM]: {
    label: '0.3',
    description: <Trans>Best for most pairs.</Trans>,
  },
  [FeeAmount.HIGH]: {
    label: '1',
    description: <Trans>Best for exotic pairs.</Trans>,
  },
}

const FeeTierPercentageBadge = ({ percentage }: { percentage: number | undefined }) => {
  return (
    <Badge>
      <TYPE.label fontSize={12}>
        {Boolean(percentage) ? <Trans>{percentage?.toFixed(0)}% select</Trans> : <Trans>Not created</Trans>}
      </TYPE.label>
    </Badge>
  )
}

export default function FeeSelector({
  disabled = false,
  feeAmount,
  handleFeePoolSelect,
  token0,
  token1,
}: {
  disabled?: boolean
  feeAmount?: FeeAmount
  handleFeePoolSelect: (feeAmount: FeeAmount) => void
  token0?: Token | undefined
  token1?: Token | undefined
}) {
  const { isLoading, isError, largestUsageFeeTier, distributions } = useFeeTierDistribution(token0, token1)

  const [showOptions, setShowOptions] = useState(false)

  const [pulsing, setPulsing] = useState(false)
  const previousFeeAmount = usePrevious(feeAmount)

  useEffect(() => {
    if (feeAmount || isLoading || isError) {
      return
    }

    if (!largestUsageFeeTier) {
      // cannot recommend, open options
      setShowOptions(true)
    } else {
      handleFeePoolSelect(largestUsageFeeTier)
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, handleFeePoolSelect])

  useEffect(() => {
    setShowOptions(false)
  }, [token0, token1])

  useEffect(() => {
    setShowOptions(isError)
  }, [isError])

  useEffect(() => {
    if (feeAmount && previousFeeAmount !== feeAmount) {
      setPulsing(true)
    }
  }, [previousFeeAmount, feeAmount])

  return (
    <AutoColumn gap="16px">
      <DynamicSection gap="md" disabled={disabled}>
        <FocusedOutlineCard pulsing={pulsing} onAnimationEnd={() => setPulsing(false)}>
          <RowBetween>
            <AutoColumn>
              {!feeAmount || isLoading ? (
                <>
                  <TYPE.label>
                    <Trans>Fee tier</Trans>
                  </TYPE.label>
                  <TYPE.main fontWeight={400} fontSize="12px" textAlign="left">
                    <Trans>The % you will earn in fees.</Trans>
                  </TYPE.main>
                </>
              ) : (
                <TYPE.label>
                  <Trans>{FeeAmountLabel[feeAmount].label}% fee tier</Trans>
                </TYPE.label>
              )}
            </AutoColumn>

            {isLoading ? (
              <Loader size="20px" />
            ) : (
              <ButtonGray onClick={() => setShowOptions(!showOptions)} width="auto" padding="4px" borderRadius="6px">
                {showOptions ? <Trans>Hide</Trans> : <Trans>Edit</Trans>}
              </ButtonGray>
            )}
          </RowBetween>
        </FocusedOutlineCard>

        {showOptions && (
          <RowBetween>
            <ButtonRadioChecked
              width="32%"
              active={feeAmount === FeeAmount.LOW}
              onClick={() => handleFeePoolSelect(FeeAmount.LOW)}
            >
              <AutoColumn gap="sm" justify="flex-start">
                <AutoColumn justify="flex-start">
                  <ResponsiveText>
                    <Trans>0.05% fee</Trans>
                  </ResponsiveText>
                  <TYPE.main fontWeight={400} fontSize="12px" textAlign="left">
                    <Trans>Best for stable pairs.</Trans>
                  </TYPE.main>
                </AutoColumn>

                {distributions && <FeeTierPercentageBadge percentage={distributions[FeeAmount.LOW]} />}
              </AutoColumn>
            </ButtonRadioChecked>
            <ButtonRadioChecked
              width="32%"
              active={feeAmount === FeeAmount.MEDIUM}
              onClick={() => handleFeePoolSelect(FeeAmount.MEDIUM)}
            >
              <AutoColumn gap="sm" justify="flex-start">
                <AutoColumn justify="flex-start">
                  <ResponsiveText>
                    <Trans>0.3% fee</Trans>
                  </ResponsiveText>
                  <TYPE.main fontWeight={400} fontSize="12px" textAlign="left">
                    <Trans>Best for most pairs.</Trans>
                  </TYPE.main>
                </AutoColumn>

                {distributions && <FeeTierPercentageBadge percentage={distributions[FeeAmount.MEDIUM]} />}
              </AutoColumn>
            </ButtonRadioChecked>
            <ButtonRadioChecked
              width="32%"
              active={feeAmount === FeeAmount.HIGH}
              onClick={() => handleFeePoolSelect(FeeAmount.HIGH)}
            >
              <AutoColumn gap="sm" justify="flex-start">
                <AutoColumn justify="flex-start">
                  <ResponsiveText>
                    <Trans>1% fee</Trans>
                  </ResponsiveText>
                  <TYPE.main fontWeight={400} fontSize="12px" textAlign="left">
                    <Trans>Best for exotic pairs.</Trans>
                  </TYPE.main>
                </AutoColumn>

                {distributions && <FeeTierPercentageBadge percentage={distributions[FeeAmount.HIGH]} />}
              </AutoColumn>
            </ButtonRadioChecked>
          </RowBetween>
        )}
      </DynamicSection>
    </AutoColumn>
  )
}
