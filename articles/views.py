from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Category, Article
from .serializers import CategorySerializer, ArticleSerializer

# Create your views here.
# ListAPIView is prewired to accept get requests


# API end point to show all categories, List gets many records
class CategoryListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to table and get all objects or articles
    queryset = Category.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = CategorySerializer


class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# API end point to show all articles, List gets many records
class ArticleListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to article table and get all objects or articles
    # queryset = Article.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = ArticleSerializer

    # filter by category
    # https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        category = self.request.query_params.get('category')
        return Article.objects.filter(category=category)
    # target for post request

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
