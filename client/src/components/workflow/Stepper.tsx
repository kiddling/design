import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: string[];
  onStepClick: (stepIndex: number) => void;
}

export function Stepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: StepperProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep || isCompleted;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative",
                    isCompleted &&
                      "bg-primary border-primary text-primary-foreground",
                    isCurrent &&
                      !isCompleted &&
                      "border-primary text-primary ring-4 ring-primary/20",
                    !isCurrent &&
                      !isCompleted &&
                      "border-muted-foreground/30 text-muted-foreground",
                    isClickable && "cursor-pointer hover:scale-110",
                    !isClickable && "cursor-not-allowed opacity-50"
                  )}
                  aria-label={`第 ${index + 1} 步：${step.title}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </button>

                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors",
                      (isCurrent || isCompleted) && "text-primary",
                      !isCurrent && !isCompleted && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors duration-300",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
