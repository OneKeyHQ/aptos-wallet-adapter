import {
  AptosWalletErrorResult,
  NetworkName,
  PluginProvider,
} from "@aptos-labs/wallet-adapter-core";
import type {
  AccountInfo,
  AdapterPlugin,
  NetworkInfo,
  SignMessagePayload,
  SignMessageResponse,
  WalletName,
} from "@aptos-labs/wallet-adapter-core";
import { MaybeHexString, Types } from "aptos";

interface OnekeyProvider extends PluginProvider {
  signTransaction(
    transaction: any,
    options?: any
  ): Promise<Uint8Array | AptosWalletErrorResult>;
  generateTransaction(
    sender: MaybeHexString,
    payload: any,
    options?: any
  ): Promise<any>;
}

interface OnekeyWalletInterface {
  aptos?: OnekeyProvider;
}

interface OnekeyWindow extends Window {
  $onekey?: OnekeyWalletInterface;
}

declare const window: OnekeyWindow;

export const OnekeyWalletName = "OneKey" as WalletName<"OneKey">;

export class OnekeyWallet implements AdapterPlugin {
  readonly name = OnekeyWalletName;
  readonly url = "https://onekey.so/";
  readonly icon =
    "data:image/png;base64,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";

  provider: OnekeyWalletInterface | undefined =
    typeof window !== "undefined" ? window.$onekey : undefined;

  readonly providerName = "$onekey";

  async connect(): Promise<AccountInfo> {
    try {
      const accountInfo = await this.provider?.aptos?.connect();
      if (!accountInfo) throw `${OnekeyWalletName} Address Info Error`;
      return accountInfo;
    } catch (error: any) {
      throw error;
    }
  }

  async account(): Promise<AccountInfo> {
    const response = await this.provider?.aptos?.account();
    if (!response) throw `${OnekeyWalletName} Account Error`;
    return response;
  }

  async disconnect(): Promise<void> {
    try {
      await this.provider?.aptos?.disconnect();
    } catch (error: any) {
      throw error;
    }
  }

  async signAndSubmitTransaction(
    transaction: Types.TransactionPayload,
    options?: any
  ): Promise<{ hash: Types.HexEncodedBytes }> {
    try {
      const response = await this.provider?.aptos?.signAndSubmitTransaction(
        transaction,
        options
      );
      if ((response as AptosWalletErrorResult).code) {
        throw new Error((response as AptosWalletErrorResult).message);
      }
      return response as { hash: Types.HexEncodedBytes };
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async signTransaction(
    transaction: Types.TransactionPayload,
    options?: any
  ): Promise<Uint8Array | AptosWalletErrorResult> {
    try {
      const signer = await this.account();
      const tx = await this.provider?.aptos?.generateTransaction(
        signer.address,
        transaction,
        options
      );
      if (!tx)
        throw new Error(
          "Cannot generate transaction"
        ) as AptosWalletErrorResult;
      const response = await this.provider?.aptos?.signTransaction(tx);
      if (!response) {
        throw new Error("No response") as AptosWalletErrorResult;
      }
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async signMessage(message: SignMessagePayload): Promise<SignMessageResponse> {
    try {
      if (typeof message !== "object" || !message.nonce) {
        `${OnekeyWalletName} Invalid signMessage Payload`;
      }
      const response = await this.provider?.aptos?.signMessage(message);
      if (response) {
        return response;
      } else {
        throw `${OnekeyWalletName} Sign Message failed`;
      }
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async network(): Promise<NetworkInfo> {
    try {
      const response = await this.provider?.aptos?.network();
      if (!response) throw `${OnekeyWalletName} Network Error`;
      return {
        name: response as NetworkName,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async onNetworkChange(callback: any): Promise<void> {
    try {
      const handleNetworkChange = async (
        network: NetworkInfo
      ): Promise<void> => {
        callback({
          name: network.name,
          chainId: network.chainId,
          api: undefined,
        });
      };
      await this.provider?.aptos?.onNetworkChange(handleNetworkChange);
    } catch (error: any) {
      const errMsg = error.message;
      throw errMsg;
    }
  }

  async onAccountChange(callback: any): Promise<void> {
    try {
      const handleAccountChange = async (
        newAccount: AccountInfo
      ): Promise<void> => {
        if (newAccount?.publicKey) {
          callback({
            publicKey: newAccount.publicKey,
            address: newAccount.address,
          });
        } else {
          const response = await this.connect();
          callback({
            address: response?.address,
            publicKey: response?.publicKey,
          });
        }
      };
      await this.provider?.aptos?.onAccountChange(handleAccountChange);
    } catch (error: any) {
      console.log(error);
      const errMsg = error.message;
      throw errMsg;
    }
  }
}
