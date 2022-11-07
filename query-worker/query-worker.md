**getTopRatedMovies:**

```
LET movies = (
    FOR asset IN asset_type_view
        SEARCH ANALYZER(asset.asset_type == "movie", "identity")
        RETURN asset._to
)

FOR asset_id IN UNIQUE(movies)
    FOR asset IN assets
        FILTER asset._id == asset_id
        SORT asset.popularity DESC
        LIMIT 0, 20
    RETURN asset
```

**getTopRatedTvSeries:**

```
LET tvSeries = (
    FOR asset IN asset_type_view
        SEARCH ANALYZER(asset.asset_type == "tv", "identity")
        RETURN asset._to
)

FOR asset_id IN UNIQUE(tvSeries)
    FOR asset IN assets
        FILTER asset._id == asset_id
        SORT asset.popularity DESC
        LIMIT 0, 20
    RETURN asset
```

**getMovieAssetsByGenre:**

```
FOR asset, edge IN 1..2 OUTBOUND CONCAT("genres/", @genreId) genres_asset_edge
    FILTER edge.asset_type=="movie"
    LIMIT @offset, @resLimit
    RETURN asset
```

**getTvSeriesAssetsByGenre:**

```
FOR asset, edge IN 1..2 OUTBOUND CONCAT("genres/", @genreId) genres_asset_edge
    FILTER edge.asset_type=="tv"
    LIMIT @offset, @resLimit
    RETURN asset
```

**getWatchPartyDetails:**

```
FOR i IN watch_party
    FILTER i._key == @watchPartyId
    FOR asset IN assets
        FILTER asset.id == i.video_id
        RETURN {
            "backdrop_path": asset.backdrop_path,
            "poster_path": asset.poster_path,
            "original_title": asset.original_title,
            "overview": asset.overview,
            "title": asset.title,
            "video_path": asset.video_path,
            "video_type": asset.video_type,
            "_key": i._key,
            "video_id": i.video_id
        }
```

**searchByAsset:**

```
LET tokens = TOKENS(@searchTerm, "text_en")
LET assets = (
    LET search_results = (
        FOR asset IN asset_credit_view
            SEARCH ANALYZER(
                    BOOST(asset.title IN tokens, 4.5) OR
                    BOOST(asset.original_title IN tokens, 3.5) OR
                    BOOST(asset.name IN tokens, 3.5) OR
                    asset.overview IN tokens
                , "text_en")
            SORT BM25(asset) DESC
            RETURN asset
    )

    LET assets = (
        FOR i IN search_results
            FILTER !HAS(i, "known_for_department")
            RETURN i
    )

    LET credit_assets = (
        FOR i IN search_results
            FILTER HAS(i, "known_for_department")
            FOR vertices, edge IN 1..2 INBOUND i._id asset_credit_edge
                SORT vertices.popularity DESC
                RETURN vertices
    )

    RETURN UNION(assets, credit_assets)
)

LET top_6_asset_ids = assets[0][* LIMIT 6]._id
LET cast = (
    FOR id IN top_6_asset_ids
        RETURN (
            FOR cast, edge IN 1..2 OUTBOUND id asset_credit_edge
                FILTER edge.type == "cast"
            RETURN cast
        )
)

LET crew = (
    FOR id IN top_6_asset_ids
        RETURN (
            FOR crew, edge IN 1..2 OUTBOUND id asset_credit_edge
                FILTER edge.type == "crew"
            RETURN crew
        )
)

RETURN {
    assets: UNIQUE(assets[0]),
    cast: (
        FOR c IN UNIQUE(FLATTEN(cast))
            SORT c.popularity DESC
            LIMIT 23
            RETURN c
    ),
    crew: (
        FOR c IN UNIQUE(FLATTEN(crew))
            SORT c.popularity DESC
            LIMIT 23
            RETURN c
    )
}
```

**searchByCredits:**

```
LET assets = (
    LET credit_ids = (
        FOR asset IN asset_credit_view
            SEARCH SEARCH_PHRASE
            SORT BM25(asset) DESC
            RETURN asset._id
    )

    LET assets = (
        FOR id IN credit_ids
            FOR vertices, edge IN 1..2 INBOUND id asset_credit_edge
            RETURN vertices
    )

    FOR asset IN assets
        LET cast_and_crew = (
            FOR vertices, edge IN 1..2 OUTBOUND asset asset_credit_edge
                RETURN vertices.name
        )
        FILTER SEARCH_FILTER
        RETURN asset
)

LET top_6_asset_ids = assets[* LIMIT 6]._id
LET cast = (
    FOR id IN top_6_asset_ids
        RETURN (
            FOR cast, edge IN 1..2 OUTBOUND id asset_credit_edge
                FILTER edge.type == "cast"
            RETURN cast
        )
)

LET crew = (
    FOR id IN top_6_asset_ids
        RETURN (
            FOR crew, edge IN 1..2 OUTBOUND id asset_credit_edge
                FILTER edge.type == "crew"
            RETURN crew
        )
)
RETURN {
    assets: UNIQUE(assets),
    cast: (
        FOR c IN UNIQUE(FLATTEN(cast))
            SORT c.popularity DESC
            LIMIT 23
            RETURN c
    ),
    crew: (
        FOR c IN UNIQUE(FLATTEN(crew))
            SORT c.popularity DESC
            LIMIT 23
            RETURN c
    )
}
```
