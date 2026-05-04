# Today's Caffeine

시험기간 카페인 추천 서비스를 만들기 위한 Django + React 초기 개발 환경입니다.

## 폴더 구조

```txt
todays-caffeine/
├── backend/
│   ├── venv/
│   ├── manage.py
│   ├── requirements.txt
│   ├── mysite/
│   └── main/
└── frontend/
    ├── src/
    └── package.json
```

## Backend 실행

```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

확인 URL:

- Django: http://127.0.0.1:8000
- API 준비 확인: http://127.0.0.1:8000/api/caffeine/

## Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

확인 URL:

- React: http://localhost:5173

## 설치된 주요 패키지

Backend:

- Django
- django-cors-headers

Frontend:

- React
- Vite
- TypeScript

## 다음 구현 예정

- `views.py`에 카페인 추천 데이터 10개 이상 작성
- `?search=` 키워드 검색
- `?category=` 카테고리 필터
- `?sort=` 카페인 함량/가격/이름 정렬
- React 검색창, 카테고리 선택, 정렬 드롭다운 구현
- fetch로 `/api/caffeine/` 호출 후 리스트 렌더링
