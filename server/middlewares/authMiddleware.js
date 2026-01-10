export const protect = async (req, res, next) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        return next();
    } catch (error) {
        console.log(error);
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
}