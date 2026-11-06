export { auth as middleware } from "@/app/api/auth/[...nextauth]/route";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/qbank/:path*",
    "/tests/:path*",
    "/results/:path*",
    "/bookmarks/:path*",
    "/chat/:path*",
    "/payments/:path*",
    "/profile/:path*"
  ],
};