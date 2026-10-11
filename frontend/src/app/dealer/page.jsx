
"use client";
import useDealerDashboard from "@/hooks/useDealerDashboard";
import DemandPanel from "@/components/dealer/DemandPanel";
import TokenQueue from "@/components/dealer/TokenQueue";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function DealerPage() {
  const { queue, demand, loading, error, act } = useDealerDashboard(1, 1); // temporary ids

  if (loading) return <LoadingSpinner />;

  return (
    <main className="mx-auto max-w-4xl p-4">
      {error && <ErrorMessage message={error} />}
      {demand && <DemandPanel status={demand.status} reason={demand.reason} />}
      <TokenQueue tokens={queue} onAction={act} />
    </main>
  );
} 