import { BigNumber as BN } from 'bignumber.js';
import Web3 from 'web3';
import { Provider } from 'web3/providers';

declare global {
  type BigNumber = BN;
}
