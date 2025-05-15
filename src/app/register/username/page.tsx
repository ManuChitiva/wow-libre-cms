import AccountUsernameIngame from "@/components/account/accountIngame/page";
import SuspenseBoundary from "@/components/utilities/suspense-boundary";
import React from "react";

const AccountPage: React.FC = () => (
  <SuspenseBoundary>
    <AccountUsernameIngame />
  </SuspenseBoundary>
);

export default AccountPage;
