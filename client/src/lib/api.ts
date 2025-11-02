import type {
  Course,
  KnowledgeCard,
  Case,
  Prompt,
  Workflow,
  Resource,
  Assignment,
  AssignmentSubmission,
  UserProgress,
  UserFavorite,
  UserHistoryItem,
  ApiResponse,
  PaginatedResponse,
  RecommendationResponse,
} from "@shared/types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API request failed");
  }

  return response.json();
}

// Courses API
export const coursesAPI = {
  getAll: () => fetchAPI<Course[]>("/courses"),
  getById: (id: string) => fetchAPI<Course>(`/courses/${id}`),
};

// Knowledge Cards API
export const knowledgeAPI = {
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    difficulty?: string;
    tags?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchAPI<PaginatedResponse<KnowledgeCard>>(`/knowledge?${query}`);
  },
  getById: (id: string) => fetchAPI<KnowledgeCard>(`/knowledge/${id}`),
};

// Cases API
export const casesAPI = {
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    difficulty?: string;
    tags?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchAPI<PaginatedResponse<Case>>(`/cases?${query}`);
  },
  getById: (id: string) => fetchAPI<Case>(`/cases/${id}`),
};

// Prompts API
export const promptsAPI = {
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    difficulty?: string;
    tags?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchAPI<PaginatedResponse<Prompt>>(`/prompts?${query}`);
  },
  getById: (id: string) => fetchAPI<Prompt>(`/prompts/${id}`),
  getRecommendations: (params?: {
    courseSection?: string;
    courseId?: string;
    difficulty?: string;
    limit?: number;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchAPI<RecommendationResponse>(
      `/prompts/recommendations?${query}`
    );
  },
};

// Workflows API
export const workflowsAPI = {
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    difficulty?: string;
    tags?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchAPI<PaginatedResponse<Workflow>>(`/workflows?${query}`);
  },
  getById: (id: string) => fetchAPI<Workflow>(`/workflows/${id}`),
};

// Resources API
export const resourcesAPI = {
  getAll: (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    difficulty?: string;
    type?: string;
    isPremium?: boolean;
    tags?: string;
    search?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchAPI<PaginatedResponse<Resource>>(`/resources?${query}`);
  },
  getById: (id: string) => fetchAPI<Resource>(`/resources/${id}`),
};

// Assignments API
export const assignmentsAPI = {
  getAll: () => fetchAPI<Assignment[]>("/assignments"),
  getById: (id: string) => fetchAPI<Assignment>(`/assignments/${id}`),
  getSubmissions: (id: string) =>
    fetchAPI<AssignmentSubmission[]>(`/assignments/${id}/submissions`),
  submit: async (id: string, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/assignments/${id}/submit`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Submission failed");
    }

    return response.json() as Promise<ApiResponse<AssignmentSubmission>>;
  },
  getSubmissionById: (submissionId: string) =>
    fetchAPI<AssignmentSubmission>(`/assignments/submissions/${submissionId}`),
  updateSubmission: (submissionId: string, data: any) =>
    fetchAPI<AssignmentSubmission>(`/assignments/submissions/${submissionId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// User API
export const userAPI = {
  progress: {
    get: (userId: string) =>
      fetchAPI<UserProgress[]>(`/users/${userId}/progress`),
    update: (userId: string, data: any) =>
      fetchAPI<UserProgress>(`/users/${userId}/progress`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  favorites: {
    get: (userId: string) =>
      fetchAPI<UserFavorite[]>(`/users/${userId}/favorites`),
    add: (userId: string, data: { itemId: string; itemType: string }) =>
      fetchAPI<UserFavorite>(`/users/${userId}/favorites`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    remove: (userId: string, itemType: string, itemId: string) =>
      fetchAPI<{ removed: boolean }>(
        `/users/${userId}/favorites/${itemType}/${itemId}`,
        {
          method: "DELETE",
        }
      ),
  },
  history: {
    get: (userId: string, limit?: number) => {
      const query = limit ? `?limit=${limit}` : "";
      return fetchAPI<UserHistoryItem[]>(`/users/${userId}/history${query}`);
    },
    add: (userId: string, data: any) =>
      fetchAPI<UserHistoryItem>(`/users/${userId}/history`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  submissions: {
    get: (userId: string) =>
      fetchAPI<AssignmentSubmission[]>(`/users/${userId}/submissions`),
  },
};

// Health check
export const healthAPI = {
  check: () => fetchAPI<{ status: string; timestamp: string }>("/health"),
};
