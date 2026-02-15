interface SonicJSConfig {
  apiUrl: string;
  apiKey?: string;
}

interface SonicJSPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  date: string;
  categories?: string[];
  tags?: string[];
  image?: {
    url: string;
    alt?: string;
  };
}

class SonicJSClient {
  private apiUrl: string;
  private apiKey?: string;

  constructor(config: SonicJSConfig) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`SonicJS API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getPosts(): Promise<SonicJSPost[]> {
    return this.fetch('/api/posts');
  }

  async getPost(slug: string): Promise<SonicJSPost> {
    return this.fetch(`/api/posts/${slug}`);
  }

  async createPost(post: Omit<SonicJSPost, 'id'>): Promise<SonicJSPost> {
    return this.fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async updatePost(id: string, post: Partial<SonicJSPost>): Promise<SonicJSPost> {
    return this.fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  }

  async deletePost(id: string): Promise<void> {
    return this.fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  }
}

export const sonicjs = new SonicJSClient({
  apiUrl: import.meta.env.SONICJS_API_URL || '',
  apiKey: import.meta.env.SONICJS_API_KEY,
});

export type { SonicJSPost };
