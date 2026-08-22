"use client";

import { createContext, useContext } from "react";
import { SITE } from "@/lib/site";

const KakaoHrefContext = createContext(SITE.kakaoOpenChatUrl);

export function KakaoHrefProvider({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <KakaoHrefContext.Provider value={href || SITE.kakaoOpenChatUrl}>
      {children}
    </KakaoHrefContext.Provider>
  );
}

export function useKakaoHref() {
  return useContext(KakaoHrefContext);
}
