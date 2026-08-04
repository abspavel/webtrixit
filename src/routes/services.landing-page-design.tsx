import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService } from "@/lib/services-data";
import { ServiceDetail, serviceHead, ServiceNotFound } from "@/components/ServiceDetail";

const SLUG = "landing-page-design";

export const Route = createFileRoute("/services/landing-page-design")({
  loader: () => {
    if (!getService(SLUG)) throw notFound();
    return { slug: SLUG };
  },
  head: ({ loaderData }) => {
    const service = loaderData ? getService(loaderData.slug) : undefined;
    return service
      ? serviceHead(service)
      : { meta: [{ title: "সার্ভিসটি পাওয়া যায়নি" }, { name: "robots", content: "noindex" }] };
  },
  component: RouteComponent,
  notFoundComponent: ServiceNotFound,
});

function RouteComponent() {
  const { slug } = Route.useLoaderData();
  const service = getService(slug);
  if (!service) throw notFound();
  return <ServiceDetail service={service} />;
}
