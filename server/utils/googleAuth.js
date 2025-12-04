import { google } from "googleapis"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID
const GOOGLE_REDIRECT = process.env.GOOGLE_REDIRECT

export const OAuthGoogle = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID,
    GOOGLE_REDIRECT

)