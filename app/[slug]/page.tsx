import { LinkList } from "../../components/link-list";

export default function Links({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return <LinkList slug={params.slug} />;
}
