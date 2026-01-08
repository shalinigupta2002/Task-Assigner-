import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({event}) => {
        const {data} = event
        await Prisma.user.create({
            data: {
                id: data.id,
                email: data?.email_addresses[0].email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
                
            }
        })
        // Do something with the event
    }

)

const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event}) => {
        const {data} = event
        await Prisma.user.delete({
            where: {
                id: data.id,
                
                
            }
        })
        // Do something with the event
    }

)
const syncWorkspaceCreation = inngest.createFunction(
    {id: 'sync-workspace-from-clerk'},
    {event: 'clerk/workspace.created'},
    async ({event}) => {
        const {data} = event
        await Prisma.workspace.create({
            data: {
                id: data.id,
                name: data.name,
                slug: data.slug,
                ownerId: data.created_by,
                image: data.image_url,
                
            }
        })

        await prisma.workspaceMember.create({
            data: {
                userId: data.created_by,
                workspaceId: data.id,
                role: "ADMIN",
            }
        })
        // Do something with the event
    }
)
//inngest function to update wokspace from database
const syncWorkspaceUpdation = inngest.createFunction(
    {id: 'update-workspace-with-clerk'},
    {event: 'clerk/organization.updated'},
    async ({event}) => {
        const {data} = event
        await Prisma.workspace.update({
            where: {
                id: data.id, 
            },
            data: {
                name: data.name,
                slug: data.slug,
                image_url: data.image_url,
            }
        })
        // Do something with the event
    }
)

const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const {data} = event
        await Prisma.user.update({
            where: {
                id: data.id,
                
            },
            data: {
                email: data?.email_addresses[0].email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
                
            }
        })
        
        
    }


)
//inngest function to delete wokspace from database

const syncWorkspaceDeletion = inngest.createFunction(
     { id: 'delete-workspace-from-clerk' },
     { event: 'clerk/organization.deleted' },
     async ({ event }) => {
         const { data } = event
         await Prisma.workspace.delete({
             where: {
                 id: data.id,
             }
         })
     }
 )

//  Inngest function to save workspace member data to a database
const syncWorkspaceMemberCreation = inngest.createFunction(
    {id: 'sync-workspace-member-from-clerk'},
    {event: 'clerk/workspace_member.created'},
    async ({event}) => {
        const {data} = event
        await Prisma.workspaceMember.create({
            data: {
                id: data.id,
                name: data.name,
                slug: data.slug,
                ownerId: data.created_by,
                image: data.image_url,
            }
        })
        // add creator as admin member
        await prisma.workspaceMember.create({
            data: {
                userId: data.user_id,
                workspaceId: data.organization_id,
                role: String(data.role_name).toUpperCase(),
            }
        })
        // Do something with the event
    }   
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    syncWorkspaceCreation,
    syncWorkspaceDeletion,
    syncWorkspaceUpdation,
    syncWorkspaceMemberCreation
];