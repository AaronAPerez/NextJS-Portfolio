"use client";

import { ReactNode, useEffect } from "react";

interface EditorWrapperProps {
  id: string;
  order?: number;
  children: ReactNode;
}

export function EditorWrapper({ id, order = 0, children }: EditorWrapperProps) {
  useEffect(() => {
    if (!document.getElementById("__editor-overlay-root")) {
      const overlay = document.createElement("div");
      overlay.id = "__editor-overlay-root";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.pointerEvents = "none";
      overlay.style.zIndex = "999999";
      document.body.appendChild(overlay);
    }
  }, []);

  function sendMessage(type: string, payload: any) {
    window.parent.postMessage(
      {
        type,
        id,
        order,
        ...payload,
      },
      "*"
    );
  }

  function handleInlineEdit(e: React.MouseEvent<HTMLDivElement>) {
    // Find the closest element with a data-prop attribute
    const target = e.target as HTMLElement;
    const propElement = target.closest("[data-prop]") as HTMLElement | null;

    if (!propElement) return;

    const propName = propElement.getAttribute("data-prop");
    if (!propName) return;

    const text = propElement.textContent ?? "";
    const rect = propElement.getBoundingClientRect();

    sendMessage("inline-edit", {
      propName,
      currentValue: text,
      rect: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
    });
  }

  return (
    <div
      data-editor-id={id}
      data-editor-order={order}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        sendMessage("hover", {
          rect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          },
        });
      }}
      onClick={(e) => {
        e.preventDefault();

        // 1. Normal selection
        const rect = e.currentTarget.getBoundingClientRect();
        sendMessage("select", {
          rect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          },
        });

        // 2. Inline editing
        handleInlineEdit(e);
      }}
    >
      {children}
    </div>
  );
}