// // import { Inngest } from "inngest";

// // // Create a client to send and receive events
// // export const inngest = new Inngest({ id: "my-app" });

// // const syncUserCreation = inngest.createFunction(
// //     {id: 'sync-user-from-clerk'},
// //     {event: 'clerk/user.created'},
// //     async ({event}) => {
// //         const {data} = event
// //         await prisma.user.create({
// //             data: {
// //                 id: data.id,
// //                 email: data?.email_addresses[0].email_address,
// //                 name: data?.first_name + " " + data?.last_name,
// //                 image: data?.image_url,
                
// //             }
// //         })
// //         // Do something with the event
// //     }

// // )

// // const syncUserDeletion = inngest.createFunction(
// //     {id: 'delete-user-with-clerk'},
// //     {event: 'clerk/user.deleted'},
// //     async ({event}) => {
// //         const {data} = event
// //         await prisma.user.delete({
// //             where: {
// //                 id: data.id,
                
                
// //             }
// //         })
// //         // Do something with the event
// //     }

// // )
// // const syncWorkspaceCreation = inngest.createFunction(
// //     {id: 'sync-workspace-from-clerk'},
// //     {event: 'clerk/workspace.created'},
// //     async ({event}) => {
// //         const {data} = event
// //         await prisma.workspace.create({
// //             data: {
// //                 id: data.id,
// //                 name: data.name,
// //                 slug: data.slug,
// //                 ownerId: data.created_by,
// //                 image: data.image_url,
                
// //             }
// //         })

// //         await prisma.workspaceMember.create({
// //             data: {
// //                 userId: data.created_by,
// //                 workspaceId: data.id,
// //                 role: "ADMIN",
// //             }
// //         })
// //         // Do something with the event
// //     }
// // )
// // //inngest function to update wokspace from database
// // const syncWorkspaceUpdation = inngest.createFunction(
// //     {id: 'update-workspace-with-clerk'},
// //     {event: 'clerk/organization.updated'},
// //     async ({event}) => {
// //         const {data} = event
// //         await prisma.workspace.update({
// //             where: {
// //                 id: data.id, 
// //             },
// //             data: {
// //                 name: data.name,
// //                 slug: data.slug,
// //                 image_url: data.image_url,
// //             }
// //         })
// //         // Do something with the event
// //     }
// // )

// // const syncUserUpdation = inngest.createFunction(
// //     {id: 'update-user-from-clerk'},
// //     {event: 'clerk/user.updated'},
// //     async ({event}) => {
// //         const {data} = event
// //         await prisma.user.update({
// //             where: {
// //                 id: data.id,
                
// //             },
// //             data: {
// //                 email: data?.email_addresses[0].email_address,
// //                 name: data?.first_name + " " + data?.last_name,
// //                 image: data?.image_url,
                
// //             }
// //         })
        
        
// //     }


// // )
// // //inngest function to delete wokspace from database

// // const syncWorkspaceDeletion = inngest.createFunction(
// //      { id: 'delete-workspace-from-clerk' },
// //      { event: 'clerk/organization.deleted' },
// //      async ({ event }) => {
// //          const { data } = event
// //          await prisma.workspace.delete({
// //              where: {
// //                  id: data.id,
// //              }
// //          })
// //      }
// //  )

// // //  Inngest function to save workspace member data to a database
// // const syncWorkspaceMemberCreation = inngest.createFunction(
// //     {id: 'sync-workspace-member-from-clerk'},
// //     {event: 'clerk/workspace_member.created'},
// //     async ({event}) => {
// //         const {data} = event
// //         await Prisma.workspaceMember.create({
// //             data: {
// //                 id: data.id,
// //                 name: data.name,
// //                 slug: data.slug,
// //                 ownerId: data.created_by,
// //                 image: data.image_url,
// //             }
// //         })
// //         // add creator as admin member
// //         await prisma.workspaceMember.create({
// //             data: {
// //                 userId: data.user_id,
// //                 workspaceId: data.organization_id,
// //                 role: String(data.role_name).toUpperCase(),
// //             }
// //         })
// //         // Do something with the event
// //     }   
// // )

// // // Create an empty array where we'll export future Inngest functions
// // export const functions = [
// //     syncUserCreation,
// //     syncUserDeletion,
// //     syncUserUpdation,
// //     syncWorkspaceCreation,
// //     syncWorkspaceDeletion,
// //     syncWorkspaceUpdation,
// //     syncWorkspaceMemberCreation
// // ];

// // import { Inngest } from "inngest";
// // import { prisma } from "../configs/prisma"; // ✅ Fix: Import missing prisma client
// // import { PrismaClient } from "@prisma/client";
// // export const prisma = new PrismaClient();
// // export const inngest = new Inngest({ id: "my-app" });

// // const { PrismaClient } = pkg;
// // import pkg from '../../generated/prisma/client/index.js';
// // // Prisma instance ko initialize karein
// // const { PrismaClient } = pkg;
// // export const prisma = new PrismaClient();

// // export const inngest = new Inngest({ id: "my-app" });
// // // ... baaki functions ...

