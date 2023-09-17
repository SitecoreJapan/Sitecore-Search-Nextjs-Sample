import { useCallback } from "react";

import type { PreviewSearchInitialState } from "@sitecore-search/react";
import {
  WidgetDataType,
  usePreviewSearch,
  widget,
} from "@sitecore-search/react";
import { ArticleCard, NavMenu, Presence } from "@sitecore-search/ui";
import type { PreviewSearchActionProps } from "@sitecore-search/widgets";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

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
}) => {
  const router = useRouter();
  return (
    <NavMenu.Content className={styles["sitecore-nav-menu-grid"]}>
      <Presence present={loading}>
        <div className={styles["sitecore-loader-container"]}>
          <svg
            aria-busy={loading}
            aria-hidden={!loading}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
            className={styles["sitecore-loader-animation"]}
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </svg>
        </div>
      </Presence>
      <NavMenu.List className={styles["sitecore-nav-menu-sub-list"]}>
        {!loading &&
          articles.map((article, index) => (
            <NavMenu.Item
              key={article.id}
              className={styles["sitecore-nav-menu-sub-item"]}
            >
              <NavMenu.Link
                href={article.url}
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick({
                    id: article.id,
                    index,
                    sourceId: article.source_id,
                  });
                  router.push(article.url);
                  // add redirection or any action
                }}
                className={styles["sitecore-nav-menu-link"]}
              >
                <ArticleCard.Root className={styles["sitecore-article-root"]}>
                  <div className={styles["sitecore-article-image-wrapper"]}>
                    <ArticleCard.Image
                      src={article.image_url}
                      className={styles["sitecore-article-image"]}
                    />
                  </div>
                  <ArticleCard.Title
                    className={styles["sitecore-article-name"]}
                  >
                    {article.name}
                  </ArticleCard.Title>
                </ArticleCard.Root>
              </NavMenu.Link>
            </NavMenu.Item>
          ))}
      </NavMenu.List>
    </NavMenu.Content>
  );
};
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
    <NavMenu.Root className={styles["sitecore-nav-menu-root"]}>
      <NavMenu.List className={styles["sitecore-nav-menu-main-list"]}>
        <NavMenu.Item className={styles["sitecore-nav-menu-main-list-item"]}>
          <NavMenu.InputTrigger
            onChange={keyphraseHandler}
            autoComplete="off"
            placeholder="Type to search..."
            className={styles["sitecore-nav-menu-input-trigger"]}
          />
          <NavMenu.Content className={styles["sitecore-nav-menu-main-content"]}>
            <Presence present={loading}>
              <div className={styles["sitecore-loader-container"]}>
                <svg
                  aria-busy={loading}
                  aria-hidden={!loading}
                  focusable="false"
                  role="progressbar"
                  viewBox="0 0 20 20"
                  className={styles["sitecore-loader-animation"]}
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
                className={styles["sitecore-nav-menu-sub-content"]}
              >
                <NavMenu.List
                  className={`${styles["sitecore-nav-menu-main-list"]} ${styles["sitecore-nav-menu-group-list"]}`}
                >
                  <NavMenu.Item
                    value="defaultArticlesResults"
                    key="defaultArticlesResults"
                    className={styles["sitecore-nav-menu-default-group"]}
                  >
                    <NavMenu.Trigger
                      aria-hidden
                      className={styles["sitecore-nav-menu-default-trigger"]}
                    />
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
