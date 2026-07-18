import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService } from "@/lib/services-data";
import { ServiceDetail, serviceHead, ServiceNotFound } from "@/components/ServiceDetail";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "সার্ভিসটি পাওয়া যায়নি — Webtrix IT Solution" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return serviceHead(loaderData.service);
  },
  component: RouteComponent,
  notFoundComponent: ServiceNotFound,
  errorComponent: ErrorComp,
});

function RouteComponent() {
  const { service } = Route.useLoaderData();
  return <ServiceDetail service={service} />;
}

function ErrorComp({ reset }: { reset: () => void }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-background px-5 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold">এই পেজটি লোড হয়নি</h1>
        <button onClick={reset} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          আবার চেষ্টা করুন
        </button>
      </div>
    </div>
  );
}
