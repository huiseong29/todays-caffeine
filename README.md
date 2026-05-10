# Today's Caffeine

시험기간에 마실 카페인 음료를 검색, 필터, 정렬해서 비교할 수 있는 Django + React 웹 서비스입니다.

## 주요 기능

- 카페인 음료 목록 조회
- 키워드 검색
  - 음료명
  - 브랜드
  - 맛 태그
  - 추천 상황 태그
- 카테고리 필터
  - 커피
  - 에너지드링크
  - 차/기타
- 정렬
  - 총 카페인 높은 순/낮은 순
  - 가격 높은 순/낮은 순
  - 카페인 밀도 높은 순/낮은 순

## 기술 스택

Backend:

- Python
- Django
- django-cors-headers
- gunicorn

Frontend:

- React
- TypeScript
- Vite

## 역할 분담

| 담당 | 역할 |
|---|---|
| A | 백엔드 API 구현, API 명세서 작성 |
| B | 프론트 UI, 컴포넌트 구현 |
| C | 프론트 API 연동, 배포, README 작성 |

## 폴더 구조

```txt
todays-caffeine/
├── backend/
│   ├── API_SPEC.md
│   ├── Procfile
│   ├── manage.py
│   ├── requirements.txt
│   ├── main/
│   │   ├── urls.py
│   │   └── views.py
│   └── mysite/
│       ├── settings.py
│       └── urls.py
└── frontend/
    ├── .env.example
    ├── package.json
    └── src/
        ├── api/
        ├── types/
        ├── App.tsx
        ├── CaffeineCard.tsx
        └── SearchFilter.tsx
```

## Backend 실행

```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

확인 URL:

- Django: http://127.0.0.1:8000
- API: http://127.0.0.1:8000/api/caffeine/

## Frontend 실행

```bash
cd frontend
npm install
npm.cmd run dev
```

확인 URL:

- React: http://localhost:5173

PowerShell에서 `npm` 실행 정책 오류가 나면 `npm.cmd`를 사용합니다.

## Frontend 환경변수

`frontend/.env.example`을 참고해 `frontend/.env`를 만들 수 있습니다.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

로컬에서는 기본값이 `http://127.0.0.1:8000`으로 설정되어 있어 `.env` 없이도 동작합니다.

## API 명세

자세한 API 명세는 [backend/API_SPEC.md](backend/API_SPEC.md)를 참고합니다.

기본 엔드포인트:

```txt
GET /api/caffeine/
```

쿼리 파라미터:

| 이름 | 설명 | 예시 |
|---|---|---|
| `search` | 음료명, 브랜드, 맛, 추천 상황 검색 | `?search=달달` |
| `category` | 카테고리 필터 | `?category=커피` |
| `sort` | 정렬 기준 | `?sort=price_low` |

요청 예시:

```txt
GET http://127.0.0.1:8000/api/caffeine/?search=red
GET http://127.0.0.1:8000/api/caffeine/?category=커피
GET http://127.0.0.1:8000/api/caffeine/?sort=caffeine_high
```

## 검증 명령어

Backend:

```bash
cd backend
venv\Scripts\activate
python manage.py check
```

Frontend:

```bash
cd frontend
npm.cmd run lint
npm.cmd run build
```

## 배포 설정

### Railway Backend

Railway에서 GitHub 저장소를 연결한 뒤 backend를 기준으로 배포합니다.

권장 설정:

```txt
Root Directory: backend
Start Command: gunicorn mysite.wsgi --bind 0.0.0.0:$PORT
```

환경변수:

```env
SECRET_KEY=배포용_시크릿키
DEBUG=False
ALLOWED_HOSTS=your-railway-domain.up.railway.app
CORS_ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
```

### Vercel Frontend

Vercel에서 frontend를 기준으로 배포합니다.

환경변수:

```env
VITE_API_BASE_URL=https://your-railway-domain.up.railway.app
```

배포 후 Railway의 `CORS_ALLOWED_ORIGINS`에 Vercel 도메인을 추가해야 합니다.
