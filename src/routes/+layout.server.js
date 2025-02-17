import { redirect } from '@sveltejs/kit';

export async function load({ fetch, cookies }) {
  let accessToken = cookies.get('access');
  const refreshToken = cookies.get('refresh');

  // Attempt token refresh if access is missing but refresh exists
  if (!accessToken && refreshToken) {
    try {
      // Try to refresh access token
      const refreshRes = await fetch(
        `${import.meta.env.VITE_DJANGO_API_URL}/api/auth/refresh/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken })
        }
      );

      if (!refreshRes.ok) throw new Error('Refresh failed');

      const { access } = await refreshRes.json();
      accessToken = access;
      cookies.set('access', access, { 
        path: '/', 
        sameSite: 'Strict',
        httpOnly: false,  // 👈 Explicitly allow client-side access
        expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      });
    } catch (error) {
      cookies.delete('access', { path: '/' });
      cookies.delete('refresh', { path: '/' });
      throw redirect(307, '/login');
    }
  }

  // If no valid access token after potential refresh
  if (!accessToken) {
    return { user: null };
  }

  try {
    // Verify the (potentially new) access token
    const verifyRes = await fetch(
      `${import.meta.env.VITE_DJANGO_API_URL}/api/auth/verify/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accessToken })
      }
    );

    if (!verifyRes.ok) throw new Error('Invalid token');

    // Get user data with valid token
    const userRes = await fetch(
      `${import.meta.env.VITE_DJANGO_API_URL}/api/auth/me/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    // console.log(userRes.json())
    return { user: await userRes.json() };
  } catch (error) {
      cookies.delete('access', { path: '/' });
      cookies.delete('refresh', { path: '/' });
      throw redirect(307, '/login');
  }
}