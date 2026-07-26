export type CaseStudy = {
  id: string;
  title: string;
  location: string;
  customer_type: "home" | "business";
  system_size: string;
  savings: string;
  bill_before: string;
  bill_after: string;
  description: string;
  highlights: string[];
  before_image_url: string;
  after_image_url: string;
  sort_order: number;
  published: boolean;
};

export const CASE_STUDY_COLUMNS =
  "id,title,location,customer_type,system_size,savings,bill_before,bill_after,description,highlights,before_image_url,after_image_url,sort_order,published";

export const emptyCaseStudy = (): Omit<CaseStudy, "id"> => ({
  title: "",
  location: "",
  customer_type: "home",
  system_size: "",
  savings: "",
  bill_before: "",
  bill_after: "",
  description: "",
  highlights: [],
  before_image_url: "",
  after_image_url: "",
  sort_order: 0,
  published: true,
});
