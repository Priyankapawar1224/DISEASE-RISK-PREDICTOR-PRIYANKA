// Central API URL config
// During development, uses localhost. After deploying backend to Render,
// set REACT_APP_API_URL in your Vercel environment variables.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export default API_URL;
