import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AgentService,
  type ChatHistoryItem,
  type AgentChart as AgentChartData,
} from "@/services/agent.service";
import { AgentChart } from "./AgentChart";

// Límite de historial enviado al backend (debe coincidir con MAX_HISTORY_MESSAGES)
const MAX_HISTORY = 6;
const MAX_MESSAGE_LENGTH = 300;

interface Message {
  role: "user" | "agent";
  text: string;
  chart?: AgentChartData | null;
}

export function AgentChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      text: "Hola! Soy el asistente financiero de Mi Pelícano. Podés preguntarme sobre gastos, ingresos, pagos de cuotas y más.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingQueries, setRemainingQueries] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function buildHistory(): ChatHistoryItem[] {
    // Convertir mensajes visibles en historial para el backend (excluir el mensaje de bienvenida)
    const conversationMessages = messages.slice(1);
    const trimmed = conversationMessages.slice(-MAX_HISTORY);
    return trimmed.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const history = buildHistory();
      const response = await AgentService.chat(text, history);
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: response.text, chart: response.chart },
      ]);
      setRemainingQueries(response.remainingQueries);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      let msg = "Ocurrió un error al procesar tu consulta. Intentá de nuevo.";
      if (status === 429) {
        msg = "Alcanzaste el límite diario de consultas. Volvé mañana.";
      } else if (status === 402) {
        msg = "⚠️ El asistente no está disponible en este momento por falta de crédito. Por favor contactá a soporte para reactivarlo.";
      }
      setMessages((prev) => [...prev, { role: "agent", text: msg }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const charsLeft = MAX_MESSAGE_LENGTH - input.length;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6  z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-2 text-primary-foreground shadow-lg hover:scale-105 transition-transform"
        aria-label="Abrir asistente"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 flex flex-col rounded-xl border bg-background shadow-xl transition-all duration-300 origin-bottom-right",
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ width: "40vw", minWidth: "320px", maxHeight: "70vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b rounded-t-xl bg-gradient-to-br from-primary to-primary-2 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Bot className="size-5" />
            <span className="font-semibold text-sm">Asistente Financiero</span>
          </div>
          {remainingQueries !== null && (
            <span className="text-xs opacity-80">
              {remainingQueries} consultas restantes hoy
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 whitespace-pre-wrap leading-relaxed",
                msg.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              {msg.text}
              {msg.chart && <AgentChart chart={msg.chart} />}
            </div>
          ))}
          {loading && (
            <div className="max-w-[85%] rounded-lg px-3 py-2 bg-muted text-muted-foreground animate-pulse text-xs">
              Consultando...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1 px-3 py-3 border-t">
          <div className="flex items-end gap-2">
            <textarea
              className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[40px] max-h-28"
              rows={1}
              placeholder="Escribí tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              isLoading={loading}
            >
              <Send className="size-4" />
            </Button>
          </div>
          <span
            className={cn(
              "text-xs text-right",
              charsLeft < 30 ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {charsLeft} caracteres restantes
          </span>
        </div>
      </div>
    </>
  );
}
