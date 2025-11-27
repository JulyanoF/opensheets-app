"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANCAMENTO_CONDITIONS } from "@/lib/lancamentos/constants";
import { cn } from "@/lib/utils/ui";
import { ConditionSelectContent } from "../../select-items";
import type { ConditionSectionProps } from "./lancamento-dialog-types";

export function ConditionSection({
  formState,
  onFieldChange,
  showInstallments,
  showRecurrence,
}: ConditionSectionProps) {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      <div
        className={cn(
          "space-y-2 w-full",
          showInstallments || showRecurrence ? "md:w-1/2" : "md:w-full"
        )}
      >
        <Label htmlFor="condition">Condição</Label>
        <Select
          value={formState.condition}
          onValueChange={(value) => onFieldChange("condition", value)}
        >
          <SelectTrigger id="condition" className="w-full">
            <SelectValue placeholder="Selecione">
              {formState.condition && (
                <ConditionSelectContent label={formState.condition} />
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {LANCAMENTO_CONDITIONS.map((condition) => (
              <SelectItem key={condition} value={condition}>
                <ConditionSelectContent label={condition} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showInstallments ? (
        <div className="space-y-2 w-full md:w-1/2">
          <Label htmlFor="installmentCount">Parcelado em</Label>
          <Select
            value={formState.installmentCount}
            onValueChange={(value) => onFieldChange("installmentCount", value)}
          >
            <SelectTrigger id="installmentCount" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(24)].map((_, index) => (
                <SelectItem key={index + 2} value={String(index + 2)}>
                  {index + 2}x
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}

      {showRecurrence ? (
        <div className="space-y-2 w-full md:w-1/2">
          <Label htmlFor="recurrenceCount">Lançamento fixo</Label>
          <Select
            value={formState.recurrenceCount}
            onValueChange={(value) => onFieldChange("recurrenceCount", value)}
          >
            <SelectTrigger id="recurrenceCount" className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(119)].map((_, index) => (
                <SelectItem key={index + 2} value={String(index + 2)}>
                  Por {index + 2} meses
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  );
}
