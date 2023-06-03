"use client";

import { useDynamicContext, UserProfile } from "@dynamic-labs/sdk-react-core";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useTransition,
} from "react";
import { useRoutesApi } from "../api/useRoutesApi";
import { getShortEthAddress } from "../utils/account";
import { removeAccessToken, setAccessToken } from "./set-access-token";
import { getEthAddressesFromVerifiedCredentials } from "./dynamic-payload";
import { getDynamicEnvironmentId } from "./dynamic-config";

interface NewUserProfile {
  profilePicture: string;
  username: string;
}

export interface IUserContext {
  user:
    | (UserProfile & { avatarUrl?: string | null; ethAddresses?: string[] })
    | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  login: () => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);
UserContext.displayName = "UserContext";

export const UserProvider = (props: PropsWithChildren) => {
  // transition
  const [_, startTransition] = useTransition();

  const {
    handleLogOut,
    setShowAuthFlow,
    isAuthenticated,
    loadingNetwork,
    user,
    authToken,
  } = useDynamicContext();

  const { data: newUserProfile, isLoading } = useRoutesApi<NewUserProfile>(
    "/routes/profile",
    undefined,
    !isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      startTransition(() => {
        removeAccessToken();
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (authToken) {
      startTransition(() => {
        setAccessToken(authToken);
      });
    }
  }, [authToken]);

  const logout = async () => {
    startTransition(() => {
      removeAccessToken();
    });
    await handleLogOut();
  };

  return (
    <UserContext.Provider
      value={{
        user: user
          ? {
              ...user,
              username:
                user?.ens?.name ||
                newUserProfile?.username ||
                getShortEthAddress(user.verifiedCredentials?.[0]?.address),
              avatarUrl: newUserProfile?.profilePicture || user?.ens?.avatar,
              ethAddresses: getEthAddressesFromVerifiedCredentials(
                user.verifiedCredentials
              ),
            }
          : null,
        isAuthenticated,
        isLoading: isLoading || loadingNetwork,
        login: () => setShowAuthFlow(true),
        logout,
      }}
      {...props}
    />
  );
};
