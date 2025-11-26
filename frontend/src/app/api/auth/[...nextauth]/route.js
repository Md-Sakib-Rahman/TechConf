import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        
        try {
            
            const res = await axios.post(`${backendUrl}/auth/login`, credentials);
            
            
            const data = res.data;
            console.log("login req result",data)
            
            if (data.token) {
              return { 
                  ...data.user, 
                  apiToken: data.token 
              };
            }
            return null;
        } catch (e) {
            
            console.error("Login failed:", e.response?.data?.message || e.message);
            return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      
      if (account?.provider === "google") {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
          
          const res = await axios.post(`${backendUrl}/auth/googleSignin`, {
              email: user.email, 
              name: user.name,
              imageURL: user.image 
          });

          const data = res.data;
          
          if (data.token) {
            user.apiToken = data.token;
            
            return true;
          }
        } catch (error) {
          console.error("Google Sync failed", error.response?.data?.message || error.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
     
      if (user) {
        token.accessToken = user.apiToken;
        token.id = user._id; 
      }
      return token;
    },
    async session({ session, token }) {
      
      session.accessToken = token.accessToken;
      if (token.id) {
          session.user._id = token.id;
      }
      return session;
    }
  },
  
  session: {
      strategy: "jwt",
  },
  pages: {
      signIn: '/login', 
  }
});

export { handler as GET, handler as POST };