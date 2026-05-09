from django.http import JsonResponse

DRINKS = [
    {
        "id": 1,
        "name": "레드불 오리지날",
        "brand": "Red Bull",
        "category": "에너지드링크",
        "volume_ml": 250,
        "caffeine_per_100ml": 25,
        "price": 1500,
        "recommend_for": ["벼락치기", "졸릴 때"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 2,
        "name": "핫식스 더킹 퍼플 그레이프",
        "brand": "롯데칠성음료",
        "category": "에너지드링크",
        "volume_ml": 355,
        "caffeine_per_100ml": 28,
        "price": 2300,
        "recommend_for": ["벼락치기", "졸릴 때", "장시간 공부"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 3,
        "name": "핫식스 오리지날",
        "brand": "롯데칠성음료",
        "category": "에너지드링크",
        "volume_ml": 250,
        "caffeine_per_100ml": 24,
        "price": 1500,
        "recommend_for": ["졸릴 때", "부담없이"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 4,
        "name": "몬스터에너지 그린",
        "brand": "Monster Energy",
        "category": "에너지드링크",
        "volume_ml": 355,
        "caffeine_per_100ml": 28,
        "price": 2300,
        "recommend_for": ["벼락치기", "졸릴 때"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 5,
        "name": "아이스바닐라라떼",
        "brand": "메가커피",
        "category": "커피",
        "volume_ml": 591,
        "caffeine_per_100ml": 32,
        "price": 3200,
        "recommend_for": ["부담없이", "기분전환"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 6,
        "name": "아메리카노",
        "brand": "메가커피",
        "category": "커피",
        "volume_ml": 710,
        "caffeine_per_100ml": 34,
        "price": 2000,
        "recommend_for": ["장시간 공부", "부담없이", "기분전환"],
        "taste": ["쓴 맛", "산미"],
    },
    {
        "id": 7,
        "name": "얼박사",
        "brand": "동아",
        "category": "커피",
        "volume_ml": 355,
        "caffeine_per_100ml": 20,
        "price": 1500,
        "recommend_for": ["부담없이", "기분전환"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 8,
        "name": "네스카페 수퍼 블랙",
        "brand": "Nestlé",
        "category": "커피",
        "volume_ml": 175,
        "caffeine_per_100ml": 22,
        "price": 1200,
        "recommend_for": ["부담없이", "벼락치기"],
        "taste": ["쓴 맛"],
    },
    {
        "id": 9,
        "name": "코카콜라 제로",
        "brand": "코카콜라",
        "category": "차/기타",
        "volume_ml": 355,
        "caffeine_per_100ml": 12,
        "price": 1500,
        "recommend_for": ["부담없이", "기분전환"],
        "taste": ["달달한 맛"],
    },
    {
        "id": 10,
        "name": "립톤 복숭아 아이스티",
        "brand": "Lipton",
        "category": "차/기타",
        "volume_ml": 500,
        "caffeine_per_100ml": 3,
        "price": 1800,
        "recommend_for": ["장시간 공부", "부담없이", "기분전환"],
        "taste": ["달달한 맛", "산미"],
    },

    {
        "id": 11,
        "name": "녹차",
        "brand": "동서",
        "category": "차/기타",
        "volume_ml": 350,
        "caffeine_per_100ml": 5,
        "price": 2000,
        "recommend_for": ["부담없이"],
        "taste": ["쓴 맛"],
    },
]

 #총 카페인 함량 계산
def add_caffeine_total(drink):
    result = dict(drink)   #원본 딕셔너리를 복사하여 새로운 딕셔너리 생성
    result["caffeine_total"] = round(drink["volume_ml"] * drink["caffeine_per_100ml"] / 100)
    return result

# 전체 데이터 복사 → search 필터 → category 필터 → sort 정렬 → JSON 응답
def caffeine_list(request):
    drinks = [add_caffeine_total(d) for d in DRINKS]

    # ?search= 특정 키워드 검색
    search = request.GET.get("search", "").strip().lower()
    if search:
        drinks = [
            d for d in drinks
            if search in d["name"].lower()
            or search in d["brand"].lower()
            or any(search in tag.lower() for tag in d["recommend_for"])
            or any(search in t.lower() for t in d["taste"])
        ]

    # ?category=카테고리 필터
    category = request.GET.get("category", "").strip()
    if category:
        drinks = [d for d in drinks if d["category"] == category]

    # ?sort=정렬
    sort = request.GET.get("sort", "").strip()
    sort_options = {
        "caffeine_high": lambda d: -d["caffeine_total"],
        "caffeine_low": lambda d: d["caffeine_total"],
        "price_high": lambda d: -d["price"],
        "price_low": lambda d: d["price"],
        "density_high": lambda d: -d["caffeine_per_100ml"],
        "density_low": lambda d: d["caffeine_per_100ml"],
    }
    if sort in sort_options:
        drinks = sorted(drinks, key=sort_options[sort])

    return JsonResponse({"count": len(drinks), "drinks": drinks}, json_dumps_params={"ensure_ascii": False})
