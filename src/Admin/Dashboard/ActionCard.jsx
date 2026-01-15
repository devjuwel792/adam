import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaUserPlus } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import DocumentManager from "./DocumentManager";
import React from "react";
import ProfessionalList from "./ProfessionalList";

const colorVariants = {
  orange: "text-orange-600",
  blue: "text-blue-600",
};

export function ActionCard({
  isOpenDocumentVerifyModal,
  isOpenProfileList,
  onClose,
  isOpen,
  title,
  description,
  count,
  buttonText,
  color = "orange",
  data,
}) {
  const Icon = color === "orange" ? FaUserPlus : GoQuestion;

  return (
    <Card className="p-6 transition-all shadow-md bg-[#F1F1F1]">
      <div className="flex items-start justify-between">
        <div className="w-8/12">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <Button
            onClick={() => isOpen()}
            className="mt-4 bg-[#C9A14A] hover:bg-[#C9A14A]"
            size="sm"
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div
          className={cn(
            "text-2xl font-bold flex justify-end  w-4/12",
            colorVariants[color]
          )}
        >
          <div>
            {/* <div className="flex items-center justify-center mb-2"> */}
            <Icon
              size={"30px"}
              className={cn("h-[32] w-[32]", colorVariants[color])}
            />
            {/* </div> */}
            <div className="font-normal text-center">{count}</div>
          </div>
        </div>
      </div>

      <DocumentManager
        isOpen={isOpenDocumentVerifyModal}
        onClose={() => onClose()}
        data={data}
        count={count}
        
      />
      <ProfessionalList
        isOpen={isOpenProfileList}
        data={data}
        count={count}
        onClose={() => onClose()}
      />
    </Card>
  );
}
