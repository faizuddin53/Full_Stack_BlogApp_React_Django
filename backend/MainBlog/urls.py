from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [
    path('users/', views.UserList, name='user-create'),
    path('users/<str:username>/', views.getUser, name='users_username'),
    path('user-id/<int:user_id>/', views.getUserWithID, name='user_id'),
    path('register/', views.createUser, name='create-user'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('blog/', views.BlogView.as_view(), name='blog_list'),
    path('blog/<int:blog_id>/', views.BlogDetailView.as_view(), name='blog_details'),
    path('user_blogs/<int:user_id>', views.UserBlogs.as_view(), name='user_blogs'),
    path('token/', jwt_views.TokenObtainPairView.as_view(),
         name='token-obtain-pair'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token-refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
