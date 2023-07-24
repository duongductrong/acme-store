import { useGate } from "@/components/gates/hooks/use-gate"

export const useAdmin = () => {
  return useGate()
}
