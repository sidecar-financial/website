import Link from "next/link";
import { withHeadingIds, type Block, type Run } from "@/lib/resource-hub";

function Runs({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((run, index) => {
        let node: React.ReactNode = run.t;
        if (run.b) node = <strong className="font-semibold text-ink">{node}</strong>;
        if (run.i) node = <em>{node}</em>;
        if (run.href) {
          node = (
            <Link
              href={run.href}
              className="font-medium text-ink underline decoration-orange decoration-2 underline-offset-[3px] transition-colors hover:text-orange-text focus-visible:rounded-sm"
            >
              {node}
            </Link>
          );
        }
        return <span key={index}>{node}</span>;
      })}
    </>
  );
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  const { blocks: withIds } = withHeadingIds(blocks);

  return (
    <div className="text-base leading-[28px] text-body">
      {withIds.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                id={"id" in block ? block.id : undefined}
                className="mt-12 scroll-mt-[100px] text-[26px] font-semibold leading-[34px] text-ink first:mt-0"
              >
                <Runs runs={block.runs} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-8 text-xl font-semibold leading-7 text-ink">
                <Runs runs={block.runs} />
              </h3>
            );
          case "h4":
            return (
              <h4 key={index} className="mt-6 text-base font-semibold leading-7 text-ink">
                <Runs runs={block.runs} />
              </h4>
            );
          case "p":
            return (
              <p key={index} className="mt-4">
                <Runs runs={block.runs} />
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="mt-4 space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[11px] block size-1.5 shrink-0 bg-orange" />
                    <span>
                      <Runs runs={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div
                key={index}
                role="region"
                aria-label={block.caption}
                tabIndex={0}
                className="mt-6 overflow-x-auto border border-line focus-visible:outline-offset-2"
              >
                <table className="w-full min-w-[560px] border-collapse text-left text-sm leading-6">
                  <caption className="sr-only">{block.caption}</caption>
                  <thead>
                    <tr className="bg-soft">
                      {block.head.map((cell, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="border-b border-line px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink"
                        >
                          {cell || <span className="sr-only">Criteria</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="align-top">
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row" className="border-b border-line px-4 py-3 font-semibold text-ink">
                              {cell}
                            </th>
                          ) : (
                            <td key={c} className="border-b border-line px-4 py-3">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "ol":
            return (
              <ol key={index} className="mt-4 list-decimal space-y-2 pl-6 marker:font-medium marker:text-ink">
                {block.items.map((item, i) => (
                  <li key={i} className="pl-1">
                    <Runs runs={item} />
                  </li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}
