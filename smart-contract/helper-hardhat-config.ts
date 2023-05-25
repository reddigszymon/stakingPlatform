export interface networkConfigItem {
  stakingContractAddress?: string;
  rewardContractAddress?: string;
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  mumbai: {
    blockConfirmations: 6,
  },
  goerli: {
    stakingContractAddress: "", // staking token contract address
    rewardContractAddress: "", // reward token contract Address
    blockConfirmations: 6,
  },
  polygon: {
    stakingContractAddress: "0xC33B9eAfBd636aB4b185675036210A9a254616eC", // staking token contract address
    rewardContractAddress: "0xC33B9eAfBd636aB4b185675036210A9a254616eC", // reward token contract Address,
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];
