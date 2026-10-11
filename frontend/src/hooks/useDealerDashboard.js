// src/hooks/useDealerDashboard.js
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function useDealerDashboard(dealerId, brandId) {
  const [queue, setQueue] = useState([]);
  const [demand, setDemand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [q, d] = await Promise.all([
        api(`/dealer/queue?brand_id=${brandId}`),
        api(`/dealers/${dealerId}/demand-status?brand_id=${brandId}`),
      ]);
      setQueue(q);
      setDemand(d);
      setError("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [dealerId, brandId]);

  useEffect(() => {
    load();                                  // load once now
    const timer = setInterval(load, 10000);  // then every 10 seconds
    return () => clearInterval(timer);       // stop when the page closes
  }, [load]);

  const act = async (tokenId, kind) => {     // kind: "call" | "serve" | "no-show"
    try {
      await api(`/dealer/tokens/${tokenId}/${kind}`, { method: "POST" });
      await load();                          // refresh the table straight away
    } catch (e) {
      setError(e.message);
    }
  };

  return { queue, demand, loading, error, act, reload: load };
}