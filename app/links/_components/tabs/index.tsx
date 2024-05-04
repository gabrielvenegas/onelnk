import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SocialMedia from "./social-media";

export default function ContentTabs() {
  return (
    <Tabs defaultValue="social-media" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="social-media">Social</TabsTrigger>
        <TabsTrigger value="integrations">Integrações</TabsTrigger>
      </TabsList>
      <TabsContent value="social-media">
        <SocialMedia />
      </TabsContent>
      <TabsContent value="integrations">Change your password here.</TabsContent>
    </Tabs>
  );
}
