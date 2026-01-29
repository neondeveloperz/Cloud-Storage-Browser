import { ExplorerLayout } from "@/features/explorer/components/ExplorerLayout";
import { LocalExplorer } from "@/features/explorer/components/LocalExplorer";
import { CloudExplorer } from "@/features/explorer/components/CloudExplorer";

export default function Home() {
  return (
    <div className="h-full p-2">
      <ExplorerLayout
        leftPanel={<LocalExplorer />}
        rightPanel={<CloudExplorer />}
      />
    </div>
  );
}
