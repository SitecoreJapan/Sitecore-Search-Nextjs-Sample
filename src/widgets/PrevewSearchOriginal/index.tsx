import { useCallback } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { Presence } from '@sitecore-search/ui';
import type { PreviewSearchActionProps } from '@sitecore-search/widgets';

import { ArticleCardStyled, LoaderAnimation, LoaderContainer, NavMenuStyled } from './styled';

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
  onItemClick: PreviewSearchActionProps['onItemClick'];
}) => (
  <NavMenuStyled.Grid>
    <Presence present={loading}>
      <LoaderContainer>
        <LoaderAnimation
          aria-busy={loading}
          aria-hidden={!loading}
          focusable="false"
          role="progressbar"
          viewBox="0 0 20 20"
        >
          <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
        </LoaderAnimation>
      </LoaderContainer>
    </Presence>
    <NavMenuStyled.SubList>
      {!loading &&
        articles.map((article, index) => (
          <NavMenuStyled.SubItem key={article.id}>
            <NavMenuStyled.Link
              href={article.url}
              onClick={(e) => {
                e.preventDefault();
                onItemClick({ id: article.id, index, sourceId: article.source_id });
                // add redirection or any action
              }}
            >
              <ArticleCardStyled.Root>
                <ArticleCardStyled.ImageWrapper>
                  <ArticleCardStyled.Image src={article.image_url} />
                </ArticleCardStyled.ImageWrapper>
                <ArticleCardStyled.Name>{article.name}</ArticleCardStyled.Name>
              </ArticleCardStyled.Root>
            </NavMenuStyled.Link>
          </NavMenuStyled.SubItem>
        ))}
    </NavMenuStyled.SubList>
  </NavMenuStyled.Grid>
);

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;

export const PrevewSearchOriginalComponent = ({ defaultItemsPerPage = 6 }) => {
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult: { isFetching, isLoading, data: { content: articles = [] } = {} },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });

  const loading = isLoading || isFetching;

  const keyphraseHandler = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange],
  );

  return (
    <NavMenuStyled.Root>
      <NavMenuStyled.MainList>
        <NavMenuStyled.MainListItem>
          <NavMenuStyled.InputTrigger onChange={keyphraseHandler} autoComplete="off" placeholder="Type to search..." />
          <NavMenuStyled.MainContent>
            <Presence present={loading}>
              <LoaderContainer>
                <LoaderAnimation
                  aria-busy={loading}
                  aria-hidden={!loading}
                  focusable="false"
                  role="progressbar"
                  viewBox="0 0 20 20"
                >
                  <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                </LoaderAnimation>
              </LoaderContainer>
            </Presence>
            {!loading && (
              <NavMenuStyled.SubContent orientation="vertical" value="defaultArticlesResults" ref={widgetRef}>
                <NavMenuStyled.GroupList>
                  <NavMenuStyled.DefaultGroup value="defaultArticlesResults" key="defaultArticlesResults">
                    <NavMenuStyled.DefaultTrigger aria-hidden />
                    <Articles articles={articles} onItemClick={onItemClick} />
                  </NavMenuStyled.DefaultGroup>
                </NavMenuStyled.GroupList>
              </NavMenuStyled.SubContent>
            )}
          </NavMenuStyled.MainContent>
        </NavMenuStyled.MainListItem>
      </NavMenuStyled.MainList>
    </NavMenuStyled.Root>
  );
};
const PrevewSearchOriginalWidget = widget(PrevewSearchOriginalComponent, WidgetDataType.PREVIEW_SEARCH, 'content');
export default PrevewSearchOriginalWidget;
