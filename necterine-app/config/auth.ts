import * as SecureStore from "expo-secure-store";

/**
 * @description A cache for storing tokens (Clerk usage)
 * @example
 * import { tokenCache } from "~/config/auth";
 */
export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
