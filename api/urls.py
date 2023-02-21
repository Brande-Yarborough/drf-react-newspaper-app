from django.urls import include, path

app_name = "api_v1"

urlpatterns = [
    path('articles/', include('articles.urls')),
    path('', include('accounts.urls', namespace="accounts")),
]
