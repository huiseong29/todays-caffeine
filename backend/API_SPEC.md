# Todays Caffeine API 명세서

## 기본 정보

| 항목 | 내용 |
|---|---|
| Base URL (로컬) | `http://127.0.0.1:8000/api` |
| 응답 형식 | JSON |
| 인증 | 없음 |

---

## 엔드포인트

### GET /api/caffeine/

카페인 음료 목록을 반환합니다. 쿼리 파라미터로 검색·필터·정렬을 적용할 수 있습니다.

---

## 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `search` | string | 선택 | 음료명, 브랜드, 맛 태그, 추천 상황으로 키워드 검색 |
| `category` | string | 선택 | 카테고리 필터 (아래 허용값 참고) |
| `sort` | string | 선택 | 정렬 기준 (아래 허용값 참고) |

### category 허용값

| 값 | 설명 |
|---|---|
| `커피` | 커피 음료 |
| `에너지드링크` | 에너지 드링크 |
| `차/기타` | 차, 탄산음료 등 기타 |

### sort 허용값

| 값 | 설명 |
|---|---|
| `caffeine_high` | 총 카페인 높은 순 |
| `caffeine_low` | 총 카페인 낮은 순 |
| `price_high` | 가격 높은 순 |
| `price_low` | 가격 낮은 순 |
| `density_high` | 카페인 밀도(100ml 기준) 높은 순 |
| `density_low` | 카페인 밀도(100ml 기준) 낮은 순 |

---

## 응답 형식

```json
[
  {
    "id": 1,
    "name": "레드불 오리지날",
    "brand": "Red Bull",
    "category": "에너지드링크",
    "volume_ml": 250,
    "caffeine_per_100ml": 25,
    "price": 1500,
    "recommend_tags": ["벼락치기", "졸릴 때"],
    "flavor_tags": ["달달한 맛"],
    "caffeine_total": 62
  }
]
```

### 응답 필드 설명

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | number | 음료 고유 번호 |
| `name` | string | 음료명 |
| `brand` | string | 브랜드명 |
| `category` | string | 카테고리 |
| `volume_ml` | number | 총 용량 (ml) |
| `caffeine_per_100ml` | number | 100ml당 카페인 함량 (mg) |
| `price` | number | 가격 (원) |
| `recommend_tags` | array | 추천 상황 태그 |
| `flavor_tags` | array | 맛 태그 (달달한 맛, 쓴 맛, 산미) |
| `caffeine_total` | number | 총 카페인 함량 (mg), 서버에서 자동 계산 |

---

## 요청 예시

### 전체 조회
```
GET /api/caffeine/
```

### 카테고리 필터
```
GET /api/caffeine/?category=커피
GET /api/caffeine/?category=에너지드링크
GET /api/caffeine/?category=차/기타
```

### 키워드 검색
```
GET /api/caffeine/?search=벼락치기
GET /api/caffeine/?search=몬스터
GET /api/caffeine/?search=졸릴 때
```

### 정렬
```
GET /api/caffeine/?sort=caffeine_high
GET /api/caffeine/?sort=price_low
```

### 복합 (카테고리 + 정렬)
```
GET /api/caffeine/?category=에너지드링크&sort=caffeine_high
GET /api/caffeine/?category=커피&sort=price_low
```

### 복합 (검색 + 정렬)
```
GET /api/caffeine/?search=벼락치기&sort=caffeine_high
```

---

## 에러 응답

별도의 에러 코드는 없으며, 조건에 맞는 결과가 없을 경우 빈 배열을 반환합니다.

```json
[]
```
