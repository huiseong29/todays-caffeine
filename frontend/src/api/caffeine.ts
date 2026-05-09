import type { CaffeineQuery, CaffeineResponse } from "../types/caffeine";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function getApiBaseUrl() {
  return (
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
    DEFAULT_API_BASE_URL
  );
}

function buildCaffeineQueryString(query: CaffeineQuery) {
  const params = new URLSearchParams();

  if (query.search?.trim()) {
    params.set("search", query.search.trim());
  }

  if (query.category) {
    params.set("category", query.category);
  }

  if (query.sort) {
    params.set("sort", query.sort);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export async function fetchCaffeineDrinks(
  query: CaffeineQuery = {},
): Promise<CaffeineResponse> {
  const url = `${getApiBaseUrl()}/api/caffeine/${buildCaffeineQueryString(
    query,
  )}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `카페인 음료 목록을 불러오지 못했습니다.: ${response.status}`,
    );
  }

  return response.json();
}
