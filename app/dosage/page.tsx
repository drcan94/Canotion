"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  DosageValidator,
  TDosageValidator,
} from "@/lib/validators/dosage_validator";
import { cn } from "@/lib/utils";

const DosagePage = () => {
  const [solutionAmount, setSolutionAmount] = useState("100");
  const [drugAmountType, setDrugAmountType] = useState<"mcg" | "mg">("mg");
  const [weightDependency, setWeightDependency] = useState<"yes" | "no">("yes");
  const [infusionSpeedType, setInfusionSpeedType] = useState<
    | "mg/kg/dk"
    | "mg/dk"
    | "mcg/kg/dk"
    | "mcg/dk"
    | "mg/kg/saat"
    | "mg/saat"
    | "mcg/kg/saat"
    | "mcg/saat"
  >(weightDependency === "yes" ? "mcg/kg/dk" : "mcg/dk");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDosageValidator>({
    resolver: zodResolver(DosageValidator),
  });

  useEffect(() => {
    if (errors.drugAmount) {
      toast.error(errors?.drugAmount.message);
    }
    if (errors.infusionSpeed) {
      toast.error(errors?.infusionSpeed.message);
    }
    if (errors.solutionAmount) {
      toast.error(errors?.solutionAmount.message);
    }
  }, [errors]);

  const onSubmit = ({
    weight,
    infusionSpeed,
    drugAmount,
  }: TDosageValidator) => {
    if (weightDependency === "yes" && !weight) {
      toast.error("Hasta kilosunu girmelisiniz");
      return;
    }

    if (!infusionSpeed) {
      toast.error("İnfüzyon hızını girmelisiniz");
      return;
    }

    if (!drugAmount) {
      toast.error("İlaç miktarını girmelisiniz");
      return;
    }

    if (!solutionAmount) {
      toast.error("Solüsyon miktarını girmelisiniz");
      return;
    }

    if (
      Number.isNaN(Number(weight)) ||
      Number.isNaN(Number(infusionSpeed)) ||
      Number.isNaN(Number(solutionAmount)) ||
      Number.isNaN(Number(drugAmount))
    ) {
      toast.error("Lütfen sadece rakam giriniz");
      return;
    }

    let speed: number;
    if (weightDependency === "yes") {
      speed = Number(infusionSpeed) * Number(weight);
    } else {
      speed = Number(infusionSpeed);
    }

    if (
      infusionSpeedType === "mcg/kg/dk" ||
      infusionSpeedType === "mg/kg/dk" ||
      infusionSpeedType === "mcg/dk" ||
      infusionSpeedType === "mg/dk"
    ) {
      speed = speed * 60;
    }

    let amount: number;
    if (drugAmountType === "mcg") {
      amount = Number(drugAmount);
    } else {
      amount = Number(drugAmount) * 1000;
    }

    const unitAmount = amount / Number(solutionAmount);

    const result = speed / unitAmount;

    toast.success(`${result} cc / saat hızında infüzyon yapılmalıdır`);
  };

  const onSolutonAmountChange = (value: string) => {
    setSolutionAmount(value);
  };

  const onDrugAmountTypeChange = (value: "mcg" | "mg") => {
    setDrugAmountType(value);
  };

  const onInfusionSpeedTypeChange = (
    value:
      | "mcg/kg/dk"
      | "mg/kg/dk"
      | "mcg/kg/saat"
      | "mg/kg/saat"
      | "mcg/dk"
      | "mg/dk"
      | "mcg/saat"
      | "mg/saat"
  ) => {
    setInfusionSpeedType(value);
  };

  const onWeightDependencyChange = (value: "yes" | "no") => {
    setWeightDependency(value);
    if (value === "yes") {
      if (
        ["mcg/dk", "mg/dk", "mcg/saat", "mg/saat"].includes(infusionSpeedType)
      ) {
        setInfusionSpeedType("mcg/kg/dk");
      }
    } else {
      if (
        ["mcg/kg/dk", "mg/kg/dk", "mcg/kg/saat", "mg/kg/saat"].includes(
          infusionSpeedType
        )
      ) {
        setInfusionSpeedType("mcg/dk");
      }
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label>İlaç Kiloya Bağımlı mı?</Label>
            <RadioGroup
              onValueChange={onWeightDependencyChange}
              className="my-2 flex flex-col space-y-1"
              defaultValue="yes"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r1">Evet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r2" />
                <Label htmlFor="r2">Hayır</Label>
              </div>
            </RadioGroup>
          </div>
          {weightDependency === "yes" && (
            <div className="grid gap-1 py-2">
              <Label htmlFor="weight">Hasta Kaç Kilo?</Label>
              <Input
                type="number"
                {...register("weight")}
                className={cn("my-2 -ml-0.5", {
                  "focus-visible:ring-red-500": errors.weight,
                })}
                placeholder="Sadece sayısal ifade giriniz"
              />
            </div>
          )}
          <div className="grid gap-1 py-2">
            <Label htmlFor="solutionAmount">Kaç ml/cc&apos;lik Solüsyon?</Label>
            <Input
              value={solutionAmount}
              {...register("solutionAmount", {
                onChange: (e) => onSolutonAmountChange(e.target.value),
              })}
              className={cn("my-2 -ml-0.5", {
                "focus-visible:ring-red-500": errors.solutionAmount,
              })}
              placeholder="Sadece sayısal ifade giriniz"
            />
            <RadioGroup
              onValueChange={onSolutonAmountChange}
              className="flex flex-col space-y-1"
              defaultValue="100"
              value={solutionAmount!}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100" id="r1" />
                <Label htmlFor="r1">100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="150" id="r2" />
                <Label htmlFor="r2">150</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="250" id="r3" />
                <Label htmlFor="r3">250</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="500" id="r4" />
                <Label htmlFor="r4">500</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1000" id="r5" />
                <Label htmlFor="r5">1000</Label>
              </div>
            </RadioGroup>
            {errors?.solutionAmount && (
              <p className="text-xs text-red-600 ml-0.5">
                {errors?.solutionAmount.message}
              </p>
            )}
          </div>

          <div className="grid gap-1 py-2">
            <Label htmlFor="drugAmount">
              Solüsyona Eklenecek İlaç Miktarı ({drugAmountType})
            </Label>
            <Input
              {...register("drugAmount")}
              className={cn("my-2 -ml-0.5", {
                "focus-visible:ring-red-500": errors.drugAmount,
              })}
              placeholder="Sadece sayısal ifade giriniz"
            />
            <RadioGroup
              onValueChange={onDrugAmountTypeChange}
              className="flex flex-col space-y-1"
              defaultValue="mg"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mcg" id="r1" />
                <Label htmlFor="r1">mcg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mg" id="r2" />
                <Label htmlFor="r2">mg</Label>
              </div>
            </RadioGroup>
            {errors?.drugAmount && (
              <p className="text-xs text-red-600 ml-0.5">
                {errors?.drugAmount.message}
              </p>
            )}
          </div>

          <div className="grid gap-1 py-2">
            <Label htmlFor="infusionSpeed">
              İnfüzyon Hızı ({infusionSpeedType})
            </Label>
            <Input
              {...register("infusionSpeed")}
              className={cn("my-2 -ml-0.5", {
                "focus-visible:ring-red-500": errors.infusionSpeed,
              })}
              placeholder="Sadece sayısal ifade giriniz"
            />
            <RadioGroup
              onValueChange={onInfusionSpeedTypeChange}
              className="flex flex-col space-y-1"
              defaultValue={weightDependency === "yes" ? "mcg/kg/dk" : "mcg/dk"}
              value={infusionSpeedType!}
            >
              {weightDependency === "yes" && (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mcg/kg/dk" id="r1" />
                    <Label htmlFor="r1">mcg/kg/dk</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mcg/kg/saat" id="r3" />
                    <Label htmlFor="r3">mcg/kg/saat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mg/kg/dk" id="r5" />
                    <Label htmlFor="r5">mg/kg/dk</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mg/kg/saat" id="r7" />
                    <Label htmlFor="r7">mg/kg/saat</Label>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mcg/dk" id="r2" />
                <Label htmlFor="r2">mcg/dk</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mcg/saat" id="r4" />
                <Label htmlFor="r4">mcg/saat</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mg/dk" id="r6" />
                <Label htmlFor="r6">mg/dk</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mg/saat" id="r8" />
                <Label htmlFor="r8">mg/saat</Label>
              </div>
            </RadioGroup>

            {errors?.infusionSpeed && (
              <p className="text-xs text-red-600 ml-0.5">
                {errors?.infusionSpeed.message}
              </p>
            )}
          </div>

          <Button type="submit">Hesapla</Button>
        </div>
      </form>
    </div>
  );
};

export default DosagePage;
