import { useState, useMemo, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import type { SortKey } from "./SearchFilter";
import CaffeineCard from "./CaffeineCard";

// 음료 데이터 타입 정의
interface CaffeineItem {
  id: number;
  name: string;               // 음료명
  brand: string;              // 브랜드
  category: string;           // 대분류 (커피 / 에너지드링크 / 차·기타)
  subcategory: string;        // 소분류 (캔커피, 몬스터 등)
  caffeine_per_100ml: number; // 카페인 밀도 (mg/100ml)
  volume_ml: number;          // 총 용량 (ml)
  price: number;              // 가격 (원)
  flavor_tags: string[];      // 맛 태그 (달콤한, 청량한 등)
  recommend_tags: string[];   // 추천 상황 태그 (밤샘, 운동 전 등)
}

// 백엔드 API 주소
const API_BASE = "";

export default function App() {
  // 서버에서 받아온 전체 음료 목록
  const [items, setItems] = useState<CaffeineItem[]>([]);
  // 초기값 true — 첫 로드 시 무조건 로딩 상태이므로 useEffect 안에서 setLoading(true) 불필요
  const [loading, setLoading] = useState(true);
  // fetch 실패 시 에러 메시지
  const [error, setError] = useState("");

  // 검색 및 필터 상태
  const [search, setSearch] = useState("");
  const [mainCategory, setMainCategory] = useState("전체");
  const [subcategory, setSubcategory] = useState("전체");
  const [sort, setSort] = useState<SortKey>("caffeine_density_desc");

  // 컴포넌트 마운트 시 API에서 전체 데이터 1회 fetch
  useEffect(() => {
    fetch(API_BASE)
      .then((res) => {
        if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 검색 · 필터 · 정렬은 API 재호출 없이 프론트에서 처리
  // items, search, mainCategory, subcategory, sort 중 하나라도 바뀌면 재계산
  const displayed = useMemo(() => {
    let result = [...items];

    // 키워드 검색 — 음료명, 브랜드, 맛 태그, 추천 상황 태그 대상
    if (search.trim()) {
      const kw = search.trim().toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(kw) ||
        item.brand.toLowerCase().includes(kw) ||
        item.flavor_tags.some((t) => t.includes(kw)) ||
        item.recommend_tags.some((t) => t.includes(kw))
      );
    }

    // 대분류 필터
    if (mainCategory !== "전체") result = result.filter((i) => i.category === mainCategory);
    // 소분류 필터
    if (subcategory !== "전체") result = result.filter((i) => i.subcategory === subcategory);

    // 정렬
    result.sort((a, b) => {
      // 총 카페인 = 밀도 × 용량 / 100
      const tA = (a.caffeine_per_100ml * a.volume_ml) / 100;
      const tB = (b.caffeine_per_100ml * b.volume_ml) / 100;
      switch (sort) {
        case "caffeine_total_desc":   return tB - tA;                                     // 카페인 총량 높은순
        case "caffeine_total_asc":    return tA - tB;                                     // 카페인 총량 낮은순
        case "caffeine_density_desc": return b.caffeine_per_100ml - a.caffeine_per_100ml; // 밀도 높은순
        case "caffeine_density_asc":  return a.caffeine_per_100ml - b.caffeine_per_100ml; // 밀도 낮은순
        case "price_asc":             return a.price - b.price;                           // 가격 낮은순
        case "price_desc":            return b.price - a.price;                           // 가격 높은순
        default: return 0;
      }
    });

    return result;
  }, [items, search, mainCategory, subcategory, sort]);

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
        총 <strong>{displayed.length}</strong>개 음료
      </p>

      {/* 상태별 렌더링 — 로딩 / 에러 / 결과없음 / 리스트 */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "60px" }}>불러오는 중...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#e53935", marginTop: "60px" }}>⚠️ {error}</p>
      ) : displayed.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "60px" }}>검색 결과가 없습니다.</p>
      ) : (
        // 리스트 영역 — 화면 크기에 맞게 고정 후 스크롤
        <div style={{
          height: "calc(100vh - 280px)",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: "10px",
          paddingRight: "4px",
        }}>
          {displayed.map((item) => (
            <CaffeineCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}