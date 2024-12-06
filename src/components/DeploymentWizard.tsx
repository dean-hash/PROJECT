import React, { useState } from 'react';
import { deployToEnvironment, getApiKeyInstructions } from '../services/deploymentService';
import { AlertCircle, Loader, ExternalLink } from 'lucide-react';

const environments = [
  { name: 'StackBlitz', value: 'stackblitz' },
  { name: 'GitHub', value: 'github' },
  { name: 'Google Cloud', value: 'google-cloud' },
  { name: 'Microsoft Azure', value: 'azure' },
  { name: 'Heroku', value: 'heroku' },
  { name: 'Netlify', value: 'netlify' },
];

const DeploymentWizard: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyInstructions, setApiKeyInstructions] = useState('');

  const handleEnvironmentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const env = e.target.value;
    setSelectedEnvironment(env);
    if (env) {
      const instructions = await getApiKeyInstructions(env);
      setApiKeyInstructions(instructions);
    } else {
      setApiKeyInstructions('');
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('Deploying...');
    setError(null);
    try {
      const result = await deployToEnvironment(selectedEnvironment, apiToken);
      setDeploymentStatus(`Deployment successful! Your application is now live at: ${result.url}`);
    } catch (err) {
      console.error('Deployment error:', err);
      setError('Deployment failed. Please check your credentials and try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Deployment Wizard</h3>
        <p className="mt-1 text-sm text-gray-500">
          Deploy your Automated Affiliate Workflow application to your preferred environment.
        </p>
        <div className="mt-5 space-y-6">
          <div>
            <label htmlFor="environment" className="block text-sm font-medium text-gray-700">
              Select Deployment Environment
            </label>
            <select
              id="environment"
              value={selectedEnvironment}
              onChange={handleEnvironmentChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Choose an environment...</option>
              {environments.map((env) => (
                <option key={env.value} value={env.value}>{env.name}</option>
              ))}
            </select>
          </div>
          {apiKeyInstructions && (
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExternalLink className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">API Key Instructions</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p dangerouslySetInnerHTML={{ __html: apiKeyInstructions }}></p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <label htmlFor="apiToken" className="block text-sm font-medium text-gray-700">API Token</label>
            <input
              type="password"
              id="apiToken"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Paste your API token here"
            />
          </div>
          <button
            onClick={handleDeploy}
            disabled={!selectedEnvironment || !apiToken || isDeploying}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isDeploying ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Deploying...
              </>
            ) : (
              'Deploy Application'
            )}
          </button>
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          {deploymentStatus && !error && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
              <p className="text-sm text-green-700">{deploymentStatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentWizard;