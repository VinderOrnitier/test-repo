import { useState, useCallback } from "react";

export default function useToggle(initialValue: any) {
  const [isToggled, setIsToggled] = useState(initialValue)
  const toggle = useCallback(() => setIsToggled(!isToggled), [isToggled])
  return [toggle, isToggled]
}