// frontend/src/pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']); // Hint to client which method is allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // ✅ Clear the token cookie immediately
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0), // Expire immediately
      })
    );

    return res
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
