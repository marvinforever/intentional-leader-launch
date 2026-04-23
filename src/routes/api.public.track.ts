import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const EventSchema = z.object({
  visitor_id: z.string().min(8).max(64),
  session_id: z.string().min(8).max(64),
  event_type: z.enum([
    "page_view",
    "scroll_depth",
    "section_view",
    "cta_click",
    "interaction",
  ]),
  event_name: z.string().min(1).max(80),
  page_path: z.string().min(1).max(255),
  section: z.string().max(80).optional().nullable(),
  value: z.number().finite().optional().nullable(),
  metadata: z.record(z.string().min(1).max(80), z.any()).optional(),
});

const PayloadSchema = z.object({
  events: z.array(EventSchema).min(1).max(20),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/track")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const json = await request.json();
          const parsed = PayloadSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json(
              { ok: false, error: "invalid_payload" },
              { status: 400, headers: corsHeaders },
            );
          }

          const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;
          const referrer = request.headers.get("referer")?.slice(0, 500) ?? null;

          const rows = parsed.data.events.map((e) => ({
            visitor_id: e.visitor_id,
            session_id: e.session_id,
            event_type: e.event_type,
            event_name: e.event_name,
            page_path: e.page_path,
            section: e.section ?? null,
            value: e.value ?? null,
            metadata: e.metadata ?? {},
            user_agent: userAgent,
            referrer,
          }));

          const { error } = await supabaseAdmin
            .from("analytics_events")
            .insert(rows);

          if (error) {
            console.error("analytics insert failed", error);
            return Response.json(
              { ok: false, error: "insert_failed" },
              { status: 500, headers: corsHeaders },
            );
          }

          return Response.json(
            { ok: true, count: rows.length },
            { status: 200, headers: corsHeaders },
          );
        } catch (err) {
          console.error("analytics route error", err);
          return Response.json(
            { ok: false, error: "bad_request" },
            { status: 400, headers: corsHeaders },
          );
        }
      },
    },
  },
});