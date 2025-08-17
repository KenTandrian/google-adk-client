import { ApiClient } from "./sessions";
import { AdkAgentPart } from "./types";

export class Artifacts {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Lists all artifact names for a given session.
   * @param sessionId The ID of the session to list artifacts for.
   * @returns A list of artifact names for the specified session.
   */
  async listNames(sessionId: string): Promise<string[]> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}/artifacts`
    );
  }

  /**
   * Loads an artifact by its name for a given session.
   * @param sessionId The ID of the session to load the artifact from.
   * @param artifactName The name of the artifact to load.
   * @returns The loaded artifact as an AdkAgentPart object.
   */
  async load(sessionId: string, artifactName: string): Promise<AdkAgentPart> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}/artifacts/${artifactName}`
    );
  }

  /**
   * Deletes an artifact by its name for a given session.
   * @param sessionId The ID of the session to delete the artifact from.
   * @param artifactName The name of the artifact to delete.
   */
  async delete(sessionId: string, artifactName: string): Promise<void> {
    await this.client.request(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}/artifacts/${artifactName}`,
      {
        method: "DELETE",
      }
    );
  }

  /**
   * Lists all versions of an artifact for a given session.
   * @param sessionId The ID of the session to list artifact versions for.
   * @param artifactName The name of the artifact to list versions for.
   * @returns A list of version IDs for the specified artifact.
   */
  async listVersions(
    sessionId: string,
    artifactName: string
  ): Promise<string[]> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}/artifacts/${artifactName}/versions`
    );
  }

  /**
   * Loads a specific version of an artifact for a given session.
   * @param sessionId The ID of the session to load the artifact version from.
   * @param artifactName The name of the artifact to load.
   * @param versionId The ID of the version to load.
   * @returns The loaded artifact version as an AdkAgentPart object.
   */
  async loadVersion(
    sessionId: string,
    artifactName: string,
    versionId: string
  ): Promise<AdkAgentPart> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}/artifacts/${artifactName}/versions/${versionId}`
    );
  }
}
