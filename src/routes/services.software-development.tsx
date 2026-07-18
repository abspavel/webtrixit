import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService } from "@/lib/services-data";
import { ServiceDetail, serviceHead, ServiceNotFound } from "@/components/ServiceDetail";

const SLUG = "software-development";

export const Route = createFileRoute("/services/software-development")({
  loader: () => {
    const service = getService(SLUG);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) =>
    loaderData
      ? serviceHead(loaderData.service)
      : { meta: [{ title: "সার্ভিসটি পাওয়া যায়নি" }, { name: "robots", content: "noindex" }] },
  component: () => <ServiceDetail service={Route.useLoaderData().service} />,
  notFoundComponent: ServiceNotFound,
});
