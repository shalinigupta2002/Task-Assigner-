import prisma from "../configs/prisma.js";




export const getUserWorkspaces = async (req, res) => {
    try {
        const { userId } = await req.auth();
        
        const workspaces = await prisma.workspace.findMany({
            where: {
                members: {
                    some: {
                        userId: userId,
                    },
                }
            },
            include: {
                members: {include: {user: true}}, 
                projects:{
                    include: {
                        tasks: {include: {assignee: true, comments: {include: {user: true}}}},
                        members: {include: {user: true}}
                    }
                },
                owner: true
            },
        });
        res.json(workspaces);
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        res.status(500).json({ error: 'Failed to fetch workspaces' });
    }
}

// add member to workspace
// export const addMember = async (req, res) => {
//     try {
//         const { userId} = await req.auth();
//         const {email, workspaceId, role, message} = req.body;
//         const user = await prisma.user.findUnique({ where: { email } });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
       
//         if (!workspaceId || !role) {
//             return res.status(400).json({ message: 'Missing required parameters' });
//         }
//         if(!["ADMIN", "MEMBER"].includes(role)){
//             return res.status(400).json({ message: 'Invalid role' });
//         }

//         // fetch workspace
//         const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
//         if (!workspace) {
//             return res.status(404).json({ error: 'Workspace not found' });
//         }

//         if(!workspace.members.find((member) => member.userId === userId && member.role === "ADMIN")){
//             return res.status(401).json({ message: 'You are not a member of this workspace' });
//         }
//         const existingMember = workspace.Members.find((member) => member.userId === user.id);
//         if (existingMember) {
//             return res.status(400).json({ message: 'User is already a member of this workspace' });
//         }

//         const member = await prisma.workspaceMember.create({
//             data: {
//                 userId: user.id,
//                 workspaceId,
//                 role,
//                 message
//             },
//         });
//         res.json({member, message: "Member added successfully"});
//     } catch (error) {
//         console.error('Error adding member to workspace:', error);
//         res.status(500).json({ error: 'Failed to add member to workspace' });
//     }
// }

export const addMember = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { email, workspaceId, role, message } = req.body;

        // 1. Basic validation
        if (!workspaceId || !role || !email) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        // 2. Role validation
        if (!["ADMIN", "MEMBER"].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // 3. User dhoondo jise add karna hai
        const userToAdd = await prisma.user.findUnique({ where: { email } });
        if (!userToAdd) {
            return res.status(404).json({ error: 'User to add not found' });
        }

        // 4. Workspace fetch karo MEMBERS ke saath (Permissions check ke liye zaroori hai)
        const workspace = await prisma.workspace.findUnique({ 
            where: { id: workspaceId },
            include: { members: true } // Yeh zaroori hai!
        });

        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }

        // 5. Check karo ki request karne wala banda khud ADMIN hai ya nahi
        const requester = workspace.members.find((m) => m.userId === userId);
        if (!requester || requester.role !== "ADMIN") {
            return res.status(403).json({ message: 'Only admins can add members' });
        }

        // 6. Check karo ki user pehle se member toh nahi hai
        const isAlreadyMember = workspace.members.find((m) => m.userId === userToAdd.id);
        if (isAlreadyMember) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        // 7. Member create karo
        const newMember = await prisma.workspaceMember.create({
            data: {
                userId: userToAdd.id,
                workspaceId,
                role,
                // message field aapke schema mein hona chahiye
            },
        });

        res.json({ member: newMember, message: "Member added successfully" });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}