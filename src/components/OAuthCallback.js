import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleOAuthCallback = async () => {
      // Parse the URL to get the code from the query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Send the code to your backend to exchange for an access token
          const response = await Axios.post('/api/google-auth', { code });

          console.log('OAuth token response:', response.data);
          
          // Navigate to home or any other route after handling OAuth
          navigate('/');
        } catch (error) {
          console.error('Error handling OAuth callback:', error);
        }
      } else {
        console.error('No OAuth code found');
      }
    };

    handleGoogleOAuthCallback();
  }, [navigate]);

  return (
    <div>
      <h2>Handling Google OAuth Callback...</h2>
    </div>
  );
};

export default OAuthCallback;
