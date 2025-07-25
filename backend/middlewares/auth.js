const { clerkClient } = require('@clerk/express');

const auth = async (req, res, next) => {
    try {
        const { userId, has } = await req.auth();

        if (!userId || typeof has !== 'function') {
            return res.json({ success: false, message: 'Unauthorized' });
        }

        const hasPremiumPlan = await has({ plan: 'premium' });
        const user = await clerkClient.users.getUser(userId);

        if (!hasPremiumPlan && user.privateMetadata && user.privateMetadata.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            });
            req.free_usage = 0;
        }

        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

module.exports = auth;
