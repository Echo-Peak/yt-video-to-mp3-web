import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage } from "./pages/MainPage";
import { ApiProvider } from "./providers/ApiProvider";
import { VideoProcessHistoryProvider } from "./providers/VideoProcessHistoryProvider";
import { UrlSelectorProvider } from "./providers/UrlSelectorProvider";
import { AuthProvider } from "react-oidc-context";

jest.mock("react-oidc-context", () => {
  return {
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useAuth: () => ({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      signinRedirect: jest.fn(),
      signoutRedirect: jest.fn(),
      removeUser: jest.fn(),
      events: {},
    }),
  };
});

const mockAuthConfig = {
  authority: "https://example.com",
  client_id: "mock-client-id",
  redirect_uri: "http://localhost/",
  automaticSilentRenew: true,
  post_logout_redirect_uri: "http://localhost/",
  response_type: "code",
  scope: "profile openid email",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

test("Check if YouTube URL input is rendered", () => {
  render(
    <ApiProvider>
      <VideoProcessHistoryProvider>
        <UrlSelectorProvider>
          <AuthProvider {...mockAuthConfig}>
            <MainPage />
          </AuthProvider>
        </UrlSelectorProvider>
      </VideoProcessHistoryProvider>
    </ApiProvider>
  );

  const input = screen.getByRole("textbox", { name: /youTube url/i });
  expect(input).toBeVisible();
});
