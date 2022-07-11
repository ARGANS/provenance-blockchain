// pages/api/[...nextauth].js
import NextAuth from 'next-auth';
import LinkedIn from 'next-auth/providers/linkedin';
import Facebook from 'next-auth/providers/facebook';
import Github from 'next-auth/providers/github';
import Twitter from 'next-auth/providers/twitter';
import jwt from 'next-auth/jwt';
import { useState, useContext } from 'react';
import { host } from '../../../host.config';

export default NextAuth({

  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: host + "/soul.png" // Absolute URL to image
  },

  providers: [

    LinkedIn({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      scope: 'r_liteprofile',
      profile(prof) {
        const profileImage = prof?.profilePicture?.['displayImage~']?.elements[0]?.identifiers?.[0]?.identifier ?? '';
        return {
          id: prof.id,
          name: prof.localizedFirstName + ' ' + prof.localizedLastName,
          image: profileImage,
          provider: "LinkedIn",
          url: "https://www.linkedin.com/",
          picture: null,  
        };
      },
    }),

    Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      profile(prof) {
         const imgURL = prof.profile_image_url_https;
         console.log(imgURL)
         return {
           id: prof.id,
           name: prof.name,
           image: imgURL,
           provider: "Twitter",
           url: "https://twitter.com/i/user/" + prof.id,
         }
      },
    }),

  ],

  secret: process.env.JWT_SECRET,

  session: {
    jwt: true,
  },
  jwt: {
  },
  callbacks: {
    async jwt ({token, user, account, profile, isNewUser}) { 
      if (user) { token.user = user; }
      return token; 
    },
    async session ({session, token, user, account, profile}) {
      session.user = token.user;
      console.log("** Session is ", session);
      return session;
    },
  },
  debug: true,
});

// export default (req, res) => NextAuth(req, res, options)
