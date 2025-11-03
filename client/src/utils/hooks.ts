import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {
  AssignmentFormSchema,
  CaseStudy,
  CourseDetail,
  CourseOutlineItem,
  KnowledgeCard,
  PromptTemplate,
} from "@shared/types";

export function useCourseOutline() {
  return useQuery<CourseOutlineItem[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get("/api/courses");
      return response.data;
    },
  });
}

export function useCourseDetail(id: string) {
  return useQuery<CourseDetail>({
    queryKey: ["courses", id],
    queryFn: async () => {
      const response = await axios.get(`/api/courses/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCourseDetailPrefetch() {
  const queryClient = useQueryClient();

  return (id: string) => {
    void queryClient.prefetchQuery({
      queryKey: ["courses", id],
      queryFn: async () => {
        const response = await axios.get(`/api/courses/${id}`);
        return response.data;
      },
    });
  };
}

export function useKnowledgeCards() {
  return useQuery<KnowledgeCard[]>({
    queryKey: ["knowledge"],
    queryFn: async () => {
      const response = await axios.get("/api/knowledge");
      return response.data;
    },
  });
}

export function useCaseStudies() {
  return useQuery<CaseStudy[]>({
    queryKey: ["cases"],
    queryFn: async () => {
      const response = await axios.get("/api/cases");
      return response.data;
    },
  });
}

export function usePromptTemplates() {
  return useQuery<PromptTemplate[]>({
    queryKey: ["prompts"],
    queryFn: async () => {
      const response = await axios.get("/api/prompts");
      return response.data;
    },
  });
}

export function useSubmitAssignment() {
  return useMutation({
    mutationFn: async (data: AssignmentFormSchema) => {
      const response = await axios.post("/api/assignments", data);
      return response.data;
    },
  });
}
