import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Stepper } from "@/components/workflow/Stepper";
import { StepContent } from "@/components/workflow/StepContent";
import { JanGehlTutorial } from "@/components/workflow/JanGehlTutorial";
import { ToolRecommendations } from "@/components/workflow/ToolRecommendations";
import { TemplateDownloads } from "@/components/workflow/TemplateDownloads";
import { BauhausAnalysisTutorial } from "@/components/workflow/BauhausAnalysisTutorial";
import { ProgressMeter } from "@/components/workflow/ProgressMeter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  WorkflowDetailStep,
  JanGehlStage,
  ToolRecommendation,
  DownloadableTemplate,
  WorkflowProgress,
} from "@shared/types/workflow";

export default function WorkflowPage() {
  const queryClient = useQueryClient();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("steps");

  const { data: steps = [] } = useQuery<WorkflowDetailStep[]>({
    queryKey: ["workflow-steps"],
    queryFn: async () => {
      const { data } = await axios.get("/api/workflow/steps");
      return data;
    },
  });

  const { data: janGehlStages = [] } = useQuery<JanGehlStage[]>({
    queryKey: ["jan-gehl-stages"],
    queryFn: async () => {
      const { data } = await axios.get("/api/workflow/jan-gehl");
      return data;
    },
  });

  const { data: tools = [] } = useQuery<ToolRecommendation[]>({
    queryKey: ["workflow-tools"],
    queryFn: async () => {
      const { data } = await axios.get("/api/workflow/tools");
      return data;
    },
  });

  const { data: templates = [] } = useQuery<DownloadableTemplate[]>({
    queryKey: ["workflow-templates"],
    queryFn: async () => {
      const { data } = await axios.get("/api/workflow/templates");
      return data;
    },
  });

  const { data: progress } = useQuery<WorkflowProgress>({
    queryKey: ["workflow-progress"],
    queryFn: async () => {
      const { data } = await axios.get("/api/workflow/progress");
      return data;
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (updates: Partial<WorkflowProgress>) => {
      const { data } = await axios.post("/api/workflow/progress", {
        ...progress,
        ...updates,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-progress"] });
    },
  });

  const useToolMutation = useMutation({
    mutationFn: async (toolId: string) => {
      const { data } = await axios.post(`/api/workflow/tools/${toolId}/use`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-progress"] });
    },
  });

  const downloadTemplateMutation = useMutation({
    mutationFn: async (templateId: string) => {
      const { data } = await axios.post(
        `/api/workflow/templates/${templateId}/download`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-progress"] });
      queryClient.invalidateQueries({ queryKey: ["workflow-templates"] });
    },
  });

  const saveNoteMutation = useMutation({
    mutationFn: async ({ stageId, note }: { stageId: string; note: string }) => {
      const { data } = await axios.post("/api/workflow/notes", {
        stageId,
        note,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-progress"] });
    },
  });

  const currentStep = steps[currentStepIndex];
  const completedItems = progress?.checklistProgress[currentStep?.id] || [];

  const handleChecklistToggle = (itemId: string) => {
    if (!currentStep) return;

    const currentCompleted = [...completedItems];
    const index = currentCompleted.indexOf(itemId);

    if (index > -1) {
      currentCompleted.splice(index, 1);
    } else {
      currentCompleted.push(itemId);
    }

    const allCompleted = currentStep.checklist.every((item) =>
      currentCompleted.includes(item.id)
    );

    const updatedCompletedSteps = [...(progress?.completedSteps || [])];
    if (allCompleted && !updatedCompletedSteps.includes(currentStep.id)) {
      updatedCompletedSteps.push(currentStep.id);
    } else if (!allCompleted && updatedCompletedSteps.includes(currentStep.id)) {
      const idx = updatedCompletedSteps.indexOf(currentStep.id);
      updatedCompletedSteps.splice(idx, 1);
    }

    updateProgressMutation.mutate({
      checklistProgress: {
        ...progress?.checklistProgress,
        [currentStep.id]: currentCompleted,
      },
      completedSteps: updatedCompletedSteps,
    });
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
    setActiveTab("steps");
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const totalChecklists = steps.reduce(
    (sum, step) => sum + step.checklist.length,
    0
  );
  const completedChecklists = Object.values(
    progress?.checklistProgress || {}
  ).reduce((sum: number, items) => sum + (items as string[]).length, 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex, activeTab]);

  if (!steps.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">工作流指南</h1>
          <p className="text-muted-foreground text-lg">
            从观察到创作的完整学习路径
          </p>
        </div>

        <Stepper
          steps={steps}
          currentStep={currentStepIndex}
          completedSteps={progress?.completedSteps || []}
          onStepClick={handleStepChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="steps">步骤</TabsTrigger>
                <TabsTrigger value="observation">观察法</TabsTrigger>
                <TabsTrigger value="tools">工具</TabsTrigger>
                <TabsTrigger value="templates">模板</TabsTrigger>
                <TabsTrigger value="bauhaus">包豪斯</TabsTrigger>
              </TabsList>

              <TabsContent value="steps" className="mt-6">
                {currentStep && (
                  <StepContent
                    step={currentStep}
                    completedItems={completedItems}
                    onChecklistToggle={handleChecklistToggle}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={currentStepIndex < steps.length - 1}
                    hasPrevious={currentStepIndex > 0}
                  />
                )}
              </TabsContent>

              <TabsContent value="observation" className="mt-6">
                <JanGehlTutorial
                  stages={janGehlStages}
                  onNoteSave={(stageId, note) =>
                    saveNoteMutation.mutate({ stageId, note })
                  }
                />
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <ToolRecommendations
                  tools={tools}
                  usedTools={progress?.usedTools || []}
                  onToolUse={(toolId) => useToolMutation.mutate(toolId)}
                />
              </TabsContent>

              <TabsContent value="templates" className="mt-6">
                <TemplateDownloads
                  templates={templates}
                  downloadedTemplates={progress?.downloadedTemplates || []}
                  onDownload={(templateId) =>
                    downloadTemplateMutation.mutate(templateId)
                  }
                />
              </TabsContent>

              <TabsContent value="bauhaus" className="mt-6">
                <BauhausAnalysisTutorial />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <ProgressMeter
              overallProgress={progress?.overallProgress || 0}
              completedSteps={progress?.completedSteps.length || 0}
              totalSteps={steps.length}
              usedTools={progress?.usedTools.length || 0}
              totalTools={tools.length}
              completedChecklists={completedChecklists}
              totalChecklists={totalChecklists}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
