import React from "react";

export type SortKey =
  | "caffeine_total_desc" | "caffeine_total_asc"
  | "price_asc" | "price_desc"
  | "caffeine_density_desc" | "caffeine_density_asc";

interface Props {
  search: string;
  mainCategory: string;
  subcategory: string;
  sort: SortKey;
  onSearchChange: (val: string) => void;
  onMainCategoryChange: (val: string) => void;
  onSubcategoryChange: (val: string) => void;
  onSortChange: (val: SortKey) => void;
}

const MAIN_CATEGORIES = ["전체", "커피", "에너지드링크", "차/기타"];

const SUBCATEGORY_MAP: Record<string, string[]> = {
  "커피": ["전체", "캔커피", "커피음료", "콜드브루", "에스프레소"],
  "에너지드링크": ["전체", "레드불", "몬스터", "핫식스", "기타"],
  "차/기타": ["전체", "녹차", "홍차", "탄산음료", "기타"],
};

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "카페인 높은순 (총량)",        value: "caffeine_total_desc" },
  { label: "카페인 낮은순 (총량)",        value: "caffeine_total_asc" },
  { label: "카페인 밀도 높은순 (100ml)", value: "caffeine_density_desc" },
  { label: "카페인 밀도 낮은순 (100ml)", value: "caffeine_density_asc" },
  { label: "가격 낮은순",                value: "price_asc" },
  { label: "가격 높은순",                value: "price_desc" },
];

const selectStyle: React.CSSProperties = {
  padding: "8px 12px", fontSize: "14px",
  borderRadius: "8px", border: "1.5px solid #ddd",
  cursor: "pointer", background: "#fff",
  color: "#222",
};

export default function SearchFilter({
  search, mainCategory, subcategory, sort,
  onSearchChange, onMainCategoryChange, onSubcategoryChange, onSortChange,
}: Props) {
  const subcategories = mainCategory !== "전체"
    ? SUBCATEGORY_MAP[mainCategory] ?? []
    : [];

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
      {/* 검색창 */}
      <div style={{ position: "relative", width: "300px" }}>
        <span style={{
          position: "absolute", left: "12px", top: "50%",
          transform: "translateY(-50%)", color: "#aaa",
        }}>🔍</span>
        <input
          type="text"
          placeholder="음료명, 브랜드, 맛, 추천상황..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: "100%", padding: "9px 12px 9px 36px",
            fontSize: "14px", borderRadius: "8px",
            border: "1.5px solid #ddd", boxSizing: "border-box",
            outline: "none", color: "#222", background: "#fff",
          }}
        />
      </div>

      {/* 대분류 */}
      <select
        value={mainCategory}
        onChange={(e) => { onMainCategoryChange(e.target.value); onSubcategoryChange("전체"); }}
        style={selectStyle}
      >
        {MAIN_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* 소분류 - 대분류 선택 시에만 표시 */}
      {subcategories.length > 0 && (
        <select value={subcategory} onChange={(e) => onSubcategoryChange(e.target.value)} style={selectStyle}>
          {subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      )}

      {/* 정렬 */}
      <select value={sort} onChange={(e) => onSortChange(e.target.value as SortKey)} style={selectStyle}>
        {SORT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>
  );
}
