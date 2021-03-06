import { Flex, lightColors, Text } from 'gol-uikit'
import { ContextApi } from 'contexts/Localization/types'
import React from 'react'
import { SaleStatusEnum, UserStatusEnum } from '../../types'

type PreEventProps = {
  t: ContextApi['t']
  saleStatus: SaleStatusEnum
  userStatus: UserStatusEnum
  numberTicketsOfUser: number
  numberTokensOfUser: number
}

const MintText: React.FC<PreEventProps> = ({ t, saleStatus, userStatus, numberTicketsOfUser, numberTokensOfUser }) => {
  const isUserUnconnected = userStatus === UserStatusEnum.UNCONNECTED
  const displayMintText =
    (userStatus === UserStatusEnum.PROFILE_ACTIVE_GEN0 && saleStatus === SaleStatusEnum.Presale) ||
    saleStatus >= SaleStatusEnum.Sale ||
    numberTicketsOfUser > 0
  const hasNoTicketOrToken = numberTicketsOfUser === 0 && numberTokensOfUser === 0
  return displayMintText ? (
    <Flex flexDirection="column" mb="24px">
      <Flex>
        <Text fontSize="16px" color={lightColors.invertedContrast} mr="2px">
          {t('Your Mint Tickets: ')}
        </Text>
        <Text fontSize="16px" color={numberTicketsOfUser > 0 ? lightColors.warning : lightColors.failure} bold>
          {numberTicketsOfUser}
        </Text>
      </Flex>
      {saleStatus === SaleStatusEnum.Claim && (isUserUnconnected || hasNoTicketOrToken) && (
        <Text mt="24px" fontSize="16px" color={lightColors.warning} bold>
          {t(
            isUserUnconnected
              ? 'Redeem Mint Tickets to mint NFTs'
              : 'Sorry, you can’t mint any NFTs! Better luck next time.',
          )}
        </Text>
      )}
    </Flex>
  ) : null
}

export default MintText
