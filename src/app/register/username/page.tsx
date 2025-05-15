"use client";

import { Suspense } from "react";
import AccountIngame from "../account-ingame/page";

export default function UsernamePage() {
  return (
    <Suspense fallback={<div>...</div>}>
      <AccountIngame />
    </Suspense>
  );
}
