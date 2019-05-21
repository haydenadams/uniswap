import React, { useState, useCallback } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import OversizedPanel from '../../components/OversizedPanel'
import Dropdown from '../../assets/images/dropdown-blue.svg'
import Modal from '../../components/Modal'
import { useBodyKeyDown } from '../../hooks'

import './pool.scss'

const poolTabOrder = [
  {
    path: '/add-liquidity',
    textKey: 'addLiquidity',
    regex: /\/add-liquidity/
  },
  {
    path: '/remove-liquidity',
    textKey: 'removeLiquidity',
    regex: /\/remove-liquidity/
  },
  {
    path: '/create-exchange',
    textKey: 'createExchange',
    regex: /\/create-exchange.*/
  }
]

function ModeSelector({ location: { pathname }, history }) {
  const { t } = useTranslation()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const activeTabKey = poolTabOrder[poolTabOrder.findIndex(({ regex }) => pathname.match(regex))].textKey

  const navigate = useCallback(
    direction => {
      const tabIndex = poolTabOrder.findIndex(({ regex }) => pathname.match(regex))
      history.push(poolTabOrder[(tabIndex + poolTabOrder.length + direction) % poolTabOrder.length].path)
    },
    [pathname, history]
  )
  const navigateRight = useCallback(() => {
    navigate(1)
  }, [navigate])
  const navigateLeft = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useBodyKeyDown('ArrowDown', navigateRight, modalIsOpen)
  useBodyKeyDown('ArrowUp', navigateLeft, modalIsOpen)

  return (
    <OversizedPanel hideTop>
      <div
        className="pool__liquidity-container"
        onClick={() => {
          setModalIsOpen(true)
        }}
      >
        <span className="pool__liquidity-label">{t(activeTabKey)}</span>
        <img src={Dropdown} alt="dropdown" />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onDismiss={() => {
          setModalIsOpen(false)
        }}
        minHeight={null}
      >
        <div className="pool-modal">
          {poolTabOrder.map(({ path, textKey, regex }) => (
            <NavLink
              key={path}
              to={path}
              className="pool-modal__item"
              activeClassName="pool-modal__item--selected"
              isActive={(_, { pathname }) => pathname.match(regex)}
              onClick={() => {
                setModalIsOpen(false)
              }}
            >
              {t(textKey)}
            </NavLink>
          ))}
        </div>
      </Modal>
    </OversizedPanel>
  )
}

export default withRouter(ModeSelector)
