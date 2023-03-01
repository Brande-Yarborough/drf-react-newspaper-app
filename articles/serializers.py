from rest_framework import serializers
from .models import Category, Article


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title',)


class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    # serializer method field is getting author status as boolean, to return and determine if author is equal to user
    # will use this to determine if edit and delete buttons will show up for specific author/user

    # def get_author_status(self, article):
    #     return article.author == self.context.get('request').user

    class Meta:
        model = Article
        fields = '__all__'


class UserArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    # https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield
    # is_author = serializers.SerializerMethodField('get_author_status')

    class Meta:
        model = Article
        fields = '__all__'

    # def get_author_status(self, article):
    #     return article.author == self.context.get('request').user
