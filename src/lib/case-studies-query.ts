import { queryOptions } from "@tanstack/react-query";
import { listPublishedCaseStudies } from "@/lib/case-studies.functions";

export const caseStudiesQueryOptions = queryOptions({
  queryKey: ["case-studies"],
  queryFn: () => listPublishedCaseStudies(),
});
