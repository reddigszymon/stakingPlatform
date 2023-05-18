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
  polygon: {
    stakingContractAddress: "", // staking token contract address
    rewardContractAddress: "", // reward token contract Address,
    blockConfirmations: 6,
  },
};

export const developmentChains = ["hardhat", "localhost"];
