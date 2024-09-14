// import jwt from 'jsonwebtoken';

export const setTokenInCookies = (token) => {
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 10 minutes expiration (adjust if needed)
  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Lax`;
};

export const getTokenFromCookies = () => {
  try {
    const cookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));

    if (cookie) {
      const [, token] = cookie.trim().split('=');
      return token;
    }
  } catch (error) {
    console.error('Error parsing token from cookies:', error);
  }

  return null;
};


export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedToken = JSON.parse(window.atob(base64));

  if (!decodedToken || !decodedToken.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

export function removeTokenFromCookies() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

