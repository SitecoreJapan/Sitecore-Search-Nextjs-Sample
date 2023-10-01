import { useCallback } from "react";

import type { PreviewSearchInitialState } from "@sitecore-search/react";
import {
  WidgetDataType,
  usePreviewSearch,
  widget,
} from "@sitecore-search/react";
import { ArticleCard, NavMenu, Presence } from "@sitecore-search/ui";
import type { PreviewSearchActionProps } from "@sitecore-search/widgets";

type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
};
const Articles = ({
  loading = false,
  articles,
  onItemClick,
}: {
  loading?: boolean;
  articles: Array<ArticleModel>;
  onItemClick: PreviewSearchActionProps["onItemClick"];
}) => (
  <NavMenu.Content>
    <Presence present={loading}>
      <div>
        <svg
          aria-busy={loading}
          aria-hidden={!loading}
          focusable="false"
          role="progressbar"
          viewBox="0 0 20 20"
        >
          <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
        </svg>
      </div>
    </Presence>
    <NavMenu.List className="grid grid-cols-3">
      {!loading &&
        articles.map((article, index) => (
          <NavMenu.Item key={article.id} className="mr-1 ml-1 mt-2">
            <NavMenu.Link
              href={article.url}
              onClick={(e) => {
                e.preventDefault();
                onItemClick({
                  id: article.id,
                  index,
                  sourceId: article.source_id,
                });
                // add redirection or any action
              }}
            >
              <ArticleCard.Root>
                <div>
                  <ArticleCard.Image src={article.image_url} />
                </div>
                <ArticleCard.Title>{article.name}</ArticleCard.Title>
              </ArticleCard.Root>
            </NavMenu.Link>
          </NavMenu.Item>
        ))}
    </NavMenu.List>
  </NavMenu.Content>
);
type InitialState = PreviewSearchInitialState<"itemsPerPage">;
export const PreviewSearchComponent = ({ defaultItemsPerPage = 6 }) => {
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult: {
      isFetching,
      isLoading,
      data: { content: articles = [] } = {},
    },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });
  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      onKeyphraseChange({
        keyphrase: target.value,
      });
    },
    [onKeyphraseChange]
  );
  return (
    <NavMenu.Root>
      <NavMenu.List>
        <NavMenu.Item>
          <NavMenu.InputTrigger
            onChange={keyphraseHandler}
            autoComplete="off"
            placeholder="Type to search..."
            className="w-full border-1 border-gray-500 h-8"
          />
          <NavMenu.Content>
            <Presence present={loading}>
              <div>
                <svg
                  aria-busy={loading}
                  aria-hidden={!loading}
                  focusable="false"
                  role="progressbar"
                  viewBox="0 0 20 20"
                >
                  <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                </svg>
              </div>
            </Presence>
            {!loading && (
              <NavMenu.SubContent
                orientation="vertical"
                value="defaultArticlesResults"
                ref={widgetRef}
                className="absolute top-4 left-0"
              >
                <NavMenu.List>
                  <NavMenu.Item
                    value="defaultArticlesResults"
                    key="defaultArticlesResults"
                  >
                    <NavMenu.Trigger aria-hidden />
                    <Articles articles={articles} onItemClick={onItemClick} />
                  </NavMenu.Item>
                </NavMenu.List>
              </NavMenu.SubContent>
            )}
          </NavMenu.Content>
        </NavMenu.Item>
      </NavMenu.List>
    </NavMenu.Root>
  );
};
const PreviewSearchWidget = widget(
  PreviewSearchComponent,
  WidgetDataType.PREVIEW_SEARCH,
  "content"
);
export default PreviewSearchWidget;
