import React from "react";

interface CaffeineItem {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  caffeine_per_100ml: number;
  volume_ml: number;
  price: number;
  flavor_tags: string[];
  recommend_tags: string[];
}

interface Props { item: CaffeineItem; }

const CATEGORY_COLOR: Record<string, string> = {
  "커피": "#6f4e37",
  "에너지드링크": "#1a7a3c",
  "차/기타": "#2e6da4",
};

export default function CaffeineCard({ item }: Props) {
  const totalCaffeine = Math.round((item.caffeine_per_100ml * item.volume_ml) / 100);
  const color = CATEGORY_COLOR[item.category] ?? "#888";

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "20px",
        padding: "20px 24px", background: "#fff",
        border: "1px solid #eee", borderRadius: "8px",
        cursor: "pointer", transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.10)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* 썸네일 */}
      <div style={{
        width: "90px", height: "90px", borderRadius: "8px",
        background: "#f5f5f5", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "36px",
      }}>
        {item.category === "커피" ? "☕" : item.category === "에너지드링크" ? "⚡" : "🍵"}
      </div>

      {/* 메인 정보 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
          <span style={{
            background: color, color: "#fff",
            fontSize: "11px", borderRadius: "4px", padding: "2px 7px", fontWeight: 600,
          }}>{item.category}</span>
          <span style={{
            background: "#f0f0f0", color: "#666",
            fontSize: "11px", borderRadius: "4px", padding: "2px 7px",
          }}>{item.subcategory}</span>
        </div>

        <p style={{ margin: "0 0 2px", fontSize: "16px", fontWeight: 700, color: "#111" }}>{item.name}</p>
        <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#999" }}>🏷️ {item.brand}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {item.flavor_tags.map((t) => (
            <span key={t} style={{
              background: "#fff8e1", color: "#b8860b",
              fontSize: "11px", borderRadius: "20px", padding: "2px 8px",
            }}>#{t}</span>
          ))}
          {item.recommend_tags.map((t) => (
            <span key={t} style={{
              background: "#e8f5e9", color: "#2e7d32",
              fontSize: "11px", borderRadius: "20px", padding: "2px 8px",
            }}>#{t}</span>
          ))}
        </div>
      </div>

      {/* 카페인 정보 */}
      <div style={{
        textAlign: "center", flexShrink: 0, width: "130px",
        borderLeft: "1px solid #f0f0f0", paddingLeft: "20px",
      }}>
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#999" }}>카페인 밀도</p>
        <p style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color }}>
          {item.caffeine_per_100ml}mg
          <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>/100ml</span>
        </p>
        <p style={{ margin: "0 0 2px", fontSize: "12px", color: "#999" }}>{item.volume_ml}ml 기준 총</p>
        <p style={{ margin: 0, fontSize: "15px", fontWeight: 700, color }}>{totalCaffeine}mg</p>
      </div>

      {/* 가격 */}
      <div style={{
        textAlign: "right", flexShrink: 0, width: "100px",
        borderLeft: "1px solid #f0f0f0", paddingLeft: "20px",
      }}>
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#999" }}>가격</p>
        <p style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#e53935" }}>
          {item.price.toLocaleString()}
          <span style={{ fontSize: "14px" }}>원</span>
        </p>
      </div>
    </div>
  );
}
