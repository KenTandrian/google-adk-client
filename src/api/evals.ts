import type {
  ApiClient,
  GetEvalResponse,
  GetEvalResultResponse,
  RunEvalResponse,
} from "../types";

export class Evals {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Adds a session to an evaluation set.
   * @param evalSetId The ID of the evaluation set to add the session to.
   * @param sessionId The ID of the session to add.
   * @param evalId The ID of the evaluation to associate with the session.
   * @param userId The ID of the user who owns the session.
   * @returns The ID of the added session in the evaluation set.
   */
  async addSessionToEvalSet(
    evalSetId: string,
    sessionId: string,
    evalId: string,
    userId: string
  ): Promise<string> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}/add_session`,
      {
        method: "POST",
        body: JSON.stringify({
          evalId: evalId,
          sessionId: sessionId,
          userId: userId,
        }),
      }
    );
  }

  /**
   * Creates a new evaluation set.
   * @param evalSetId The ID of the evaluation set to create.
   * @returns The ID of the created evaluation set.
   */
  async createEvalSet(evalSetId: string): Promise<string> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}`,
      {
        method: "POST",
      }
    );
  }

  /**
   * Deletes an evaluation from a specific evaluation set.
   * @param evalSetId The ID of the evaluation set to delete from.
   * @param evalCaseId The ID of the evaluation to delete.
   * @returns The ID of the deleted evaluation.
   */
  async deleteEval(evalSetId: string, evalCaseId: string): Promise<string> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}/evals/${evalCaseId}`,
      {
        method: "DELETE",
      }
    );
  }

  /**
   * Gets an evaluation from a specific evaluation set.
   * @param evalSetId The ID of the evaluation set to get the evaluation from.
   * @param evalCaseId The ID of the evaluation to get.
   * @returns The requested evaluation.
   */
  async getEval(
    evalSetId: string,
    evalCaseId: string
  ): Promise<GetEvalResponse> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}/evals/${evalCaseId}`
    );
  }

  /**
   * Gets the result of a specific evaluation.
   * @param evalResultId The ID of the evaluation result to get.
   * @returns The requested evaluation result.
   */
  async getEvalResult(evalResultId: string): Promise<GetEvalResultResponse> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_results/${evalResultId}`
    );
  }

  /**
   * Lists all evaluation results.
   * @returns A list of all evaluation results.
   */
  async listEvalResults() {
    return this.client.requestJson(`/apps/${this.client.appName}/eval_results`);
  }

  /**
   * Lists all evaluation sets.
   * @returns A list of all evaluation sets available to the user.
   */
  async listEvalSets(): Promise<string[]> {
    return this.client.requestJson(`/apps/${this.client.appName}/eval_sets`);
  }

  /**
   * Lists all evaluations in a specific evaluation set.
   * @param evalSetId The ID of the evaluation set to list evaluations for.
   * @returns A list of all evaluations in the specified evaluation set.
   */
  async listEvalsInEvalSet(evalSetId: string) {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}/evals`
    );
  }

  /**
   * Runs an evaluation for a specific evaluation set.
   * @param evalSetId The ID of the evaluation set to run.
   * @returns The response from the API.
   */
  async runEval(evalSetId: string): Promise<RunEvalResponse> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}/run_eval`,
      {
        method: "POST",
      }
    );
  }

  /**
   * Updates an evaluation in a specific evaluation set.
   * @param evalSetId The ID of the evaluation set to update.
   * @param evalCaseId The ID of the evaluation to update.
   * @param data The updated evaluation data.
   * @returns The updated evaluation.
   */
  async updateEval(
    evalSetId: string,
    evalCaseId: string,
    data: unknown
  ): Promise<GetEvalResponse> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/eval_sets/${evalSetId}/evals/${evalCaseId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }
}
