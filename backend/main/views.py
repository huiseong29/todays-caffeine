from django.http import JsonResponse


def caffeine_list(request):
    return JsonResponse({
        'message': 'Todays Caffeine API is ready.',
    })
