from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Article
from .serializers import CategorySerializer, ArticleSerializer, UserArticleSerializer
from .permissions import IsAuthor, IsAdminOrReadOnly

# Create your views here.
# ListAPIView is prewired to accept get requests


# API end point to show all categories, List gets many records
class CategoryListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to table and get all objects or articles
    queryset = Category.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = CategorySerializer
    permission_classes = (IsAdminOrReadOnly,)


# class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = (IsAuthorOrReadOnly)


# API end point to show all articles, List gets many records
class ArticleListAPIView(generics.ListAPIView):
    # what am i getting,  go to article table and get all objects or articles
    # queryset = Article.objects.order_by('-created_at')
    # what it looks like, this is how you need to return them
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # filter by category
    # https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        category = self.request.query_params.get('category')
        return Article.objects.filter(category=category).order_by('-created_at')


class UserArticleListAPIView(generics.ListCreateAPIView):
    serializer_class = UserArticleSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class UserArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthor,)