// // const syncWorkspaceMemberCreation = inngest.createFunction(
// //     {id: 'sync-workspace-member-from-clerk'},
// //     {event: 'clerk/workspace_member.created'},
// //     async ({event}) => {
// //         const {data} = event
// //         // ✅ Fix: Capital 'P' ko small 'p' karein
// //         await prisma.workspaceMember.create({ 
// //             data: {
// //                 userId: data.user_id,
// //                 workspaceId: data.organization_id,
// //                 role: String(data.role_name).toUpperCase(),
// //             }
// //         })
// //     }   
// // )

// // export const functions = [
// //     syncUserCreation,
// //     syncUserDeletion,
// //     syncUserUpdation,
// //     syncWorkspaceCreation,
// //     syncWorkspaceDeletion,
// //     syncWorkspaceUpdation,
// //     syncWorkspaceMemberCreation
// // ];

// // import { Inngest } from "inngest";
// // import pkg from '../generated/prisma/client/index.js'; 

// // const { PrismaClient } = pkg;

// // // 🛠️ Fix: Add explicit datasource to prevent initialization error
// // export const prisma = new PrismaClient({
// //   datasources: {
// //     db: {
// //       url: process.env.DATABASE_URL,
// //     },
// //   },
// // });

// // export const inngest = new Inngest({ id: "my-app" });
// // import { Inngest } from "inngest";
// // // 1. Default import use karein (ESM compatibility ke liye)
// // import pkg from '@prisma/client';

// // // 2. pkg se PrismaClient nikaalein
// // const { PrismaClient } = pkg;

// // // 3. Prisma ko initialize karein
// // export const prisma = new PrismaClient();

// // export const inngest = new Inngest({ id: "my-app" });
// import { Inngest } from "inngest";
// import { prisma } from "../configs/prisma.js"; // Jo abhi step 1 mein theek kiya

// export const inngest = new Inngest({ id: "my-app" });
// // ... baaki functions ...
// const syncUserCreation = inngest.createFunction(
//     {id: 'sync-user-from-clerk'},
//     {event: 'clerk/user.created'},
//     async ({event}) => {
//         const {data} = event;
//         await prisma.user.create({
//             data: {
//                 id: data.id,
//                 email: data?.email_addresses[0].email_address,
//                 name: data?.first_name + " " + data?.last_name,
//                 image: data?.image_url,
//             }
//         });
//     }
// );

// // ... (Yahan syncUserDeletion, syncUserUpdation, syncWorkspaceCreation, syncWorkspaceDeletion, syncWorkspaceUpdation define karein)

// const syncWorkspaceMemberCreation = inngest.createFunction(
//     {id: 'sync-workspace-member-from-clerk'},
//     {event: 'clerk/workspace_member.created'},
//     async ({event}) => {
//         const {data} = event;
//         await prisma.workspaceMember.create({ 
//             data: {
//                 // Clerk organization_id ko workspaceId se map karein
//                 userId: data.user_id,
//                 workspaceId: data.organization_id, 
//                 role: String(data.role_name).toUpperCase(),
//             }
//         });
//     }   
// );

// // 🛠️ Fix: Ensure all listed functions are defined above
// export const functions = [
//     syncUserCreation,
//     // syncUserDeletion, // Inhe tabhi uncomment karein jab upar defined hon
//     // syncUserUpdation,
//     // syncWorkspaceCreation,
//     // syncWorkspaceDeletion,
//     // syncWorkspaceUpdation,
//     syncWorkspaceMemberCreation
// ];

import { Inngest } from "inngest";
import { prisma } from "../configs/prisma.js"; 

export const inngest = new Inngest({ id: "my-app" });

// 1. Sync User Creation
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { data } = event;
        await prisma.user.create({
            data: {
                id: data.id,
                email: data?.email_addresses[0].email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
            }
        });
    }
);

// 2. Sync User Updation
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { data } = event;
        await prisma.user.update({
            where: { id: data.id },
            data: {
                email: data?.email_addresses[0].email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
            }
        });
    }
);

// 3. Sync Workspace Creation
const syncWorkspaceCreation = inngest.createFunction(
    { id: 'sync-workspace-from-clerk' },
    { event: 'clerk/organization.created' }, // Clerk organization events use karta hai
    async ({ event }) => {
        const { data } = event;
        await prisma.workspace.create({
            data: {
                id: data.id,
                name: data.name,
                slug: data.slug,
                ownerId: data.created_by,
                image: data.image_url,
            }
        });

        // Creator ko ADMIN banana zaruri hai
        await prisma.workspaceMember.create({
            data: {
                userId: data.created_by,
                workspaceId: data.id,
                role: "ADMIN",
            }
        });
    }
);

// 4. Sync Workspace Member Creation
const syncWorkspaceMemberCreation = inngest.createFunction(
    { id: 'sync-workspace-member-from-clerk' },
    { event: 'clerk/workspace_member.created' },
    async ({ event }) => {
        const { data } = event;
        await prisma.workspaceMember.create({ 
            data: {
                userId: data.user_id,
                workspaceId: data.organization_id, 
                role: String(data.role_name).toUpperCase(),
            }
        });
    }   
);

// 5. Sync Workspace Deletion
const syncWorkspaceDeletion = inngest.createFunction(
    { id: 'delete-workspace-from-clerk' },
    { event: 'clerk/organization.deleted' },
    async ({ event }) => {
        const { data } = event;
        await prisma.workspace.delete({
            where: { id: data.id }
        });
    }
);

// Exporting all functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncWorkspaceCreation,
    syncWorkspaceMemberCreation,
    syncWorkspaceDeletion
];