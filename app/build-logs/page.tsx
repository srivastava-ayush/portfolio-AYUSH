import { Suspense } from "react";
import Navbar from "../ui/Navbar";
import CustomCursor from "../ui/CustomCursor";
import PageWithBorderStrips from "../ui/PageWithBorderStrips";
import Reveal from "../ui/Reveal";
import BuildLogsIndex from "../ui/BuildLogsIndex";
import BuildLogsFooter from "../ui/BuildLogsFooter";
import { getLogMeta, getLastEdited } from "../lib/logs";

export default function Page() {
  const logs = getLogMeta();
  const lastEdit = getLastEdited();

  return (
    <Reveal className="min-h-screen flex flex-col items-center">
      <CustomCursor />
      <PageWithBorderStrips>
        <div className="w-full border-x border-t border-[var(--border-color)] flex flex-col items-center">
          <Navbar />
          <Suspense>
            <BuildLogsIndex logs={logs} />
          </Suspense>
          <BuildLogsFooter lastEdit={lastEdit} />
        </div>
      </PageWithBorderStrips>
    </Reveal>
  );
}
