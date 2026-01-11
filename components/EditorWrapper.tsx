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

  function sendMessage(type: "hover" | "select", rect: DOMRect) {
    window.parent.postMessage(
      {
        type,
        id,
        order,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
      },
      "*"
    );
  }

  return (
    <div
      data-editor-id={id}
      data-editor-order={order}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        sendMessage("hover", rect);
      }}
      onClick={(e) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        sendMessage("select", rect);
      }}
    >
      {children}
    </div>
  );
}