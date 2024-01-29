import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();
  const [number, setNumber] = useState(0);
  return (
    <div>
      <h1 data-testid="testid"> Vite</h1>
      <h2 data-testid="testid"> {t("Welcome")}</h2>
      <Button
        data-testid="button"
        onClick={() => {
          setNumber((prev) => prev + 1);
        }}
      >
        {number}
      </Button>
    </div>
  );
}
