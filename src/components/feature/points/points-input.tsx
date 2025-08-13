import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PointsInput() {
  return (
    <div className="flex gap-4 items-center w-[300px]">
      <Label className="text-lg font-bold w-[100px]">Points:</Label>
      <Input type="number" min={1} placeholder="Enter points" className="w-50" />
    </div>
  );
}
