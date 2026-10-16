export interface ToastMessage {
  id: string;
  text: string;
  type?: "success" | "info";
}

export function showToast(text: string, type: "success" | "info" = "success") {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("portfolio-toast", {
    detail: { id: `${Date.now()}-${Math.random()}`, text, type },
  });
  window.dispatchEvent(event);
}
