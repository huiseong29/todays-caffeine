import { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import type { SortKey } from "./SearchFilter";
import CaffeineCard from "./CaffeineCard";
import { fetchCaffeineDrinks } from "./api/caffeine";
import type { CaffeineCategory, CaffeineDrink } from "./types/caffeine";

function getSelectedCategory(category: string): CaffeineCategory | "" {
  return category === "전체" ? "" : (category as CaffeineCategory);
}

export default function App() {
  // 서버에서 받아온 전체 음료 목록
  const [items, setItems] = useState<CaffeineDrink[]>([]);
  // 초기값 true — 첫 로드 시 무조건 로딩 상태이므로 useEffect 안에서 setLoading(true) 불필요
  const [loading, setLoading] = useState(true);
  // fetch 실패 시 에러 메시지
  const [error, setError] = useState("");

  // 검색 및 필터 상태
  const [search, setSearch] = useState("");
  const [mainCategory, setMainCategory] = useState("전체");
  const [subcategory, setSubcategory] = useState("전체");
  const [sort, setSort] = useState<SortKey>("density_high");

  // 검색, 카테고리, 정렬 조건이 바뀔 때마다 백엔드 API를 다시 호출
  useEffect(() => {
    let ignore = false;

    async function loadDrinks() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchCaffeineDrinks({
          search,
          category: getSelectedCategory(mainCategory),
          sort,
        });

        if (!ignore) {
          setItems(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDrinks();

    return () => {
      ignore = true;
    };
  }, [search, mainCategory, sort]);

  return (
    <div style={{
      maxWidth: "900px", margin: "0 auto", padding: "32px 24px",
      fontFamily: "sans-serif", background: "#f8f8f8", minHeight: "100vh",
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "26px", color: "#111" }}>☕ Today's Caffeine</h1>
        <p style={{ margin: 0, color: "#999", fontSize: "14px" }}>시험기간 카페인 음료 비교 서비스</p>
      </div>

      {/* 검색창 + 필터 영역 */}
      <div style={{
        background: "#fff", borderRadius: "10px",
        padding: "16px 20px", marginBottom: "16px",
        border: "1px solid #eee",
      }}>
        <SearchFilter
          search={search} mainCategory={mainCategory}
          subcategory={subcategory} sort={sort}
          onSearchChange={setSearch}
          onMainCategoryChange={setMainCategory}
          onSubcategoryChange={setSubcategory}
          onSortChange={setSort}
        />
      </div>

      {/* 필터 결과 개수 */}
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "12px" }}>
        총 <strong>{items.length}</strong>개 음료
      </p>

      {/* 상태별 렌더링 — 로딩 / 에러 / 결과없음 / 리스트 */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "60px" }}>불러오는 중...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#e53935", marginTop: "60px" }}>⚠️ {error}</p>
      ) : items.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "60px" }}>검색 결과가 없습니다.</p>
      ) : (
        // 리스트 영역 — 화면 크기에 맞게 고정 후 스크롤
        <div style={{
          height: "calc(100vh - 280px)",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: "10px",
          paddingRight: "4px",
        }}>
          {items.map((item) => (
            <CaffeineCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
