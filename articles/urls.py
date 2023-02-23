from django.urls import path
from .views import CategoryListAPIView, CategoryDetailAPIView, ArticleListAPIView, ArticleDetailAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view()),
    path('', ArticleListAPIView.as_view()),
    path('<int:pk>', CategoryDetailAPIView.as_view()),
    path('articles/<int:pk>', ArticleDetailAPIView.as_view()),
]
