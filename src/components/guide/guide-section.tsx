import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GuideSectionProps {
  title: string;
  children: React.ReactNode;
}

export function GuideSection({ title, children }: GuideSectionProps) {
  return (
    <Card className="border-2 mb-6">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}