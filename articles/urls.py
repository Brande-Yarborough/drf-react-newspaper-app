from django.urls import path
from . import views

urlpatterns = [
    path('articles/categories/', views.CategoryListAPIView.as_view()),
    # don't need these urls-are not using them currently
    # path('<int:pk>/', views.CategoryDetailAPIView.as_view()),
    # path('articles/<int:pk>/', views.ArticleDetailAPIView.as_view()),

    path('admin/articles/<int:pk>/', views.AdminArticleDetailAPIView.as_view()),
    path('admin/articles/', views.AdminArticleListAPIView.as_view()),
    path('user/articles/<int:pk>/', views.UserArticleDetailAPIView.as_view()),
    path('user/articles/', views.UserArticleListAPIView.as_view()),
    path('articles/', views.ArticleListAPIView.as_view()),
]
