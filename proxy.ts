import { clerkMiddleware } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export default clerkMiddleware(async (auth) =>{
  const { userId, orgId } = await auth();

  if (userId && !orgId) {
    try {
      const client = await clerkClient();
      //check if user has any org

      const { data: organization } = await client.users.getOrganizationMembershipList({
        userId});

        if (organization && organization.length > 0) {
          return NextResponse.next();
        }
        const user = await client.users.getUser(userId);
        const orgName = user.fullName ? `${user.fullName}'s Organization` : user.firstName ? `${user.firstName}'s Organization` : user.username ? `${user.username}'s Organization` : user.emailAddresses[0].emailAddress ? `${user.emailAddresses[0].emailAddress.split('@')[0]}'s Organization` : `My Organization`;
        await client.organizations.createOrganization({
          name: orgName,
          createdBy: userId,
        });
        console.log("Auto-created organization for user:", userId);
    } catch (error) {
      console.error("Error auto-creating organization for user:", userId, error);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};