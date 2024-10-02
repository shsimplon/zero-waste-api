import { Configuration, OpenAIApi } from "openai";

class AIService {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  // Méthode pour interagir avec OpenAI et obtenir une réponse
  public async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 300,
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Erreur lors de l'appel à OpenAI:", error);
      throw new Error("Erreur lors de la génération de texte via OpenAI.");
    }
  }
}

export default AIService;
