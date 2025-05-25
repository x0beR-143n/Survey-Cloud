const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

class SecretManager {
  constructor() {
    this.client = new SecretManagerServiceClient();
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.PROJECT_ID || "surveyplatformproject";
    this.cachedSecrets = new Map();
  }

  async getSecret(secretName) {
    try {
      // Check cache first
      if (this.cachedSecrets.has(secretName)) {
        return this.cachedSecrets.get(secretName);
      }

      if (!this.projectId) {
        throw new Error('GOOGLE_CLOUD_PROJECT or PROJECT_ID environment variable is not set');
      }

      const name = `projects/${this.projectId}/secrets/${secretName}/versions/latest`;
      const [version] = await this.client.accessSecretVersion({ name });
      const secretValue = version.payload.data.toString();
      
      // Cache the secret
      this.cachedSecrets.set(secretName, secretValue);
      
      return secretValue;
    } catch (error) {
      console.error(`Error accessing secret ${secretName}:`, error);
      throw error;
    }
  }

  async getAllSecrets() {
    try {
      const secretNames = ['db-password', 'db-user', 'db-name', 'db-host'];
      const secrets = await Promise.all(
        secretNames.map(name => this.getSecret(name))
      );

      return {
        DB_PASSWORD: secrets[0],
        DB_USER: secrets[1],
        DB_NAME: secrets[2],
        DB_HOST: secrets[3],
      };
    } catch (error) {
      console.error('Error getting secrets:', error);
      throw error;
    }
  }

  // Method to clear cache if needed
  clearCache() {
    this.cachedSecrets.clear();
  }
}

module.exports = new SecretManager();