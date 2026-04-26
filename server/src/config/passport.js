import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import prisma from "../config/prisma.js";

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
        try {
        const email = profile.emails[0].value
        let user = await prisma.user.findUnique({ where: { email } })
        if (user) {
        user = await prisma.user.update({
            where: { email },
            data: {
            githubId: profile.id,
            githubAccessToken: accessToken,
            }
        })
        } else {
        user = await prisma.user.create({
            data: {
            email,
            githubId: profile.id,
            githubAccessToken: accessToken,
            }
        })
        }
        done(null, user)
    } catch (error) {
        done(error, null)
    }
}))

export default passport