import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { dataService } from '../services/api/dataService';
import useThemeStore from '../stores/themeStore';

const RepositoryInvite: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [repositoryInfo, setRepositoryInfo] = useState<{
    id: string;
    name: string;
    permission: string;
  } | null>(null);

  // Extract parameters from URL
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token');
  const repositoryId = urlParams.get('repo');

  useEffect(() => {
    // No token or repository ID? Show error
    if (!token) {
      setIsLoading(false);
      setError('Invalid invitation link. No token provided.');
      return;
    }

    if (!repositoryId) {
      setIsLoading(false);
      setError('Invalid invitation link. No repository ID provided.');
      return;
    }

    // Accept the invitation
    const acceptInvitation = async () => {
      try {
        setIsLoading(true);
        const result = await dataService.acceptRepositoryInvitation(token, repositoryId);

        setRepositoryInfo({
          id: result.repositoryId,
          name: result.repositoryName,
          permission: result.permission
        });

        setInviteAccepted(true);
      } catch (err) {
        console.error('Failed to accept invitation:', err);
        setError('Failed to accept this invitation. It may have expired or been revoked.');
      } finally {
        setIsLoading(false);
      }
    };

    acceptInvitation();
  }, [token, repositoryId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <Card
        variant={darkMode ? 'default' : 'elevated'}
        darkMode={darkMode}
        className="w-full max-w-lg"
      >
        <div className="p-6">
          <Button
            variant="link"
            size="sm"
            darkMode={darkMode}
            onClick={() => navigate('/repositories')}
            className="mb-4 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Return to Repositories
          </Button>

          <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Repository Invitation
          </h1>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Processing your invitation...
              </p>
            </div>
          ) : error ? (
            <div className="py-8">
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-red-900/30' : 'bg-red-100'} mb-4`}>
                  <AlertCircle className={`w-8 h-8 ${darkMode ? 'text-red-500' : 'text-red-600'}`} />
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Invitation Error
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                  {error}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="gradient-primary"
                  darkMode={darkMode}
                  onClick={() => navigate('/repositories')}
                >
                  Go to Repositories
                </Button>
              </div>
            </div>
          ) : inviteAccepted && repositoryInfo ? (
            <div className="py-8">
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-green-900/30' : 'bg-green-100'} mb-4`}>
                  <CheckCircle className={`w-8 h-8 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                </div>
                <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Invitation Accepted!
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mb-2`}>
                  You now have <span className="font-semibold">{repositoryInfo.permission}</span> access to:
                </p>
                <p className={`${darkMode ? 'text-white' : 'text-gray-800'} font-medium text-lg`}>
                  {repositoryInfo.name}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="gradient-primary"
                  darkMode={darkMode}
                  onClick={() => navigate(`/repository/${repositoryInfo.id}`)}
                  className="flex items-center"
                >
                  Go to Repository <ExternalLink className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default RepositoryInvite; 